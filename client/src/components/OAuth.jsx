import { account } from "../appwrite";

export default function OAuth() {
  const handleGoogleClick = async () => {
    try {
      await account.createOAuth2Session(
        "google",
        "http://localhost:5173/oauth-success",
        "http://localhost:5173/sign-in"
      );
    } catch (error) {
      console.log("Could not sign in with Google", error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
    >
      Continue with Google
    </button>
  );
}