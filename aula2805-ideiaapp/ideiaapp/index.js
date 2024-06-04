const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')
const conn = require('./db/conn')

const app = express()

//criando o ideia
const Ideia = require('./models/Ideia')
const authRoutes = require('./routes/authRoutes')
const ideiasRoutes = require('./routes/ideiasRoutes')
const IdeiaController = require('./controllers/IdeiaController')

app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json())

app.use('/ideias', ideiasRoutes)
app.use('/', authRoutes)
app.get('/')

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

conn 
.sync({force:true})
.then(() => {
    app.listen(3000, () => {
        console.log("Servidor operando na porta local: http://127.0.0.1:3000")
    })
})
