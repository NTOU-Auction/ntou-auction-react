"use client"
import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";

const Upload: NextPage = () => {
  // State to store the file
  const [file, setFile] = useState<File | null>(null);

  // State to store the base64
  const [base64, setBase64] = useState<string | null>(null);

  // When the file is selected, set the file state
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    setFile(e.target.files[0]);
  };

  // On click, clear the input value
  const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.value = "";
  };

  // On submit, upload the file
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    // Convert the file to base64
    const base64 = await toBase64(file as File);

    setBase64(base64 as string);
    console.log(base64)
    // You can upload the base64 to your server here
    await fetch("http://localhost:3000", {
      method: "POST",
      body: JSON.stringify({ base64 }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Clear the states after upload
    // setFile(null);
    // setBase64(null);
  };

  return (
    <>
      <h1>Upload Image</h1>
      <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
        <input
          type="file"
          name="avatar"
          accept="image/*"
          onChange={onFileChange}
          onClick={onClick}
        />
        <button type="submit">Upload</button>
      </form>
      {base64 && (
        <Image src={base64} width={300} height={400} alt="Uploaded Image" />
      )}
    </>
  );
};

// Convert a file to base64 string
const toBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export default Upload;