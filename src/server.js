const express = require('express')
const server = express()
const routes = require('./routes')
const path = require("path")

// Usando template engine
server.set('view engine', 'ejs')

// Mudar a localização da pasta view (adiciona views : src/views nas configurações do server)
server.set('views', path.join(__dirname, 'views'))

// Habilitar arquivos estaticos
server.use(express.static("public"))

 // Habilitar o req.body
 server.use(express.urlencoded({ extended : true}))

// Rotas
server.use(routes)

// server.get('/', (req, res) => { 
//     return res.send('aqui')
//     }
// )

server.listen(3000, () => console.log('rodando'))