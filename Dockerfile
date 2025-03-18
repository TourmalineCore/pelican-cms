# Creating multi-stage build for production
FROM node:21-alpine as build
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git > /dev/null 2>&1
ARG NODE_ENV=production
ARG SERVER_URL
ENV SERVER_URL=${SERVER_URL}

WORKDIR /opt/
COPY package.json package-lock.json ./
RUN npm install -g node-gyp
RUN npm config set fetch-retry-maxtimeout 600000 -g && npm install --only=production

RUN npm install esbuild@0.19.11 --save-exact

WORKDIR /opt/app
COPY . .
RUN npm run build

# Creating final production image
FROM node:21-alpine
RUN apk add --no-cache vips-dev
ARG NODE_ENV=production
ARG SERVER_URL
ENV SERVER_URL=${SERVER_URL}

WORKDIR /opt/
COPY --from=build /opt/node_modules ./node_modules
WORKDIR /opt/app
COPY --from=build /opt/app ./
ENV PATH /opt/node_modules/.bin:$PATH

RUN chown -R node:node /opt/app
USER node
EXPOSE 1337
CMD ["npm", "run", "start"]
