FROM node:20-alpine
ENV PORT=3000
ENV WS_PORT=3001
ENV REACT_APP_WS_PORT=3001
ENV REACT_APP_HOSTNAME="127.0.0.1"
COPY . .
WORKDIR /client/
RUN npm install
RUN npm run build
WORKDIR /
RUN npm install
RUN npm run build
CMD ["node", "dist/index.js"]
EXPOSE 3000:3001

