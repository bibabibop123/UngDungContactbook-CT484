// const app = require("./app");
// const config = require("./app/config");

// const PORT = config.app.port;
// app.listen(PORT, () => {
//     console.log('server is running on port ${PORT}');
// });

const app = require("./app");
const config = require("./app/config");
const MongoDB = require("./app/utils/mongodb.util");

async function startServer() {
    try {
        await MongoDB.connect(config.db.uri);
        console.log("connect to database");

        const PORT = config.app.port;
        app.listen(PORT, () => {
            console.log("listening on port ${PORT}");
        });
    } catch (err) {
        console.log("cannot connect to database", err);
        process.exit();
    }
}

startServer();