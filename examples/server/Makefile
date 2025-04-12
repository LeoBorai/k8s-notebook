build:
	docker build -t local/bun-hello-world .

run: build
	docker run -d -p 3030:3030 local/bun-hello-world

tag:
	docker tag local/bun-hello-world localhost:5000/bun-hello-world
	docker push localhost:5000/bun-hello-world
