import Search from "@/app/Search";
import Link from "next/link";

export default function Home() {
  return (
    <div className="page-container">
      <img
        className="w-32 my-4"
        src="/images/ptonlogo.png"
        alt="Princeton Logo"
      />
      <h1 className="header mb-6">Princeton Student Search</h1>
      <Search />
      <Link href="/add-student" className="mt-2 button">
        Add Student
      </Link>
    </div>
  );
}
