FROM node:13.8.0-alpine as node-base

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
FROM composer:1.9.3 as composer
FROM php:7.3.15-fpm-stretch as base

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
RUN set -ex \
    && composer global require "hirak/prestissimo:^0.3"

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

FROM base as app

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
# nginx
#
FROM nginx:1.17.8-alpine as nginx

WORKDIR /usr/local/app/public

RUN apk add --no-cache gzip curl

COPY --from=node /usr/local/app/public/images images
COPY --from=node /usr/local/app/public/img img
COPY --from=node /usr/local/app/public/assets assets

COPY etc/nginx.conf /etc/nginx/nginx.conf

RUN find . \
    -type f \
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
    -exec echo Compressed: {} \;

HEALTHCHECK --interval=5s --timeout=3s --start-period=5s CMD curl --fail http://127.0.0.1/healthcheck || exit 1
