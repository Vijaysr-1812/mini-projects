import { Link, useNavigate } from "react-router-dom";
import { Leaf } from "lucide-react";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user has logged in by verifying token in localStorage
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove stored authentication token
    setIsAuthenticated(false);
    navigate("/login"); // Redirect user to login page after logout
  };

  return (
    <nav className="flex justify-between items-center p-6 bg-green-100 shadow-lg border-b border-green-200">
      <div className="items-center flex space-x-2">
        <Leaf className="w-10 h-10 text-green-800" />
        <Link to="/" className="text-xl font-bold text-green-800">SUSTAINABLE E-WASTE MANAGEMENT</Link>
      </div>

      <div className="flex space-x-4">
        <Link to="/" className="text-green-700 font-medium hover:text-green-900 transition-colors">Home</Link>
        <Link to="/service" className="text-green-700 font-medium hover:text-green-900 transition-colors">Services</Link>
        
        {isAuthenticated ? (
          <button 
            onClick={handleLogout} 
            className="text-red-700 font-medium hover:text-red-900 transition-colors">
            Logout
          </button>
        ) : (
          <Link to="/signup" className="text-green-700 font-medium hover:text-green-900 transition-colors">
            Signup
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
