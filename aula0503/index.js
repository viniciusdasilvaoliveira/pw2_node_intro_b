const fs = require('fs')
const http = require('http')
const port = 3000

const sever =  http.createServer((req, res) => {
    fs.readFile ('mensagem.html', function (err, data) {
        if (!data) {
            res.writeHead(500, {'content-Type': 'text/html'})
            res.write("<p>"+ err+ "</p>")
            return res.end()
        }
        res.writeHead(200, {'content-Type': 'text/html'})
        res.write(data)
        return res.end()
    })
})

sever.listen(port, () => {
    console.log('Funfando na porta: '+ port)
})

