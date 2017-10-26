FROM instructure/ruby-node-pg:2.3
MAINTAINER Instructure

ENV APP_HOME /usr/src/app/
WORKDIR $APP_HOME

USER root
RUN npm install -g n && n 6.9.0
RUN npm install -g yarn webpack
COPY . $APP_HOME
RUN chown -R docker:docker $APP_HOME

USER docker
RUN gem install bundler -v 1.13.6 && \
    bundle install --jobs 4

WORKDIR $APP_HOME/client
RUN yarn install --pure-lockfile

WORKDIR $APP_HOME
RUN bundle exec rake assets:clean assets:precompile

