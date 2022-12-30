const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = 5000 || process.env.PORT

//middle wire
app.use(cors());            // for cors policy
app.use(express.json());    // for post request




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2arvn0y.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
    try{
        const taskCollection = client.db('task_manager').collection('tasks');

        app.get('/incomplete',  async(req, res) => {
            const query = {status: 'incomplete'};
            const result = await taskCollection.find(query).toArray();
            res.send(result);
        })

    }

    finally{
        
    }
}
run().catch(err => console.error('my_database_error: ', err));

app.get('/', (req, res) => {
    res.send('Hello from Task Manager Server');
})

app.listen(port, () => console.log(`server is running on port ${port}`));