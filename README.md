# BookStore-Microservice

## Mục lục

- [Mục lục](#mục-lục)
- [Giới thiệu](#giới-thiệu)
- [Cài đặt](#cài-đặt)
- [Bắt đầu](#bắt-đầu)
- [Cấu trúc](#cấu-trúc)
- [Các công nghệ sử dụng](#các-công-nghệ-sử-dụng)
- [Các chức năng](#các-chức-năng)
- [Tác giả](#tác-giả)

## Giới thiệu

Xin chào các bạn,

## Cài đặt

Để cài đặt BookStore-Microservice, bạn cần có [Node.js](https://nodejs.org/en/), [npm](https://www.npmjs.com/) và [Redis](https://redis.io/) cách để cài [Redis](https://redis.io/docs/getting-started/installation/install-redis-on-windows/) đã được cài đặt trên máy tính. Sau đó, bạn có thể chạy các lệnh sau để cài đặt BookStore-Microservice:

```bash
git clone https://github.com/Toan-Errors/book-store-microservice.git
cd book-store-microservice
npm install
```

Nếu bị lỗi thì hãy xóa thư mục `node_modules` và `package-log.json` và chạy lệnh sau:

```bash
npm install --force
```

hoặc

```bash
npm install --legacy-peer-deps
```

## Bắt đầu

### để chạy từng service:

```bash
npm run start [service]
```

### ví dụ:

```bash
npm run start user-service
npm run start book-service
npm run start api-gateway
```

## Cấu trúc

BookStore-Microservice được xây dựng bằng [NestJS](https://nestjs.com/) và [Node.js](https://nodejs.org/en/) cùng với ngôn ngữ lập trình [TypeScript](https://www.typescriptlang.org/). Các thư mục chính của BookStore-Microservice:

- `apps`: chứa các ứng dụng của BookStore-Microservice
  - `api-gateway`
  - `book-service`
  - `user-service`
- `libs`: chứa các thư viện của BookStore-Microservice
  - `book-service`
  - `user-service`
- `node_modules`: chứa các thư viện của BookStore-Microservice
- `package.json`: tệp cấu hình của BookStore-Microservice
- `package-lock.json`: tệp cấu hình của BookStore-Microservice
- `README.md`: tệp giới thiệu của BookStore-Microservice

## Các công nghệ sử dụng

BookStore-Microservice sử dụng các công nghệ chính sau:

- [NestJS](https://nestjs.com/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Passport](http://www.passportjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Các chức năng

BookStore-Microservice có các chức năng sau:

- Mua bán sách

## Các lỗi đã biết

BookStore-Microservice có các lỗi sau:

- Hiện tại chưa có lỗi nào được biết

## Tác giả

BookStore-Microservice được xây dựng bởi [Nguyen Van Toan(errors)](https://fb.com/toanerrors)
