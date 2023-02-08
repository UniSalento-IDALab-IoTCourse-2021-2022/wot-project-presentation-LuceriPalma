const express = require("express");
var cors = require('cors');
const fs = require("fs");
const http = require("http");
const https = require("https");
const execFile = require('child_process').execFile;

const WebSocket = require('ws');
const path = require('path');
const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
const app = express();
app.use(cors());
const uri = 'mongodb://localhost/';




if (process.env.NODE_ENV === 'production') {
	console.log("NODE_ENV=production");
	const privateKey = fs.readFileSync('/var/www/iot-t52.duckdns.org/live/privkey.pem', 'utf8');
	const certificate = fs.readFileSync('/var/www/iot-t52.duckdns.org/live/cert.pem', 'utf8');
	const ca = fs.readFileSync('/var/www/iot-t52.duckdns.org/live/chain.pem', 'utf8');

	const credentials = {
		key: privateKey,
		cert: certificate,
		ca: ca
	};

	// Starting both http & https servers
//	const httpServer = http.createServer(app);
	const httpsServer = https.createServer(credentials, app);

httpsServer.listen(3002, () => {
    console.log("Server running on port 3002");
});
var wss = new WebSocket.Server({ server: httpsServer });
}
else {
	//if (process.env.NODE_ENV === 'development') {
	  // ...
		//const credentials = {};
		console.log("NODE_ENV=development");
			// Starting both http & https servers
			const httpServer = http.createServer(app);
			//const httpsServer = https.createServer(credentials, app);

		httpServer.listen(3002, () => {
		    console.log("Server running on port 3002");
		});
		var wss = new WebSocket.Server({ server: httpServer });
	}
//}


wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });
    ws.send('something');
});


app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json());
app.post("/temperature", (req, res, next) => {
    console.log(req.body.temperature);
    var temperature = req.body.temperature;
    var timestamp = req.body.timestamp;
    var sensor = req.body.sensor;

    async function pushInDb() {

        const client = new MongoClient(uri, {useUnifiedTopology: true});
        try {

            await client.connect();

            const database = client.db("TemperatureDB");
            const temperatureColl = database.collection("temperature");
            // create a document to be inserted
            const doc = {
                value: temperature,
                timestamp: timestamp,
                sensorId: sensor,
                roomId: 'room1'
            };

            const result = await temperatureColl.insertOne(doc);
            console.log(`${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,);
        } finally {
            await client.close();
        }
    }

    pushInDb().catch(console.dir);
    async function pushToClient(){
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(temperature);
            }
        });
    }
    pushToClient().catch(console.dir);
    res.sendStatus(200)
});


app.post("/thingy52", (req, res, next) => {
    var datareceived = JSON.stringify(req.body);
    var data = datareceived;
    console.log(data);
    // var temperature = req.body.temperature;
    // var timestamp = req.body.timestamp;
    // var sensor = req.body.sensor;

    // async function pushInDb() {
    //
    //     const client = new MongoClient(uri, {useUnifiedTopology: true});
    //     try {
    //
    //         await client.connect();
    //
    //         const database = client.db("TemperatureDB");
    //         const temperatureColl = database.collection("temperature");
    //         // create a document to be inserted
    //         const doc = {
    //             value: temperature,
    //             timestamp: timestamp,
    //             sensorId: sensor,
    //             roomId: 'room1'
    //         };
    //
    //         const result = await temperatureColl.insertOne(doc);
    //         console.log(`${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,);
    //     } finally {
    //         await client.close();
    //     }
    // }
    //
    // pushInDb().catch(console.dir);
    async function pushToAllClient(){
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    }
    pushToAllClient().catch(console.dir);
    res.sendStatus(200)
});


app.get('/startmodel/:id?', (req, res) => {
    // Retrieve the tag from our URL path
    var id = req.params.id;
    if (id) {
	console.log('richiesto modello per id:' + id);
	// const child = execFile('../../model/script_per_model.sh', [ id ], (error, stdout, stderr) => {
		const child = execFile('../../model/script_per_model.sh',  (error, stdout, stderr) => {
	if (error) {
	    console.error('stderr', stderr);
	    throw error;
	}
	console.log('stdout', stdout);
	res.end(stdout);
    });
    }
    else {
	res.end('no parametro id nella richiesta.');
	console.log('lancio modello');
	const child = execFile('../../model/script_per_model.sh',  (error, stdout, stderr) => {
if (error) {
		console.error('stderr', stderr);
		throw error;
}
console.log('stdout', stdout);
res.end(stdout);
	});
    }
});

app.get('/dashboard', async (req, res) => {

    /*
    async function run() {
        const client = new MongoClient(uri, {useUnifiedTopology: true});
        try {
            await client.connect();
            const database = client.db("TemperatureDB");
            const tem = database.collection("temperature");
            // Query for a temperature with a timestamp that is greater than 0
            const query = { timestamp: {$gt: 0}};
            const options = {
                // sort matched documents in descending order by timestamp
                sort: { timestamp: -1 },
            };
            const singleTemperature = await tem.findOne(query, options);
            // since this method returns the matched document, not a cursor, print it directly
            console.log(singleTemperature);
            try {
                return singleTemperature.value;
            }
            catch (e)
            {
                return -1;
            }
        } finally {
            await client.close();
        }
    }
    //use await for wating the promise
    var finalTemp = await run().catch(console.dir);
    res.send('Hello World! The last temperature is: '+finalTemp);
     */
    res.sendFile(path.join(__dirname + '/index.html'));
})
