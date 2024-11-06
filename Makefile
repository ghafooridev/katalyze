MDF_MAKEDOCKFILE_VERSION = 1.0.2
MDF_MAKEDOCKFILE_REPOSITORY = https://github.com/Thomvaill/Makedockfile.git

-include Makedockfile.dist.conf
include Makedockfile.conf

ifdef MDF_VERSION_TAG
MDF_UTAG ?= $(MDF_VERSION_TAG)-$(shell git log -1 --pretty=%h)
else
MDF_UTAG ?= $(shell git log -1 --pretty=%h)
endif
MDF_BRANCH_TAG ?= $(shell git rev-parse --abbrev-ref HEAD | tr / -)

ifdef MDF_NAMESPACE
MDF_IMAGE_NAME = $(MDF_NAMESPACE)/$(MDF_REPOSITORY)
MDF_CONTAINER_NAME = $(MDF_NAMESPACE)_$(MDF_REPOSITORY)
else
MDF_IMAGE_NAME = $(MDF_REPOSITORY)
MDF_CONTAINER_NAME = $(MDF_REPOSITORY)
endif

ifdef MDF_REGISTRY
MDF_REGISTRY_IMAGE_NAME = $(MDF_REGISTRY)/$(MDF_IMAGE_NAME)
else
MDF_REGISTRY_IMAGE_NAME = $(MDF_IMAGE_NAME)
endif

MDF_ARTIFACT_PATH = ./Makedockfile.out

check_defined = \
    $(strip $(foreach 1,$1, \
        $(call __check_defined,$1,$(strip $(value 2)))))
