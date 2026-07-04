const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//simpleCrudUser
//zMS4u1FdoSGq1Xr6

//Uniform Resource identifier or Connection String(step-1)
const uri =
  "mongodb+srv://simpleCrudUser:zMS4u1FdoSGq1Xr6@tarek-hossen.t4byzjz.mongodb.net/?appName=Tarek-Hossen";

//client(step-2)
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

//first time server testing
app.get("/", (req, res) => {
  res.send("simple crud server");
});

//async function(step-3)
async function run() {
  try {
    await client.connect();

    //for create a db & collection inside the mongodb
    const usersDB = client.db("usersDB");
    const usersCollection = usersDB.collection("usersCollection");

    //database related apis here:-----

    //find all user from the db(read operation)
    app.get("/users", async (req, res) => {
      const cursor = usersCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // find a single user from the db(read operation)
    app.get("/users/:id",async(req,res)=>{
      const id = req.params.id
      const query = {_id:new ObjectId(id)}
      const result = await usersCollection.findOne(query)
      res.send(result)
    })

    //delete a user from the db(delete operation)
    app.delete("/users/:id", async(req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = {_id:new ObjectId(id)}
      const result = await usersCollection.deleteOne(query)
      res.send(result)
    });

    //send a user from the client side to db(create operation)
    app.post("/users", async (req, res) => {
      const newUser = req.body;
      console.log("hitting the server console", newUser);
      const result = await usersCollection.insertOne(newUser);
      res.send(result);
    });

    //for show ping in the server side console
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Connected successfully!");
    // console.log("connected to Mongodb!")
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`simple crud server is loading on port ${port} `);
});
