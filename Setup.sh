composer install --no-dev
docker compose up -d --force-recreate --build api --build phpmyadmin --build mysql # This is to make a fresh build