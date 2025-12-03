import { useState } from "react";
import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";
import Testimonails from "./components/Testimonails";
import Contact from "./components/Contact";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import {} from "framer-motion/client";

function App() {
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleSignup = () => {
    setShowSignup(!showSignup);
  };

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setShowSignup(true); // Show login form after registration
    toast.success("Registered successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
    window.scrollTo({ top: 0, behavior: "smooth" }); // Redirect to home
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowSignup(false); // Close modal after login

    toast.success("Logged in successfully!", {
      position: "top-right",
      autoClose: 1000,
    });
    window.scrollTo({ top: 0, behavior: "smooth" }); // Redirect to home
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast.info("Logged out successfully!", {
      position: "top-right",
      autoClose: 1000,
    });
    toggleSignup();
  };

  return (
    <div className="w-full overflow-hidden">
      <ToastContainer />
      <Header
        toggleSignup={toggleSignup}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        // This fixes everything!
      />
      {showSignup && (
        <Signup
          toggleSignup={toggleSignup}
          onAuthSuccess={handleAuthSuccess}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      <About />
      <Projects />
      <Testimonails />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
