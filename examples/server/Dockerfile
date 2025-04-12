# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags

FROM oven/bun:1

WORKDIR /usr/src/app

COPY . .

RUN bun install

USER bun

EXPOSE 3030/tcp

ENTRYPOINT [ "bun", "run", "./src/main.ts" ]
