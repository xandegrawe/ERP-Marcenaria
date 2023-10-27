docker:
	sudo rm backend/tmp/pids/server.pid -f
	sudo docker compose -f docker-compose.yml up --remove-orphans

bash:
	sudo docker compose -f docker-compose.yml exec backend_rails_api /bin/bash

frontend:
	sudo docker start react_front_end
	sudo docker compose -f docker-compose.yml exec react_front_end /bin/bash	

build:
	sudo docker compose -f docker-compose.yml build

bundle:
	echo "*** bundle install ***"
	sudo docker container exec backend_rails_api bash -c "cd rails-api && bundle install"

migrate:
	echo "*** create and migrate database ***"
	sudo docker container exec backend_rails_api bash -c "cd rails-api && rake db:create"
	sudo docker container exec backend_rails_api bash -c "cd rails-api && rake db:migrate"

debug:
	sudo docker attach backend_rails_api