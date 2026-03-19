all: up

up:
	mkdir -p ./src/data/uploads/avatars
	mkdir -p ./src/data/uploads/attachments
	mkdir -p ./src/data/database
	cp unicord.png ./src/data/uploads/avatars/default.png
	docker compose -f ./src/docker-compose.yml up -d

down:
	docker compose -f ./src/docker-compose.yml down -v

clean: down
	rm -rf ./src/data

fclean: clean
	docker system prune -af

re: fclean all

.PHONY: all up down clean fclean