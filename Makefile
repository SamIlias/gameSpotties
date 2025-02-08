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

lint:
	npm run lint

fix:
	npm run fix

format:
	npm run format

.PHONY: test
