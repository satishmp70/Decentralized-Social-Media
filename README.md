<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Decentralized Social Media Platform

A decentralized social media platform built with NestJS, React, and Web3 technologies. This platform allows users to interact using their Ethereum wallets as their identity.

## Features

- **Wallet-based Authentication**: Login using your Ethereum wallet through RainbowKit
- **User Profiles**: Create and manage your profile with username, bio, and profile picture
- **Posts**: Create and share posts (limited to 280 characters)
- **Interactions**: Like and comment on posts
- **Decentralized Identity**: Your wallet address serves as your unique identifier

## Tech Stack

### Backend
- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- JWT Authentication
- ethers.js

### Frontend
- React.js
- Next.js
- Tailwind CSS
- RainbowKit
- ethers.js

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL
- MetaMask or any Ethereum wallet
- WalletConnect Project ID (for RainbowKit)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd decentralized-social-media
   ```

2. Set up the backend:
   ```bash
   # Install dependencies
   npm install

   # Create .env file
   cp .env.example .env

   # Update .env with your configuration
   # - Set up your PostgreSQL database credentials
   # - Generate a secure JWT secret
   # - Configure other environment variables

   # Start the development server
   npm run start:dev
   ```

3. Set up the frontend:
   ```bash
   # Navigate to frontend directory
   cd frontend

   # Install dependencies
   npm install

   # Create .env.local file
   cp .env.example .env.local

   # Update .env.local with your configuration
   # - Set NEXT_PUBLIC_API_URL to your backend URL
   # - Add your WalletConnect Project ID

   # Start the development server
   npm run dev
   ```

4. Access the application:
   - Backend API: http://localhost:3000
   - Frontend: http://localhost:3001
   - API Documentation: http://localhost:3000/api

## Development

### Backend

The backend is built with NestJS and provides the following main features:
- Wallet-based authentication
- User profile management
- Post creation and management
- Like and comment functionality

### Frontend

The frontend is built with Next.js and includes:
- Wallet connection using RainbowKit
- Responsive UI with Tailwind CSS
- Real-time updates for posts and interactions

## API Endpoints

### Authentication
- `POST /auth/verify`: Verify wallet signature and get access token

### Users
- `GET /users/:wallet`: Get user profile
- `POST /users`: Create/update user profile

### Posts
- `GET /posts`: Get all posts
- `POST /posts`: Create a new post
- `GET /posts/:id`: Get a specific post
- `DELETE /posts/:id`: Delete a post

### Comments
- `GET /posts/:postId/comments`: Get all comments for a post
- `POST /posts/:postId/comments`: Add a comment
- `DELETE /posts/:postId/comments/:id`: Delete a comment

### Likes
- `POST /posts/:postId/likes`: Like a post
- `DELETE /posts/:postId/likes`: Unlike a post

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
