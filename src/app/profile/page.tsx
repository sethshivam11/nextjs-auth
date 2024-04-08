"use client";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = React.useState("nothing");

  const getUserDetails = async () => {
    try {
      const res = await axios.post("/api/users/me");
      console.log(res.data);
      setUser(res.data.data._id);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logut");
      toast.success("Logout success");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-2">
      <h1 className="text-2xl my-2">Profile page</h1>
      <hr />
      <h2>
        {user === "nothing" ? (
          "Nothing"
        ) : (
          <Link className="p-2 bg-orange-500 text-black rounded my-6" href={`/profile/${user}`}>{user}</Link>
        )}
      </h2>
      <hr />
      <button onClick={getUserDetails} className="bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Get User Details
      </button>
      <button onClick={logout} className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Logout
      </button>
    </div>
  );
}

export default ProfilePage;
