"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  account,
  appwriteConfig,
  createNewProject,
  databases,
} from "@/lib/appwriteConfig";
import { Query } from "appwrite";
import { TextGenerateEffect } from "@/app/components/ui/text-generate-effect";
import { useEdgeStore } from "@/lib/edgestore";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/app/components/ui/animated-modal";
import { Label } from "@/app/components/ui/label";

const AdminPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);

  // States for form inputs
  const [imageFile, setImageFile] = useState<File>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deploy, setDeploy] = useState("");
  const [details, setDetails] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [contributors, setContributors] = useState("");

  const { edgestore } = useEdgeStore();

  // Check admin access
  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const currentUser = await account.get();
        const response = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.userCollectionId,
          [Query.equal("userId", currentUser.$id)]
        );
        const userDoc = response.documents[0];
        if (!userDoc || userDoc.role !== "ROLE_ADMIN") {
          router.push("/");
          return;
        }
        setUser(userDoc);
      } catch (error) {
        console.error(
          "No active session or error in checking user access:",
          error
        );
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    checkAdminAccess();
  }, [router]);

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.projectCollectionId
      );
      setProjects(response.documents);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle image upload
  const handleImageUpload = async () => {
    if (imageFile) {
      const res = await edgestore.publicFiles.upload({
        file: imageFile,
        onProgressChange: (progress) => console.log(progress),
      });
      setImageUrl(res.url);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(imageUrl);

    try {
      const newProject = {
        title: title,
        description: description,
        image: imageUrl,
        details: details,
        deploy: deploy,
        contributors: contributors,
      };
      console.log("New project data:", newProject);
      await createNewProject(newProject);

      fetchProjects(); // Refresh the project list

      // Clear form inputs
      setTitle("");
      setDescription("");
      setDeploy("");
      setDetails("");
      setContributors("");
      setImageFile(undefined);
      setImageUrl("");
      alert("Project added successfully!");
    } catch (error) {
      console.error("Error adding project:", error);
      alert("An error occurred while adding the project.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="relative justify-center items-center">
      <div className="fixed h-screen w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      <div className="relative z-10">
        {user?.username === "alexvieru" && (
          <div className="flex justify-center items-center">
            <TextGenerateEffect
              className="text-4xl font-bold"
              words="Welcome, Alex!"
            />
          </div>
        )}

        <div className="mt-10 flex flex-col items-center">
          {projects.length > 0 ? (
            <ul className="space-y-4">
              {projects.map((project) => (
                <li
                  key={project.$id}
                  className="border border-gray-300 p-4 rounded-lg shadow-sm dark:border-gray-600 dark:bg-gray-700"
                >
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {project.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {project.description}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-300">No projects yet</p>
          )}
        </div>

        <div className="mt-10 flex justify-center items-center">
          <Modal>
            <ModalTrigger>
              <div className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
                Add Project
              </div>
            </ModalTrigger>
            <ModalBody>
              <ModalContent>
                <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                  Complete the fields
                </h4>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4 w-full mx-auto"
                >
                  {/* Image Upload */}
                  <div className="w-full flex justify-between">
                    <div>
                      <Label htmlFor="imageUpload">Image</Label>
                      <input
                        id="imageUpload"
                        type="file"
                        onChange={(e) => setImageFile(e.target.files?.[0])}
                        className="block mt-1 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-neutral-200 dark:file:bg-neutral-700"
                      />
                    </div>
                    <div className="flex justify-end items-end">
                      <button
                        onClick={handleImageUpload}
                        className="h-10 w-30 px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500"
                      >
                        Upload
                      </button>
                    </div>
                  </div>

                  {/* Title Input */}
                  <div className="w-full">
                    <Label htmlFor="title">Title</Label>
                    <input
                      id="title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Project Title"
                      className="mt-1 block p-2 w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-neutral-900 dark:text-white sm:text-sm"
                      required
                    />
                  </div>

                  {/* Description Input */}
                  <div className="w-full">
                    <Label htmlFor="description">Description</Label>
                    <input
                      id="description"
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Brief project description"
                      className="mt-1 block p-2 w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-neutral-900 dark:text-white sm:text-sm"
                      required
                    />
                  </div>

                  {/* Deploy URL */}
                  <div className="w-full">
                    <Label htmlFor="deploy">Deploy URL</Label>
                    <input
                      id="deploy"
                      type="text"
                      value={deploy}
                      onChange={(e) => setDeploy(e.target.value)}
                      placeholder="https://project-live-url.com"
                      className="mt-1 block p-2 w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-neutral-900 dark:text-white sm:text-sm"
                    />
                  </div>

                  {/* Contributors */}
                  <div className="w-full">
                    <Label htmlFor="contributors">Contributors</Label>
                    <input
                      id="contributors"
                      type="text"
                      value={contributors}
                      onChange={(e) => setContributors(e.target.value)}
                      placeholder="Tyler Durden"
                      className="mt-1 block p-2 w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-neutral-900 dark:text-white sm:text-sm"
                    />
                  </div>

                  {/* Details Textarea */}
                  <div className="w-full">
                    <Label htmlFor="details">Details</Label>
                    <textarea
                      id="details"
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Provide detailed information about the project"
                      rows={5}
                      className="mt-1 block p-2 w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-neutral-900 dark:text-white sm:text-sm"
                      required
                    />
                  </div>

                  <ModalFooter className="w-full">
                    <button type="submit" className="p-[3px] relative w-full">
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                      <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                        Add to DB
                      </div>
                    </button>
                  </ModalFooter>
                </form>
              </ModalContent>
            </ModalBody>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
