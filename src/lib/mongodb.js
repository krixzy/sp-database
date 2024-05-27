import User from './User';
const { MongoClient, ObjectId } = require('mongodb');
const uri = process.env.MONGODB_URL;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

export async function saveData(data, collection) {

  try {
    await findCollection(collection).insertOne(data);
  } catch (e) {
    console.error(e);
  }
}

export async function getData(id, collection) {

}

export async function getCollection(collection){
  try {
    console.log(uri)
    const data = await findCollection(collection).find().toArray();
    return data;
  } catch (e) {
    console.error(e);
  }

}

export async function deleteData(id, collection) {

  try {
    await findCollection(collection).deleteOne({ _id: new ObjectId(id)});

  } catch (e) {
    console.error(e);
  }
}


const findCollection = (collection) => {
  return client.db("SP-Database").collection(collection);
}