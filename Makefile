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

http-server:
	npx http-server ./dist
	
bundle:
	npm run build

build-image:
	docker build -t game-spotties .

run: build-image
	docker run -d -p 8080:80 game-spotties

deploy: bundle build-image run

.PHONY: test
