import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import loginBackground from '../assets/Screenshot 2024-05-19 at 2.50.08 AM.png';
// import './index.css';

const SignUp = ({ setToken }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password) {
      alert("All fields are required");
      return false;
    }

    if (!formData.email.includes('@')) {
      alert("Please enter a valid email address");
      return false;
    }

    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_]).{6,}$/;
    // if (!passwordRegex.test(formData.password)) {
    //   alert("Password must be at least 6 characters long and include lowercase, uppercase, and special characters");
    //   return false;
    // }

    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            projectID: "f104bi07c490",
            accept: "application/json"
          },
          body: JSON.stringify({
            ...formData,
            appType: "music"
          })
        }
      );

      const data = await response.json();

      if (data.status === "fail") {
        alert(data.message || "Email already exists");
      } else {
        setToken(data.token);
        navigate("/signin");
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signinPage">
      {/* <div className="imageOfLoginPage">
        <img 
          className="imgJ" 
          src={loginBackground} 
          alt="Login Background" 
        />
      </div> */}
      
      <div className="contentOfsigninpage">
        <h1>Sign Up</h1>
        <p>Get a personalized experience and access all your music</p>

        <form onSubmit={handleSubmit}>
          <div className="inputField">
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <small className="password-hint">
              Password must be at least 6 characters with lowercase, uppercase, and special characters
            </small>
          </div>

          <div className="login">
            <button 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>

          <div className="dontHaveAccount">
            <p>
              Already have an account?{" "}
              <span onClick={() => navigate("/signin")}>Log In</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;