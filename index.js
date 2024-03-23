const express = require('express');
const app = express();
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const {response} = require('express');

const port = process.env.PORT || 5000;

const {MongoClient, ServerApiVersion, ClientSession} = require('mongodb');

app.use(cors());
app.use(express.json());


//password: xuuHWRYiahfvbPnx
const uri = "mongodb+srv://mollikacomputer3:xuuHWRYiahfvbPnx@cluster0.q5xegkn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const userCollection = client.db('News-test').collection("user")
    // Connect the client to the server	(optional starting in v4.7)
    // // console.log("DAtabase connection Ranjit");   
    // app.post('/users', async(req, res)=>{
    //   const newUser = req.body;
    //   console.log('adding New User', newUser);

    //   const result = await userCollection.insertOne(newUser);
    //   res.send({result:'success'})
    // })


    // get data from server
    app.get('/users', async(req, res)=>{
      //client.close(); if this line not comment then every operation need under 2 lines added
      // await client.connect();
      // const userCollection = client.db('News-test').collection("user")

      const query = {};
      const cursor = userCollection.find(query);
      const user = await cursor.toArray();
      res.send(user);
    });

    // add new user to server
    app.post('/users', async(req, res)=>{
      //client.close(); if this line not comment then every operation need under 2 lines added
      // await client.connect();
      // const userCollection = client.db('News-test').collection("user");

      const newUser = req.body;
      console.log("get new user from client side ", newUser);
      const result = await userCollection.insertOne(newUser);
      // res.send({result:"Success"});
      res.send(result);
    })

    // DELETE USER 
    app.delete('/users/:id', async(req, res)=>{
      //client.close(); if this line not comment then every operation need under 2 lines added
      // await client.connect();
      // const userCollection = client.db('News-test').collection("user");

      const id = req.params.id;
      console.log("delete from database", id);
      const query = {_id: new ObjectId(id)};
      const result = await userCollection.deleteOne(query);
      res.send(result);

    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
    console.log("working is good");
  }
}
run().catch(console.dir);


app.get('/', (req, res)=>{
    res.send("Simple crud app server is running")
})

app.listen(port, ()=>{
    console.log(`Server is running on PORT: ${port}`);
})
