// appwriteConfig.ts
import { Client, Account, Databases } from "appwrite";

export const appwriteConfig = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DB_ID as string,
  userCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USERS_ID as string,
  projectCollectionId: process.env.NEXT_PUBLIC_APPWRITE_PROJECTS_ID as string,
};

const client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

const account = new Account(client);
const databases = new Databases(client);


export const createUser = async (
  username: string,
  password: string,
  role: string
) => {
  try {
    // Generate a dummy email using the username
    const email = `${username}@appwrite.local`;

    // Step 1: Create the user with the generated email
    const user = await account.create("unique()", email, password);
    console.log("User created successfully:", user);

    // Step 2: Add user details to your collection (username and role)
    const userId = user.$id;
    const userDocument = await databases.createDocument(
      appwriteConfig.databaseId, // replace with your database ID
      appwriteConfig.userCollectionId, // replace with your user collection ID
      userId, // use the userId as the document ID
      {
        userId: userId,
        username: username,
        role: role,
      }
    );

    console.log("User data added to collection:", userDocument);
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

export const signInUser = async (username: string, password: string) => {
  try {
    const email = `${username}@appwrite.local`;
    const session = await account.createEmailPasswordSession(email, password);
    console.log("Session created:", session);
    return session;
  } catch (error) {
    console.error("Error during sign-in:", error);
    throw new Error("Unable to sign in");
  }
};

export const checkCurrentSession = async () => {
  try {
    const session = await account.get();
    console.log("Active session:", session);
    return session;
  } catch (error: any) {
    if (error.code === 401) {
      // 401 means unauthorized or no session
      console.log("No active session:", error);
      return null;
    } else {
      console.error("Unexpected error while checking session:", error);
      throw error;
    }
  }
};

export const deleteCurrentSession = async () => {
  try {
    await account.deleteSession("current");
    console.log("Session deleted");
  } catch (error) {
    console.error("Error deleting session:", error);
  }
};

export const getAllProjects = async () => {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.projectCollectionId
    );
    console.log("Projects retrieved successfully:", response.documents);
    return response.documents; // Returns an array of projects
  } catch (error) {
    console.error("Error retrieving projects:", error);
    throw error;
  }
};

export const createNewProject = async ({
  title,
  description,
  image,
  details,
  deploy,
  contributors
}: {
  title: string;
  description: string;
  image: string;
  details: string;
  deploy: string;
  contributors: string;
}) => {
  try {
    // Create a new document in the projects collection
    const response = await databases.createDocument(
      appwriteConfig.databaseId, // Your Database ID
      appwriteConfig.projectCollectionId, // Your Project Collection ID
      "unique()", // Let Appwrite generate a unique ID for this project
      {
        title,
        description,
        image,
        details,
        deploy,
        contributors,
      }
    );

    console.log("Project created successfully:", response);
    return response;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error; // rethrow the error to handle it on the calling side
  }
};

export { client, account, databases };
