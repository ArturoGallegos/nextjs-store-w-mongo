import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

let dbIsConnected = 0;
const connect = async () => {
  if(dbIsConnected === 1) return;

  const connections = mongoose.connections;

  if(connections.length > 0) {

    dbIsConnected = connections[0].readyState;

    if(dbIsConnected === 1) return;

    await mongoose.disconnect();
    dbIsConnected = 0;
  };

  await mongoose.connect(process.env.MONGO_DB || '')
  dbIsConnected = 1
}

const disconnect = () => {
  return;
  // if(dbIsConnected === 0 || process.env.NODE_ENV === 'development') return;

  // mongoose.disconnect();
  // dbIsConnected = 0;
}

const db = {
  connect,
  disconnect,
};

export default db;
