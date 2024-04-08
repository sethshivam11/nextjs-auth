"use client";
import React from "react";

function page({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-2">
      <h1 className="text-2xl">Profile page</h1>
      <h2 className="p-3 bg-green-500 text-black rounded my-4">{params.id}</h2>
    </div>
  );
}

export default page;
