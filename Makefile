all: up

up:
	mkdir -p ./src/data/database
	docker compose -f ./src/docker-compose.yml up -d

down:
	docker compose -f ./src/docker-compose.yml down -v

clean: down
	rm -rf ./src/data/database

fclean: clean
	docker system prune -af

re: fclean all

.PHONY: all up down clean fclean