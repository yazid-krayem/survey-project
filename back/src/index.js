import {createServer} from 'http'

const whenRequestReceived = (res,req) =>{
    res.writeHead(200,{'Content-Type':`text/plain`})
    res.write('heellp')
    res.end()

}

const server = createServer(whenRequestReceived)

server.listen(8080,()=>{console.log('ok,listening ')})