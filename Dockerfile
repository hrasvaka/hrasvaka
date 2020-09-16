FROM node:current-alpine
WORKDIR /opt/hrasvaka
ENV NODE_ENV=production
COPY . /opt/hrasvaka
RUN yarn
VOLUME [ "/opt/hrasvaka/data" ]
EXPOSE 15469
ENTRYPOINT [ "node", "src/hrasvaka.js" ]