const express = require('express');
const cors = require('cors');
const RabbitMQService = require('./rabbitMQService');
const db = require('./models');

const app = express();

const port = 5001;

const jobReadRouter = require('./routers/jobReadRouter');

app.use(cors());
app.use(express.json());
app.use("/jobRead", jobReadRouter);


(async () => {
    try {
        await RabbitMQService.connect();
        RabbitMQService.consumeQueue("q_a", (msg) => {
            console.log(' [x] Received %s', msg.content.toString());
        });

        await db.sequelize.sync();
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    } catch (error) {
        console.error("Error during setup:", error);
        process.exit(1);
    }
})();
