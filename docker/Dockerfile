ARG NODEJS_VERSION=18

##### Stage 1

FROM node:$NODEJS_VERSION-alpine AS builder

RUN apk add --no-cache alpine-sdk=~1 python3=~3 libtool=~2 autoconf=~2 automake=~1 rust=~1 cargo=~1 cmake=~3 clang15-libs=~15 clang15-dev=~15 clang15=~15 rustfmt=~1 linux-headers=~6 && \
    adduser -D klayr && \
    mkdir /home/klayr/build && \
    chown -R klayr:klayr /home/klayr/

USER klayr
WORKDIR /home/klayr/build

COPY ./yarn.lock ./package.json ./.npmrc ./
RUN yarn install --frozen-lockfile


##### Stage 2

FROM node:$NODEJS_VERSION-alpine

RUN adduser -D klayr && \
    mkdir /home/klayr/.klayr && \
    chown -R klayr:klayr /home/klayr/

USER klayr
WORKDIR /home/klayr
VOLUME ["/home/klayr/.klayr"]

COPY --chown=klayr:klayr ./ .
COPY --from=builder /home/klayr/build/node_modules/ ./node_modules/

RUN npm run build

ENTRYPOINT ["/home/klayr/bin/run"]
CMD ["start", "--network", "mainnet"]
