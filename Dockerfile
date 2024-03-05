FROM node:18 as builder

WORKDIR /app

COPY . /app

RUN npm install @angular/cli@latest ngx-toastr

RUN npm run build

EXPOSE 4200

CMD ["npm", "run", "start"]