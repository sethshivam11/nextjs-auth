import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-2">
      <h1 className="text-3xl my-4">

      Homepage
      </h1>
      <Link href="/login" className="underline hover:no-underline">
        Login
      </Link>
      <Link href="/signup" className="underline hover:no-underline">
        Signup
      </Link>
    </main>
  );
}
