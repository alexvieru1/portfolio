"use client";

import { IconMail } from "@tabler/icons-react";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { MultiStepLoader as Loader } from "./ui/multi-step-loader";
import { useState } from "react";

export default function Contact() {
  const placeholders = [
    "Can Neo escape the Matrix?",
    "Who is Tyler Durden?",
    "How do I center a div (for real)?",
    "What’s the best programming language?",
    "Who shot first: Han or Greedo?",
  ];

  const loadingStates = [
    { text: "Following the white rabbit" },
    { text: "Meeting Morpheus" },
    { text: "Taking the red pill" },
    { text: "Dodging bullets" },
    { text: "Learning kung fu" },
    { text: "Escaping the agents" },
    { text: "Entering the Matrix" },
  ];

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Delay of 500ms, then start the loading process
    setTimeout(() => {
      // Start the loading animation
      setLoading(true);

      // Wait for the loader to complete, then open WhatsApp and reset states
      setTimeout(() => {
        const whatsappUrl = `https://wa.me/40733139412?text=${encodeURIComponent(
          message
        )}`;
        window.location.href = whatsappUrl;

        // Reset loader and message after opening the new window
        setLoading(false);
        setMessage("");
      }, loadingStates.length * 850); // Adjust this to match the loader duration
    }, 500); // 500ms delay
  };

  const mailTo = () => {
    window.location.href = "mailto:contact@alex-vieru.dev";
  };

  return (
    <div
      id="contact"
      className="flex flex-col items-center justify-center bg-transparent px-4 mt-52 lg:my-40"
    >
      <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
        If you’re thinking it, I’m ready to answer!
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />

      {/* Loader */}
      <Loader
        loadingStates={loadingStates}
        loading={loading}
        duration={850}
        loop={false}
      />

      <p className="mt-10 sm:mt-20 text-xl text-center sm:text-2xl dark:text-white text-black">
        or if you need more time
      </p>
      <div className="mt-5 sm:mt-10 mb-36 sm:mb-36">
        <button
          onClick={mailTo}
          className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <IconMail /> <p className="ml-2 font-light">Send an email</p>
        </button>
      </div>
    </div>
  );
}
