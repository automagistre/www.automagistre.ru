.PHONY: contrib

MAKEFLAGS += --no-print-directory

DEBUG_PREFIX=" [DEBUG] "
DEBUG_ECHO=$(if $(MAKE_DEBUG),@echo ${DEBUG_PREFIX})

define success
    @tput setaf 2
    @echo "$(if $(filter 1,$(MAKE_DEBUG)),${DEBUG_PREFIX}) [OK] $1"
    @tput sgr0
endef
define failed
    @tput setaf 1
    @echo "$(if $(MAKE_DEBUG),${DEBUG_PREFIX}) [FAIL] $1"
    @tput sgr0
endef

notify = $(DEBUG_ECHO) notify-send --urgency=low --expire-time=50 "Makefile" "$@ success!"

define putenv
	@touch .env
	@sed -e '/$1=/d' .env > .env.bak && mv .env.bak .env
	@echo "$1=$2" >> .env
endef

init:
	cp -n .env.dist .env || true
	cp -n docker-compose.override.yml.dist docker-compose.override.yml || true
	cp -n contrib/* ./ || true
	cp -n -r contrib/* ./ || true
	$(call putenv,UID,$(shell id -u))
	$(call putenv,GID,$(shell id -g))

docker-hosts-updater:
	docker pull grachev/docker-hosts-updater
	docker rm -f docker-hosts-updater || true
	docker run -d --restart=always --name docker-hosts-updater -v /var/run/docker.sock:/var/run/docker.sock -v /etc/hosts:/opt/hosts grachev/docker-hosts-updater

###> ALIASES ###
pull:
	docker-compose pull --ignore-pull-failures
do-up: pull composer
	docker-compose up --detach --remove-orphans --no-build
up: do-up permissions
	@$(notify)
cli: app-cli
down:
	docker-compose down -v --remove-orphans
###< ALIASES ###

###> APP ###
build:
	$(DEBUG_ECHO) docker build \
		--target base \
		--tag automagistre/www-app:base \
		.

APP = $(DEBUG_ECHO) @docker-compose $(if $(EXEC),exec,run --rm )\
	$(if $(ENTRYPOINT),--entrypoint "$(ENTRYPOINT)" )\
	$(if $(APP_ENV),-e APP_ENV=$(APP_ENV) )\
	$(if $(APP_DEBUG),-e APP_DEBUG=$(APP_DEBUG) )\
	app

PERMISSIONS = chown $(shell id -u):$(shell id -g) -R . && chmod 777 -R var/
permissions:
	$(APP) sh -c "$(PERMISSIONS) || true"
	$(call success,"Permissions fixed.")

app-cli:
	$(APP) bash

composer:
	$(APP) sh -c 'rm -rf var/cache/* && composer install'

test: APP_ENV=test
test: APP_DEBUG=1
test: php-cs-fixer cache phpstan psalm phpunit

php-cs-fixer:
	$(APP) sh -c 'php-cs-fixer fix $(if $(DRY),--dry-run) $(if $(DEBUG),-vvv); $(PERMISSIONS)'

phpstan: APP_ENV=test
phpstan: APP_DEBUG=1
phpstan: cache
	$(APP) phpstan analyse --configuration phpstan.neon $(if $(DEBUG),--debug -vvv)

phpunit: APP_ENV=test
phpunit:
	$(APP) paratest -p $(shell grep -c ^processor /proc/cpuinfo || 4) --stop-on-failure

requirements: APP_ENV=prod
requirements:
	$(APP) requirements-checker

psalm:
	$(APP) psalm --show-info=false

cache:
	$(APP) sh -c 'rm -rf var/cache/$$APP_ENV && console cache:warmup; $(PERMISSIONS)'
###< APP ###

###> MEMCACHED ###
memcached-cli:
	docker-compose exec memcached sh
memcached-restart:
	docker-compose restart memcached
###< MEMCACHED ###

###> NODE ###
node-install:
	docker-compose run --rm node npm install
node-cli:
	docker-compose run --rm node sh
gulp:
	docker-compose run --rm node ./node_modules/.bin/gulp build:main-script build:scripts build:less
###< NODE ###
