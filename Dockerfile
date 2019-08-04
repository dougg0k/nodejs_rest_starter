FROM node:alpine as build
WORKDIR /usr/app_files
COPY tsconfig.json ./
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:alpine as preparation
WORKDIR /usr/app_preparation
COPY ormconfig.js .
COPY package*.json ./
RUN npm install --only=production

FROM node:alpine
WORKDIR /usr/app
COPY --from=build /usr/app_files/dist/src/ .
COPY --from=preparation /usr/app_preparation/ .
EXPOSE 4000
CMD node ./index.js