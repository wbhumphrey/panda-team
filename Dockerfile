FROM instructure/ruby-node-pg:2.3
MAINTAINER Instructure

ENV APP_HOME /usr/src/app/
WORKDIR $APP_HOME

USER root
RUN npm install -g yarn webpack
COPY . $APP_HOME
RUN chown -R docker:docker $APP_HOME

USER docker
RUN gem install foreman bundle \
  && bundle install --jobs 8

WORKDIR $APP_HOME/client
RUN yarn install --pure-lockfile

WORKDIR $APP_HOME
