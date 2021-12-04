#FROM library/node:6
FROM ubuntu:xenial-20210114

MAINTAINER "Daniel Garcia aka (cr0hn)" <cr0hn@cr0hn.com>

ENV STAGE "DOCKER"

RUN apt-get update && apt-get -y upgrade && \
    apt-get install -y nodejs npm netcat

# Fix node links
RUN ln -s /usr/bin/nodejs /usr/bin/node

# Build app folders
RUN mkdir /app
WORKDIR /app

# Install depends
COPY package.json /app/
RUN npm install

# Bundle code
COPY . /app

RUN chmod +x /app/start.sh

EXPOSE 3000

CMD [ "/app/start.sh" ]
#CMD [ "npm", "start" ]