FROM ruby:3.2.2 

RUN apt-get update -qq && apt-get install -y build-essential nodejs npm libpq-dev postgresql-client

RUN npm install -g yarn

WORKDIR /usr/src/backend

ADD ./backend /usr/src/backend

RUN gem install bundler

RUN bundle install

EXPOSE 8080

CMD ["rails", "server", "-b", "0.0.0.0", "-p", "8080"]