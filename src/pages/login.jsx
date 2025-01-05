import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import loginBackground from '../assets/Screenshot 2024-05-19 at 2.50.08 AM.png';
// import './index.css';

const SignIn = ({ setIsLogin, setToken }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      alert("Please fill in all fields");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            projectID: "f104bi07c490",
            accept: "application/json",
          },
          body: JSON.stringify({
            ...formData,
            appType: "music"
          }),
        }
      );

      const data = await response.json();

      if (data.status === "fail") {
        alert(data.message || "Invalid email or password");
      } else {
        setIsLogin(true);
        setToken(data.token);
        navigate("/");
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="loginPage">
      {/* <div className="imageOfLoginPage">
        <img 
          className="imgJ" 
          src={loginBackground} 
          alt="Login Background"
        />
      </div> */}
      <div className="contentOfLoginPage">
        <h1>Log In</h1>
        <p>Welcome back! Log in to access your account</p>

        <form onSubmit={handleSignIn}>
          <div className="inputField">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter Your Password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="login">
            <button 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Log In"}
            </button>
          </div>

          <div className="dontHaveAccount">
            <p>
              Don't have an account?{" "}
              <span onClick={() => navigate("/signup")}>Sign Up</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;