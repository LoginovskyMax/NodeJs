const http = require('http')
const fs = require('fs')

let reqCounter = 0

const wait = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>resolve(), ms)
    })
}
const readFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if(err) reject('err')
            else resolve(data)
        })
    })
}

const server = http.createServer(async (req, res) => {
    reqCounter++
    switch (req.url) {
        case '/':{
            const data = await readFile('pages/home.html')
            res.write(data)
            res.end()
            break;
        }

        case '/students':
            await wait(3000)
            res.write('students')
            res.end()
            break;
    
        default:
            res.write('not found')
            res.end()
            break;
    }
})

server.listen(3030)