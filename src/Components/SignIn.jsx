import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
    let[user_id, setUser_id] = useState("");
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [loading, setLoading] = useState("");
    let [error, setError] = useState("");

    const navigate = useNavigate();

    const SubmitForm = async (e) => {
        e.preventDefault();

        try {
            setError("");
            setLoading("Please wait...");

            const data = new FormData();
            data.append("user_id",user_id)
            data.append("username", username);
            data.append("password", password);

            // Sending the login request to the backend
            const response = await axios.post("https://ntinyari.pythonanywhere.com/api/signin", data);
            console.log("API Response:", response.data);

            if (response.data.user) {
            
                console.log("User data received:", response.data.user);

                // Store user data and user_id in localStorage
                const userId = response.data.user.user_id;  
                if (userId) {
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                    localStorage.setItem("user_id", userId);
                    console.log("user_id saved to localStorage:", userId);

                    // Redirect the user to home page after successful login
                    navigate("/");
                } else {
                    setLoading("");
                    setError("User ID is missing in the response.");
                }
            } else {
                setLoading("");
                setError(response.data.message );
            }
        } catch (error) {
            setLoading("");
            setError(error.message);
        }
    };

    return (
        <div className="row justify-content-center mt-4">
            <div className="col-md-6 card shadow p-2">
                <h2 className="text-center text-info">Sign In</h2>
                <b className="text-warning">{loading}</b>
                <b className="text-danger">{error}</b>

                <form onSubmit={SubmitForm} className="signin-container">
                <input
                        type="number"
                        className="form-control"
                        placeholder="Enter your user_id"
                        onChange={(e) => setUser_id(e.target.value)}
                        required
                    />
                    <br />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />{" "}
                    <br />

                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <br />

                    <button type="submit" className="btn btn-info">
                        Sign In
                    </button>
                    <br />

                    <p>
                        Don't have an account?
                        <Link to="/SignUp">Sign up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
