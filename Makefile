install: deps-install
	npx simple-git-hooks

deps-install:
	npm ci --legacy-peer-deps

deps-update:
	npx ncu -u

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

build:
	docker build -t game-spotties .

run:
	docker run -d -p 8080:80 game-spotties
.PHONY: test
