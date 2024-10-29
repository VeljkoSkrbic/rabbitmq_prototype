const express = require('express');
const cors = require('cors');
const db = require('./models');
const startJobEventConsumer = require('./handlers/jobEventHandler');

const app = express();
const port = 5001;

const jobReadRouter = require('./routers/jobReadRouter');

app.use(cors());
app.use(express.json());
app.use("/jobRead", jobReadRouter);

(async () => {
    try {
        // Start the RabbitMQ job event consumer
        await startJobEventConsumer();

        // Sync the database and start the Express server
        await db.sequelize.sync();
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    } catch (error) {
        console.error("Error during setup:", error);
        process.exit(1);
    }
})();
