import AddStudent from "@/components/AddStudent";

export default function AddStudentPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 my-6">
        Add a New Student
      </h1>
      <AddStudent />
    </div>
  );
}
