# ochat


Start with docker:

`git clone git@github.com:Ouzii/ochat.git`

`cd ochat`

`docker build -t ochat .`

`docker run -dp 127.0.0.1:3000:3000 -p 127.0.0.1:3001:3001 ochat`


If needed, change ports and environment variables in Dockerfile.
