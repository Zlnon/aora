import { Account, Client } from "react-native-appwrite";
export const config = {
  endpoint: "https://colud.appwirte.io/v1",
  platform: "com.jsm.aora",
  projectId: "6682f089002f87a6653e",
  databaseId: "6682f2c9000a68f49ad6",
  userCollectionId: "6682f30f0022c2713c4f",
  videoCollectionId: "6682f358001afc6fbb9c",
  storageId: "6682f5a6002149505e4c",
};
// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);

export const createUser = () => {
  // Register User
  account.create(ID.unique(), "me@example.com", "password", "Jane Doe").then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
};
