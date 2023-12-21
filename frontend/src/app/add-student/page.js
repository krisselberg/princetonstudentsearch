import AddStudent from "@/app/add-student/AddStudent";
import Link from "next/link";

export default function AddStudentPage() {
  return (
    <div className="page-container">
      <img className="logo" src="/images/ptonlogo.png" alt="Princeton Logo" />
      <h1 className="header mt-4">Add a New Student</h1>
      <Link href="/" className="my-6 button">
        Back to Search
      </Link>
      <AddStudent />
    </div>
  );
}
