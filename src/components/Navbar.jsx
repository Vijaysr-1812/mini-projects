import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4">
      <Link to="/" className="text-lg font-bold">Home</Link>

      <div className="flex space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/services" className="hover:underline">Services</Link> {/* ✅ Go to AI page */}
      </div>
    </nav>
  );
}

export default Navbar;
