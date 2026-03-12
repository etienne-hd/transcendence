SHELL := /bin/bash

all: up

fast:
	@( \
	docker rm -f database 2>/dev/null || true; \
	docker run --env-file src/.env.example --name database -p 3307:3306 mariadb:12 & \
	DB=$$!; \
	cd src/frontend && npm run dev & \
	B=$$!; \
	cd src/backend && npm run start:dev & \
	F=$$!; \
	trap 'kill $$DB $$B $$F 2>/dev/null; docker rm -f database 2>/dev/null' INT TERM EXIT; \
	while kill -0 $$DB $$B $$F 2>/dev/null; do \
		sleep 1; \
	done; \
	kill $$DB $$B $$F 2>/dev/null || true; \
	docker rm -f database 2>/dev/null || true; \
	)

up:
	mkdir -p ./src/data/database
	docker compose -f ./src/docker-compose.yml up -d

down:
	docker compose -f ./src/docker-compose.yml down -v

clean: down
	rm -rf ./src/data

fclean: clean
	docker system prune -af

re: fclean all

.PHONY: all fast fastclean up down clean fclean
