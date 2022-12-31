const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        app.get('/complete',  async(req, res) => {
            const query = {status: 'complete'};
            const result = await taskCollection.find(query).toArray();
            res.send(result);
        })
        app.get('/star',  async(req, res) => {
            const query = {star: 'yes'};
            const result = await taskCollection.find(query).toArray();
            res.send(result);
        })
        app.get('/edit-task/:id',  async(req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await taskCollection.findOne(query);
            res.send(result);
        })

        app.post('/task', async(req,res) => {
            const task = req.body;
            const result = await taskCollection.insertOne(task);
            res.send(result);
        })

        app.delete('/task/:id', async(req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id)};
            const result = await taskCollection.deleteOne(query);
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