__check_defined = \
    $(if $(value $1),, \
        $(error Undefined $1$(if $2, ($2))$(if $(value @), \
                required by target `$@')))

.PHONY: help

help:
	@awk 'BEGIN { \
		print "Makedockfile v$(MDF_MAKEDOCKFILE_VERSION)\n\
	Usage: make \033[36mCOMMAND\033[0m\n\n\
	Have a look at Makedockfile.conf and Makefile for configuration help\n\
	You can override configuration in Makedockfile.dist.conf or by passing environment variables directly ";\
	\
		FS = ":.*?## "} \
	/^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2} \
	/^#:## / {printf "\n\033[35m%s\033[0m\n", $$2} ' \
	$(MAKEFILE_LIST)

.DEFAULT_GOAL := help

build:
	$(eval MDF_IIDFILE_PATH := $(shell mktemp -t dm-iid-XXXXXX))
	@echo 'Building $(MDF_IMAGE_NAME)...'
	docker image build --force-rm=true --iidfile=$(MDF_IIDFILE_PATH) $(MDF_BUILD_PARAMS) -t $(MDF_IMAGE_NAME):latest -f Dockerfile .
	@echo "MDF_IMAGE_ID=`cat $(MDF_IIDFILE_PATH)`" > $(MDF_ARTIFACT_PATH)
	@rm -f $(MDF_IIDFILE_PATH)

run: stop rm
	@echo 'Running $(MDF_CONTAINER_NAME)...'
	docker container run -it -d --add-host=host.docker.internal:host-gateway --name="$(MDF_CONTAINER_NAME)" $(MDF_RUN_PARAMS) $(MDF_IMAGE_NAME):latest $(MDF_RUN_CMD)
	@echo '$(MDF_CONTAINER_NAME) now runs in detached mode'

up: build run

stop:
	@echo 'Stopping $(MDF_CONTAINER_NAME)...'
	@[ "$$(docker container ls | grep ' $(MDF_CONTAINER_NAME)$$')" ] && docker container stop $(MDF_CONTAINER_NAME) || exit 0

kill:
	@echo 'Killing $(MDF_CONTAINER_NAME)...'
	@[ "$$(docker container ls | grep ' $(MDF_CONTAINER_NAME)$$')" ] && docker container kill $(MDF_CONTAINER_NAME) || exit 0

rm:
	@echo 'Removing $(MDF_CONTAINER_NAME)...'
	@[ "$$(docker container ls -a | grep '$(MDF_CONTAINER_NAME)$$')" ] && docker container rm $(MDF_CONTAINER_NAME) || exit 0

attach:
	docker container attach $(MDF_CONTAINER_NAME)

diff:
	docker container diff $(MDF_CONTAINER_NAME)

bash:
	docker container exec -it $(MDF_CONTAINER_NAME) /bin/bash

sh:
	docker container exec -it $(MDF_CONTAINER_NAME) /bin/sh

pause:
	docker container pause $(MDF_CONTAINER_NAME)

unpause:
	docker container unpause $(MDF_CONTAINER_NAME)

restart:
	docker container restart $(MDF_CONTAINER_NAME)

top:
	docker container top $(MDF_CONTAINER_NAME)

logs:
	docker container logs $(MDF_CONTAINER_NAME)

logs-follow:
	docker container logs --follow $(MDF_CONTAINER_NAME)

test: build
	@echo 'Building test image...'
	docker image build --force-rm=true -t $(MDF_IMAGE_NAME):test --file Dockerfile.test .
	@echo 'Running test image...'
	docker container run $(MDF_TEST_PARAMS) --rm $(MDF_IMAGE_NAME):test

define tag_and_push
	docker image tag $(1) $(2)
	docker image push $(2)
endef

define append_artifact_file
	@echo "$(1)=$(2)" >> $(MDF_ARTIFACT_PATH)
endef

release: build
	@echo 'Releasing under the tag "$(MDF_UTAG)"...'
	$(call reset_artifact_file)
	$(call tag_and_push,$(MDF_IMAGE_NAME):latest,$(MDF_REGISTRY_IMAGE_NAME):$(MDF_UTAG))
	$(call append_artifact_file,MDF_REGISTRY_IMAGE_NAME,$(MDF_REGISTRY_IMAGE_NAME))
	$(call append_artifact_file,MDF_UTAG,$(MDF_UTAG))

branch-tag: release
	@echo 'Tagging the current release as "$(MDF_BRANCH_TAG)"...'
	$(call tag_and_push,$(MDF_REGISTRY_IMAGE_NAME):$(MDF_UTAG),$(MDF_REGISTRY_IMAGE_NAME):$(MDF_BRANCH_TAG))
	$(call append_artifact_file,MDF_BRANCH_TAG,$(MDF_BRANCH_TAG))
	@echo 'Tagging the current release as "$(MDF_BRANCH_TAG)-$(MDF_UTAG)"...'
	$(call tag_and_push,$(MDF_REGISTRY_IMAGE_NAME):$(MDF_UTAG),$(MDF_REGISTRY_IMAGE_NAME):$(MDF_BRANCH_TAG)-$(MDF_UTAG))
	$(call append_artifact_file,MDF_BRANCH_UTAG,$(MDF_BRANCH_TAG)-$(MDF_UTAG))

version-tag: release
	@:$(call check_defined, MDF_VERSION_TAG, required to use `version-tag` target)
	@echo 'Tagging the current release as "$(MDF_VERSION_TAG)"...'
	$(call tag_and_push,$(MDF_REGISTRY_IMAGE_NAME):$(MDF_UTAG),$(MDF_REGISTRY_IMAGE_NAME):$(MDF_VERSION_TAG))
	$(call append_artifact_file,MDF_VERSION_TAG,$(MDF_VERSION_TAG))

clean: stop rm
	@echo 'Cleaning related images...'
	@[ "$$(docker image ls | grep '^$(MDF_IMAGE_NAME) ')" ] && docker image rm $(MDF_IMAGE_NAME):latest || exit 0

print-utag:
	@echo $(MDF_UTAG)

print-branch-tag:
	@echo $(MDF_BRANCH_TAG)

print-version-tag:
	@:$(call check_defined, MDF_VERSION_TAG, required to use `version-tag` target)
	@echo $(MDF_VERSION_TAG)

self-update:
	tmpDir=$$(mktemp -d) \
	&& git clone --depth=1 $(MDF_MAKEDOCKFILE_REPOSITORY) $$tmpDir \
	&& cp ./Makefile ./Makefile.bak \
	&& cp $$tmpDir/src/Makefile ./Makefile \
	&& rm -rf $$tmpDir