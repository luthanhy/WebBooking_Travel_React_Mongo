FROM node:16-alpine 

WORKDIR /tour-managemen/backend

COPY package*.json ./
RUN npm install
COPY . .
RUN npm install -g @babel/core @babel/cli
EXPOSE 4000

RUN npm run build-src

CMD ["npm", "run", "build"]
