install: 
	npm install

test:
	npm test

bundle:
	npm run build

build-image:
	docker build -t game-spotties .

run: build-image
	docker run -d -p 8080:80 game-spotties

deploy: bundle build-image run

.PHONY: test
