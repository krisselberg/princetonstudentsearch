import Search from "@/app/search/Search";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 my-6">
        Princeton Student Search
      </h1>
      <Search />
      <Link
        href="/add-student"
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Add Student
      </Link>
    </div>
  );
}
