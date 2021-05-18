Download NodeJS https://nodejs.org/en/ 
(used version 4.4.4)
Download MongoDB https://www.mongodb.com/try/download/community
(used version 4.4.6)

npm init
npm i express
npm i nodemon
npm i hbs
npm i path
npm install --save three
npm i rollup
npm i @rollup/plugin-node-resolve
npm i mongoose
npm i validator
npm i bcryptjs
npm i jsonwebtoken
npm i express-fileupload

use browser with WebGL support

Start DB
mkdir -p $HOME/data
mongod --dbpath $HOME/data

rollup -c 'rollup_config.js'

sudo lsof -nP -i4TCP:3000 | grep LISTEN
