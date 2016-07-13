.PHONY: build

install:
	npm install -g webpack
	npm install webpack-dev-server -g
	npm install

serve:
	webpack-dev-server --progress --inline --colors
	# and then, ccess to
	# http://localhost:8080/webpack-dev-server/

build:
	webpack --progress --colors

serve-backend:
	python server.py

get:
	curl --dump-header - http://localhost:3000/api/comments -X GET

post:
	curl --dump-header - http://localhost:3000/api/comments --data '{"text": "added text", "id": "1002", "author": "anonymous"}' -X POST
