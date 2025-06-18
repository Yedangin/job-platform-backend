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
