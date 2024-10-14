const express = require('express')
const cors = require('cors');
const amqplib = require('amqplib')

const app = express()
app.use(cors());

const port = 5001;

var connection = null;
var channel = null;
var queue = "a_b";

async function setup(){
    connection = await amqplib.connect('amqp://rabbitmq:rabbitmq@rabbitmq')
    channel = await connection.createChannel()
  
    await channel.assertQueue(queue, { durable: false })

    console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue)

    channel.consume(queue, (msg) => {
        console.log(' [x] Received %s', msg.content.toString())
    }, { noAck: true })
}

app.get('/', async (req, res) => {
    channel.sendToQueue("a_a", Buffer.from('Hello World!'))
    return res.send('Hello World!')
})

setup()
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})