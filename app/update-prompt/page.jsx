"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setIsSubmitting] = useState(false);
  const [searchParams, setSearchParams] = useState(null);

  useEffect(() => {
    const getSearchParams = async () => {
      const params = new URLSearchParams(window.location.search);
      setSearchParams(params);
    };
    getSearchParams();
  }, []);

  useEffect(() => {
    const promptId = searchParams?.get("id");
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost({ prompt: data.prompt, tag: data.tag });
    };
    if (promptId) getPromptDetails();
  }, [searchParams]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const promptId = searchParams?.get("id");
    if (!promptId) return alert("Missing PromptId!");
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({ prompt: post.prompt, tag: post.tag }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;