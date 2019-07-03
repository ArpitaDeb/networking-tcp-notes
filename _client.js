const net = require('net');
const stdin = process.stdin
// stdin.setRawMode(true)
stdin.resume()
// interpret incoming data as text
stdin.setEncoding('utf8'); 

const client = net.createConnection({ 
  host: '192.168.88.52',
  port: 4000
});
client.setEncoding('utf8'); 


console.log('Connecting ...');

// make a buffer for message, send it on enter.

stdin.on('data', data => {
  // CTRL C , paste
  // \u0003 maps to ctrl+c input
  if (data === '\\q\n') {
    client.end();
    process.exit();
  }

  // if (data === '\u2324') {
  //   console.log('enter!')
  // }

  console.log('data', data)

  // console.log('data', data)
  // process.stdout.write(data)
  client.write(data)
})

client.on('data', data => {
  console.log('from server', data)
  // console.log(data.toString())
})

client.on('end', () => {
  console.log('end')
  process.exit()
})