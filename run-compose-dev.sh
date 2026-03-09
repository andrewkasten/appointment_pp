export DJANGO_KEY=abc123
export DEBUG=True
export POSTGRES_DB=appointments
export POSTGRES_USER=postgres
export POSTGRES_PASSWORD=postgres
docker compose -f docker-compose.dev.yml build --no-cache --progress=plain
docker compose -f docker-compose.dev.yml up -d db api frontend
docker-compose -f docker-compose.dev.yml up -d 

# make sure the postgres container is ready, then run migrations
sleep 5
docker exec appointment_pp-api-1  python /src/manage.py makemigrations 
docker exec appointment_pp-api-1  python /src/manage.py migrate