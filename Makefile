.PHONY: all clean release logs mrproper

EXPECTED_NODEJS_VERSION := $(shell cat .nvmrc)
RUNNING_NODEJS_VERSION := $(shell node --version)
ifneq ($(RUNNING_NODEJS_VERSION),v$(EXPECTED_NODEJS_VERSION))
$(error Wrong Node.js version: $(RUNNING_NODEJS_VERSION) (expected: v$(EXPECTED_NODEJS_VERSION)))
endif

CORE_VERSION := $(shell jq --raw-output .version package.json)
ifneq ($(findstring alpha,$(CORE_VERSION)),)
CORE_CHANNEL := alpha
else ifneq ($(findstring beta,$(CORE_VERSION)),)
CORE_CHANNEL := beta
else ifneq ($(findstring rc,$(CORE_VERSION)),)
CORE_CHANNEL := rc
else ifneq ($(findstring canary,$(CORE_VERSION)),)
CORE_CHANNEL := canary
endif

all: node_modules dist/index.js release

yarn.lock:
	git checkout yarn.lock
	touch -r yarn.lock

node_modules: yarn.lock
	yarn install --frozen-lockfile

dist/index.js: node_modules
	yarn build

ifndef $(CORE_VERSION)
release: dist/channels/$(CORE_CHANNEL)/klayr-core-v$(CORE_VERSION)

dist/channels/$(CORE_CHANNEL)/klayr-core-v$(CORE_VERSION):
	npx oclif-dev pack --targets=linux-x64,darwin-x64
else
release: dist/klayr-core-v$(CORE_VERSION)

dist/klayr-core-v$(CORE_VERSION):
	npx oclif-dev pack --targets=linux-x64,darwin-x64
endif

build: build-image build-local

build-image:
	docker buildx build -f ./docker/Dockerfile --build-arg NODEJS_VERSION=$(shell cat .nvmrc) --tag=klayr/core .

build-local:
	yarn install --frozen-lockfile
	yarn build

clean: clean-image clean-local

clean-image:
	docker rmi klayr/core; :

clean-local:
	rm -rf dist/ node_modules/

# Usage: make start ARGS="-n mainnet -l debug"
start: check-args
	docker run -d -p 7887:7887 -p 7667:7667 --name klayr-core --rm klayr/core start $(ARGS)

stop:
	docker stop klayr-core; :

logs:
	docker logs klayr-core

logs-live:
	docker logs klayr-core --follow

# Usage: make run ARGS="start --help"
run: check-args
	docker run --name klayr-core-temp --rm klayr/core $(ARGS)

check-args:
ifndef ARGS
	$(error ARGS is undefined)
endif

mrproper: stop clean
