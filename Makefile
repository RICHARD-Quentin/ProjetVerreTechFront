runRedis:
				@docker run --name redisVerreTech -p 6379:6379 -d redis

execRedis:
				@docker exec --rm -it redisVerreTech sh

stopRedis:
				@docker stop redisVerreTech
