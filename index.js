const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//simpleCrudUser
//zMS4u1FdoSGq1Xr6
//Uniform Resource identifier or Connection String
const uri = "mongodb+srv://simpleCrudUser:zMS4u1FdoSGq1Xr6@tarek-hossen.t4byzjz.mongodb.net/?appName=Tarek-Hossen"

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});


app.get("/", (req, res) => {
  res.send("simple crud server");
});

async function run(){
  try{
    await client.connect()
    await client.db("admin").command({ ping: 1 });

    console.log("✅ Connected successfully!");
    // console.log("connected to Mongodb!")
    
  }
  finally{

  }

}
run().catch(console.dir)

app.listen(port, () => {
  console.log(`simple crud server is loading on port ${port} `);
});
