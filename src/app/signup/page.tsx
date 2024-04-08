"use client";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed");
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl my-4 text-center">
        {loading ? "Processing" : "Signup"}
      </h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        value={user.username}
        placeholder="Enter username"
        className="p-2 outline-none rounded my-2 text-black"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        id="email"
        value={user.email}
        placeholder="Enter email"
        className="p-2 outline-none rounded my-2 text-black"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={user.password}
        placeholder="Enter password"
        className="p-2 outline-none rounded my-2 text-black"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
        onClick={onSignup}
        disabled={
          user.email.length < 4 ||
          user.username.length < 2 ||
          user.password.length < 6 ||
          loading
        }
        className="p-2 my-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {loading ? "Loading" : "Sign up"}
      </button>
      <Link className="underline hover:no-underline" href="/login">
        Visit login
      </Link>
    </div>
  );
}
