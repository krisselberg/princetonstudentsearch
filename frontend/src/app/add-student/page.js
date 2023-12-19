import AddStudent from "@/app/add-student/AddStudent";
import Link from "next/link";

export default function AddStudentPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <img
        className="w-32 mb-4"
        src="/images/ptonlogo.png"
        alt="Princeton Logo"
      />
      <h1 className="text-3xl font-bold text-gray-800 mt-6 mb-4">
        Add a New Student
      </h1>
      <Link
        href="/"
        className="mt-4 mb-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Back to Search
      </Link>
      <AddStudent />
    </div>
  );
}
