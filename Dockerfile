# taken from the official docs https://docs-v4.strapi.io/dev-docs/installation/docker#production-dockerfile
# https://forum.strapi.io/t/docker-strapi-node-18-16-alpine-sharp-node-gyp-problem-solved/32245/10
# starting from alpine 3.18 its Python 3.11 is incompatible. alpine 3.17 has Python 3.10
# Creating multi-stage build for production
FROM node:18.18.2-alpine3.17 AS build
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git > /dev/null 2>&1
ENV NODE_ENV=production

# Sets the maximum size for the "old space" (the main part of heap memory) in the V8 engine that is used Node.js.
# We set this value because with the default value, the build was executed with an error.
ENV NODE_OPTIONS="--max-old-space-size=3072"

# this perfectly explains why this is needed https://github.com/strapi/strapi/issues/13889#issuecomment-1516194973
ARG SERVER_URL
ENV SERVER_URL=${SERVER_URL}

WORKDIR /opt/
COPY package.json package-lock.json ./
RUN npm install -g node-gyp
RUN npm config set fetch-retry-maxtimeout 600000 -g && npm ci --only=production

RUN npm install esbuild@0.19.11 --save-exact

WORKDIR /opt/app
COPY . .
RUN npm run build

# Creating final production image
FROM node:18.18.2-alpine3.17
RUN apk add --no-cache vips-dev
ARG NODE_ENV=production
WORKDIR /opt/
COPY --from=build /opt/node_modules ./node_modules
WORKDIR /opt/app
COPY --from=build /opt/app ./
ENV PATH=/opt/node_modules/.bin:$PATH

RUN chown -R node:node /opt/app
USER node
EXPOSE 1337
CMD ["npm", "run", "start"]
