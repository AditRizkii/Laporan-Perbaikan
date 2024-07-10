import { openDB } from "idb";

const DB_NAME = "ImageDatabase";
const DB_VERSION = 1;
const STORE_NAME = "images";

export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
};

export const saveImage = async (imageData) => {
  const db = await initDB();
  await db.add(STORE_NAME, { imageData });
};

export const getAllImages = async () => {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
};

export const deleteImage = async (id) => {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
};
