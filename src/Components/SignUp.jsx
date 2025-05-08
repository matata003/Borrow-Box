import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading("Please wait...");
      setError("");

      const data = new FormData();
      data.append("username", username);
      data.append("email", email);
      data.append("phone", phone);
      data.append("location", location);
      data.append("password", password);

      const response = await axios.post(
        "https://ntinyari.pythonanywhere.com/api/signup",
        data
      );

      setLoading("");
      alert("Account created! Your user ID is: " + response.data.user_id);
      navigate("/signin");
    } catch (error) {
      setLoading("");
      setError(error.message);
    }
  };

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-6 card shadow p-4">
        <h2 className="text-center text-info">Sign up</h2>
        <b className="text-warning">{loading}</b>
        <b className="text-danger">{error}</b>

        <form onSubmit={submit}>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          /><br />

          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /><br />

          <input
            type="tel"
            className="form-control"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          /><br />

          <input
            type="text"
            className="form-control"
            placeholder="Enter your location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          /><br />

          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /><br />

          <button type="submit" className="btn btn-info w-100">Sign up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
