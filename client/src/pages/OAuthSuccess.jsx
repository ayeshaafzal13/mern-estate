import { useEffect } from "react";
import { account } from "../appwrite";
import { useDispatch } from "react-redux";
import { signInSuccess, signInFailure } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuthSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthSuccess = async () => {
      try {
        // Get logged-in user from Appwrite
        const result = await account.get();

        // Send user information to our backend
        const res = await fetch("/api/auth/google", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: result.name,
            email: result.email,
            photo: result.prefs?.photoUrl || "",
          }),
        });

        const data = await res.json();

        if (data.success === false) {
          dispatch(signInFailure(data.message));
          navigate("/sign-in");
          return;
        }

        // Save user in Redux
        dispatch(signInSuccess(data));

        // Go to home page
        navigate("/");
      } catch (error) {
        console.log("Google authentication error:", error);
        dispatch(signInFailure(error.message));
        navigate("/sign-in");
      }
    };

    handleOAuthSuccess();
  }, [dispatch, navigate]);

  return (
    <div className="p-3 max-w-lg mx-auto text-center">
      <h1 className="text-2xl font-semibold my-7">
        Signing you in...
      </h1>
    </div>
  );
}