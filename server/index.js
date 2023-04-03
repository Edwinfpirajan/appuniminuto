//IMPORTACIÓN DE LOS PAQUETES
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const db = require('./common/connection')
const cors = require('cors')

const app = express()
const port = 8080

db.connect()

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send(`Servidor corriendo en el puerto ${port}`)
})

app.use('/api', router)

app.listen(port, ()=>{
    console.log(`Servidor corriendo en el puerto ${port}`)
})






