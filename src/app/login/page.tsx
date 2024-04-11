"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      toast.success("Login success");
      console.log("Signup success", response.data);
      router.push("/profile");
    } catch (error: any) {
      toast.error(error.response.data.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl my-4 text-center">
        {loading ? "Processing" : "Login"}
      </h1>
      <hr />
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
        onClick={onLogin}
        disabled={user.email.length < 4 || user.password.length < 6 || loading}
        className="p-2 my-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {loading ? "Loading" : "Login"}
      </button>
      <Link className="underline hover:no-underline" href="/signup">
        Visit Signup
      </Link>
    </div>
  );
}

export default LoginPage;
