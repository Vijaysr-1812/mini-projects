import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";
function Navbar() {
  return (
    <nav className="flex justify-between items-center p-6 bg-green-100 shadow-lg border-b border-green-200">
      <div className="flex items-center flex space-x-2">
      <Leaf className="w-10 h-10 text-green-800" />
      <Link to="/" className="text-xl font-bold text-green-800">SUSTAINABLE E-WASTE MANAGEMENT</Link>
      </div>
      

      <div className="flex space-x-4">
        <Link to="/" className="text-green-700 font-medium hover:text-green-900 transition-colors">Home</Link>
        <Link to="/services" className="text-green-700 font-medium hover:text-green-900 transition-colors">Carbon Footprint Calculator</Link> 
        <Link to="/service" className="text-green-700 font-medium hover:text-green-900 transition-colors">Services</Link>
      </div>
    </nav>
  );
}

export default Navbar;
