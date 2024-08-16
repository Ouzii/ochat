# ochat


Start with docker:

`git clone git@github.com:Ouzii/ochat.git`

`cd ochat`

`docker build -t ochat .`

`docker run -d -p 3000:3000 -p 3001:3001 ochat`


If needed, change ports and other environment variables in Dockerfile.
