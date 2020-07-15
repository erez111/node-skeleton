ARG APP_NODEJS_VER

# Docker Builder
FROM node:$APP_NODEJS_VER-alpine AS builder
RUN mkdir -p /usr/app
COPY ./ /usr/app
WORKDIR /usr/app
RUN npm install \
    && npm run build \
    && npm prune --production

#  Docker Target
FROM node:$APP_NODEJS_VER-alpine
RUN mkdir -p /usr/app
COPY --from=builder /usr/app/build /usr/app/build
COPY --from=builder /usr/app/package.json /usr/app/package.json
COPY --from=builder /usr/app/node_modules /usr/app/node_modules
WORKDIR /usr/app
EXPOSE 3100
CMD [ "npm", "run", "start:docker" ]

# For Debugging a docker container
#docker run -it --entrypoint /bin/sh $IMAGE_NAME -s
