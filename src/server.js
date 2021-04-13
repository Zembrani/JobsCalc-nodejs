const express = require('express')
const server = express()
const routes = require('./routes')

// Usando template engine
server.set('view engine', 'ejs')

// Habilitar arquivos estaticos
server.use(express.static("public"))

// Rotas
server.use(routes)

// server.get('/', (req, res) => { 
//     return res.send('aqui')
//     }
// )

server.listen(3000, () => console.log('rodando'))