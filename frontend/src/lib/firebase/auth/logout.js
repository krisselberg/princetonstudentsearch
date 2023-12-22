import { getAuth, signOut } from "firebase/auth";

export default async function logout() {
  const auth = getAuth();
  try {
    await signOut(auth);
    // Optionally handle post-logout logic here (e.g., redirecting to a login page)
  } catch (error) {
    console.error("Error signing out:", error);
  }
}
