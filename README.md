# NestJS Authentication Base Framework Documentation

## Overview

This project provides a robust authentication framework built with NestJS, MongoDB, and Docker, designed to serve as a foundation for backend applications. It includes:

- JWT authentication
- Local (email/password) login
- OAuth integration (Google, Facebook, Kakao, Apple)
- Password reset functionality
- Job Searching Functionality
- Caching for better performance
- Dockerized environment
- CI/CD pipeline
- Git hooks with Husky

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
3. [Getting Started](#getting-started)
4. [API Documentation](#api-documentation)
5. [Development Workflow](#development-workflow)
6. [CI/CD Pipeline](#cicd-pipeline)
7. [Git Hooks](#git-hooks)
8. [Deployment](#deployment)
9. [Monitoring](#monitoring)
10. [Troubleshooting](#troubleshooting)
11. [Maintenance](#maintenance)
12. [Makefile Commands](#makefile-commands)

## Prerequisites

- Docker (20.10+) and Docker Compose
- Node.js (16+)
- npm (8+)
- MongoDB (if running locally without Docker)

```plaintext
base-be/
├── .github/ # GitHub workflows for CI/CD
├── .husky/ # Git hooks
├── prisma/ # Database schema and migrations
├── src/
│   ├── auth/ # Authentication module
│   ├── common/ # Shared utilities and decorators
│   ├── prisma/ # Prisma service
│   └── main.ts # Application entry point
├── test/ # Test files
├── commitlint.config.js / # Commitlint file for better git commit
├── docker-compose.yml # Docker configuration
├── Dockerfile # Backend Docker configuration
├── .env.example # Environment variables template
└── package.json
```

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-repo/base-be.git
cd base-be
```

### 2. Set up environment variables
```bash
cp .env.example .env
```
Edit the `.env` file with your configuration.

### 3. Start the application with Docker
```bash
docker-compose up -d --build
```

### 4. Initialize the database
```bash
docker-compose exec backend npm run seed
```

## API Documentation
After starting the application, access the Swagger UI at:  
http://localhost:8000/api

### Authentication Endpoints
| Method | Endpoint                      | Description                     |
|--------|-------------------------------|---------------------------------|
| POST   | /auth/register                | Register new user               |
| POST   | /auth/login                   | Login with email/password       |
| GET    | /auth/google                  | Initiate Google OAuth login     |
| GET    | /auth/facebook                | Initiate Facebook OAuth login   |
| POST   | /auth/request-password-reset | Request password reset email    |
| POST   | /auth/reset-password          | Reset password with token       |
| GET    | /auth/profile                 | Get current user profile (protected) |

## Development Workflow

### Running without Docker
```bash
npm install
npm run start:dev
```

### Running tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

### Formatting
```bash
npm run format
```

## CI/CD Pipeline

The project includes GitHub Actions workflows for:

**CI Pipeline:**

- Runs on every push to any branch
- Checks out code
- Sets up Node.js
- Installs dependencies
- Runs linting
- Executes tests

**CD Pipeline:**

- Runs on push to main branch
- Builds and pushes Docker image to registry
- Deploys to production environment

## Git Hooks

Husky is configured with:

- `pre-commit`: Runs lint-staged (formats and lints staged files)
- `pre-push`: Runs tests

## Deployment

### Production Environment Variables
Create a `.env.prod` file with production values.

### Building for Production
```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

## Monitoring

Access MongoDB admin interface at:  
http://localhost:8081

## Troubleshooting

### Common Issues

**MongoDB connection errors:**

- Ensure MongoDB is running
- Check connection string in `.env`
- For Docker, wait for MongoDB to fully initialize

**OAuth not working:**

- Verify callback URLs match provider configurations
- Check client IDs and secrets
- Ensure redirect URIs are whitelisted in provider dashboards

## Maintenance

### Updating Dependencies
```bash
npm outdated
npm update
```

### Database Migrations
When changing the Prisma schema:
```bash
npx prisma migrate dev --name your_migration_name
npx prisma migrate deploy
```

## Makefile Commands

```makefile
# Makefile for E-Learning Backend Project

APP_NAME = Base-Be

up:
	@echo "Stopping docker images (if running)..."
	docker-compose down
	@echo "Building (when required) and starting docker images..."
	docker compose up --build -d
	@echo "Docker images built and started!"

down:
	@echo "Stopping docker compose..."
	docker compose down --volumes --remove-orphans
	@echo "Done!"

start:
	docker compose up

stop:
	docker compose stop

restart: down up

logs:
	docker compose logs -f $(APP_NAME)

exec:
	docker exec -it $(APP_NAME) sh

prisma-generate:
	docker compose exec $(APP_NAME) npx prisma generate

prisma-push:
	docker compose exec $(APP_NAME) npx prisma db push

prisma-studio:
	docker compose exec $(APP_NAME) npx prisma studio

clean:
	docker system prune -af --volumes

rebuild: clean up
```

## License

MIT License

## Support

For issues or questions, please open an issue in the GitHub repository.
