FROM node:10 AS build
 
RUN apt-get update
RUN npm i npm@latest -g
 
WORKDIR /app
 
COPY package*.json ./
RUN  npm i

COPY src  ./src
COPY public ./public


ARG REACT_APP_BACKEND_HOST='localhost'
ARG REACT_APP_BACKEND_PORT=3200

RUN  npm run-script build 
 
FROM nginx:stable

COPY --from=0 /app/build/ /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]