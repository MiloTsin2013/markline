name = $(shell cat package.json | grep '"name"' | awk -F'"' '{print $$4}')
version = $(shell cat package.json | grep '"version"' | awk -F'"' '{print $$4}')
seajs_version = $(shell cat package.json | grep '"seajs"' | awk -F'"' '{print $$4}')

install:
	@spm install

build: clear
	@spm build --with-deps
	@mkdir -p ./dist/seajs/$(seajs_version)
	@cp ./spm_modules/seajs/$(seajs_version)/dist/* ./dist/seajs/$(seajs_version)

publish:
	@git push origin gh-pages

# npm install node-static -g
preview:
	@static .

clear:
	@rm -rf dist
