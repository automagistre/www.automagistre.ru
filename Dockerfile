FROM node:14.3.0-alpine as node-base

LABEL MAINTAINER="Konstantin Grachev <me@grachevko.ru>"

ENV APP_DIR=/usr/local/app
ENV PATH=${APP_DIR}/node_modules/.bin:${PATH}

WORKDIR ${APP_DIR}

RUN apk add --no-cache git

COPY package.json package-lock.json ${APP_DIR}/
RUN npm install --no-audit

FROM node-base as node

COPY webpack.config.js ${APP_DIR}
COPY postcss.config.js ${APP_DIR}
COPY .babelrc ${APP_DIR}
COPY assets ${APP_DIR}/assets

RUN NODE_ENV=production webpack


#
# PHP-FPM
#
FROM composer:2.0.7 as composer
FROM php:7.4.12-fpm-buster as base

LABEL MAINTAINER="Konstantin Grachev <me@grachevko.ru>"

ENV APP_DIR=/usr/local/app
ENV PATH=${APP_DIR}/bin:${APP_DIR}/vendor/bin:${PATH}

WORKDIR ${APP_DIR}

RUN set -ex \
    && apt-get update && apt-get install -y --no-install-recommends \
        git \
        openssh-client \
        libzip-dev \
        netcat \
        libmemcached-dev \
        unzip \
        libfcgi-bin \
    && rm -r /var/lib/apt/lists/*

RUN set -ex \
    && docker-php-ext-install -j$(nproc) zip pdo_mysql iconv opcache

RUN set -ex \
    && pecl install memcached apcu xdebug \
    && docker-php-ext-enable memcached apcu

ENV COMPOSER_ALLOW_SUPERUSER 1
ENV COMPOSER_MEMORY_LIMIT -1
COPY --from=composer /usr/bin/composer /usr/bin/composer

ENV WAIT_FOR_IT /usr/local/bin/wait-for-it.sh
RUN curl https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -o ${WAIT_FOR_IT} \
    && chmod +x ${WAIT_FOR_IT}

COPY composer.json composer.lock ${APP_DIR}/
RUN set -ex \
    && composer validate \
    && mkdir -p var \
    && composer install --no-interaction --no-progress --no-scripts

COPY etc/php.ini ${PHP_INI_DIR}/php.ini
COPY etc/php-fpm.conf /usr/local/etc/php-fpm.d/automagistre.conf

ENV PHP_MEMORY_LIMIT 1G
ENV PHP_OPCACHE_ENABLE 1

FROM base as php

ARG APP_ENV
ENV APP_ENV ${APP_ENV}
ARG APP_DEBUG
ENV APP_DEBUG ${APP_DEBUG}

COPY bin bin
COPY config config
COPY public public
COPY src src
COPY templates templates
COPY --from=node /usr/local/app/public/manifest.json public/manifest.json

RUN set -ex \
    && composer install --no-interaction --no-progress \
        $(if [ "prod" = "$APP_ENV" ]; then echo "--no-dev --classmap-authoritative"; fi) \
    && chown -R www-data:www-data ${APP_DIR}/var

HEALTHCHECK --interval=10s --timeout=5s --start-period=5s \
        CMD REDIRECT_STATUS=true SCRIPT_NAME=/ping SCRIPT_FILENAME=/ping REQUEST_METHOD=GET cgi-fcgi -bind -connect 127.0.0.1:9000

#
# Sitemap
#
FROM php AS sitemap
RUN set -ex \
    && console presta:sitemaps:dump

#
# nginx
#
FROM nginx:1.19.4-alpine as nginx-base

WORKDIR /usr/local/app/public

RUN set -ex \
    && apk add --no-cache gzip brotli \
    && tempDir="$(mktemp -d)" \
    && chown nobody:nobody $tempDir \
    && apk add --no-cache --virtual .build-deps \
        gcc \
        libc-dev \
        make \
        openssl-dev \
        pcre-dev \
        zlib-dev \
        linux-headers \
        libxslt-dev \
        gd-dev \
        geoip-dev \
        perl-dev \
        libedit-dev \
        mercurial \
        bash \
        alpine-sdk \
        findutils \
        brotli-dev \
    && su nobody -s /bin/sh -c " \
        export HOME=${tempDir} \
        && cd ${tempDir} \
        && curl -L https://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz | tar xz \
        && curl -L https://github.com/google/ngx_brotli/archive/v1.0.0rc.tar.gz | tar xz \
        && curl -L https://github.com/openresty/headers-more-nginx-module/archive/v0.33.tar.gz | tar xz \
        && cd nginx-${NGINX_VERSION} \
        && ./configure `2>&1 nginx -V | grep _module | awk -F ':' ' { print $2 }'` --with-compat \
            --add-dynamic-module=${tempDir}/ngx_brotli-1.0.0rc \
            --add-dynamic-module=${tempDir}/headers-more-nginx-module-0.33 \
        && make modules \
        " \
    && cp ${tempDir}/nginx-${NGINX_VERSION}/objs/ngx_http_brotli_filter_module.so /etc/nginx/modules/ \
    && cp ${tempDir}/nginx-${NGINX_VERSION}/objs/ngx_http_brotli_static_module.so /etc/nginx/modules/ \
    && cp ${tempDir}/nginx-${NGINX_VERSION}/objs/ngx_http_headers_more_filter_module.so /etc/nginx/modules/ \
    && rm -rf ${tempDir} \
    && apk del .build-deps

FROM nginx-base AS nginx

COPY --from=node /usr/local/app/public/images images
COPY --from=node /usr/local/app/public/img img
COPY --from=node /usr/local/app/public/assets assets
COPY --from=node /usr/local/app/public/fonts fonts
COPY --from=php /usr/local/app/public/robots.txt .
COPY --from=sitemap /usr/local/app/public/sitemap.* .

COPY etc/nginx.conf /etc/nginx/nginx.conf

RUN set -ex \
    && ln -s img/favicons/favicon.ico favicon.ico \
    && ln -s img/favicons/favicon-32x32.png favicon.png \
    && ln -s img/favicons/apple-touch-icon-152x152.png apple-touch-icon.png \
    && find . -type f \
    \( \
        -name "*.css" \
        -or -name "*.eot" \
        -or -name "*.html" \
        -or -name "*.js" \
        -or -name "*.json" \
        -or -name "*.otf" \
        -or -name "*.svg" \
        -or -name "*.ttf" \
        -or -name "*.woff" \
     \) \
    -exec gzip -9 --name --suffix=.gz --keep {} \; \
    -exec brotli --best --suffix=.br --keep {} \; \
    -exec echo Compressed: {} \;

HEALTHCHECK --interval=5s --timeout=3s --start-period=5s CMD curl --fail http://127.0.0.1/healthcheck || exit 1
