import { Client, Account, Storage, ID } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://nyc.cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const storage = new Storage(client);

export const bucketId = import.meta.env.VITE_APPWRITE_BUCKET_ID;


export { ID };