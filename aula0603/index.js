const fs = require('fs')
const http = require('http')
const url = require('url')

const port = 3000

const sever =  http.createServer((req, res) => {

    var urlInfo = require('url').parse(req.url, true)
    const name = urlInfo.query.name

    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')

    if (!name) { 
        fs.readFile ('index.html', function (err, data) {
            if (!data) {
                res.writeHead(500, {'content-Type': 'text/html'})
                res.write("<p>"+ err+ "</p>")
                return res.end()
            }
            res.writeHead(200, {'content-Type': 'text/html'})
            res.write(data)
            return res.end()
        })
    } else {
         fs.writeFile('arquivo.txt', name, function(err, data) {
            res.writeHead(302, {
                location: '/'
            }) 
         })
         return res.end()
    }   
})

sever.listen(port, () => {
    console.log('Funfando na porta: '+ port)
})

