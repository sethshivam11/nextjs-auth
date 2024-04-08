"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";

function VerifyEmailPage() {
  const [token, setToken] = React.useState("");
  const [verified, setVerified] = React.useState(false);
  const [error, setError] = React.useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.message);
    }
  };

  React.useEffect(() => {
    setError(false);
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");

    // const { query } = router;
    // const urlToken = query.token;
  }, []);

  React.useEffect(() => {
    setError(false);
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-2">
      <h1 className="text-2xl my-4">Verify Email</h1>
      <h2 className="p-2 my-2 bg-orange-500 text-black">
        {token ? token : "No token"}
      </h2>
      {verified && (
        <div>
          <h2 className="p-2 bg-green-500 text-black">Verified</h2>
          <Link href="/login" className="underline hover:no-underline">
            Login
          </Link>
        </div>
      )}
      {error && <h2 className="p-2 bg-red-500 text-black">Error</h2>}
    </div>
  );
}

export default VerifyEmailPage;
