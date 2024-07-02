import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
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
const avatars = new Avatars(client);
const database = new Databases(client);

export const createUser = async (email, password, username) => {
  //   try {
  //     // Check if a session already exists
  //     const sessions = await account.getSession();
  //     if (sessions.total > 0) {
  //       // If there are active sessions, delete them
  //       await Promise.all(
  //         sessions.sessions.map((session) => account.deleteSession(session.$id))
  //       );
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     throw new error(error);
  //   }

  try {
    const newAcount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAcount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await database.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        acountId: newAcount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    console.log(error);
    throw new error(error);
  }
};

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
}
