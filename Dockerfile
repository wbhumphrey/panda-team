FROM instructure/ruby-passenger:2.3
MAINTAINER Instructure

COPY Gemfile /usr/src/app/

USER root
RUN apt-get update && apt-get install --yes -qq --no-install-recommends nodejs
RUN chown -R docker:docker /usr/src/app
USER docker
RUN /bin/bash -l -c "bundle install"

COPY . /usr/src/app
USER root
RUN chown -R docker:docker /usr/src/app/*
USER docker
CMD /bin/bash