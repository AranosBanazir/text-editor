import { openDB } from 'idb';

const dbName = 'jate'
const dbVersion = 1
const objectStoreName = 'jate'

const initdb = async () =>
  openDB(dbName, dbVersion, {
    upgrade(db) {
      if (db.objectStoreNames.contains(objectStoreName)) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore(objectStoreName, { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  const dbPreInteraction = async (type) =>{
    const db = await openDB(dbName, dbVersion)
    const tx = await db.transaction(objectStoreName, type)
    const store = await tx.objectStore(objectStoreName)
    return store
  }

export const putDb = async (content) => {
  const store = await dbPreInteraction('readwrite')
  const result = await store.put({...content, id:0})
  return result
}

export const getDb = async () => {
  const store = await dbPreInteraction('readonly')
  const result = await store.get(0)
  return result
}

initdb();
