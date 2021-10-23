const { getClient } = require('./dbConnection')

exports.getItems = async (req, res) =>{
  const { uid } = req.params
  const client = await getClient()
  const db = client.db('markethelperapp')
  const collection = db.collections('items')

  try{
    const items = collection.find({'uid': uid })
    const item = await items.toArray()
    res.status(200).send(item)
  }catch(err){
    res.status(401).send(err)
  }
  
}

exports.createItem = async (req, res) =>{
  const {name, uid} = req.body
  if(!name || !uid){
    res.status(401).send('Invalid request')
  }
  const client = await getClient()
  const db = client.db('markethelperapp');
  const collection = db.collection('items')

  const now = new Date()

  const item = {
    name,
    done: false,
    uid,
    active: true,
    created_at: now,
    updated_at: now
  }

  try{
    const result = await collection.insertOne(item)
    item.uid = result.insertedId
    res.status(201).send(item)
  }
  catch(error){
    res.status(500).send(error)
  }
}