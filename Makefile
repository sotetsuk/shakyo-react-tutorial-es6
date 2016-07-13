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
