import { Link, useNavigate } from "react-router-dom";
import Profile from "./Profile";

const Navbar = () => {
  const navigate = useNavigate();

  // Get user info from localStorage parse(convert string to object)
  const user = JSON.parse(localStorage.getItem("user"));

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

  // Define which links to show for navigation
  let navLinks;


  if (user) {
    
    navLinks = (
        //react fragment - group multiple elements without adding extra tags
      <> 
      
        <span className="me-2 fw-bold text-dark">Hi, {user.username} </span> {" "}
        <Profile/>  {" "}
        <Link to="/inbox" className="btn btn-outline-dark me-2">Inbox</Link>
        <Link to="/addproduct" className="btn btn-outline-dark me-2">Add Product</Link>
        <button onClick={logout} className="btn btn-outline-danger">Logout</button>
        
        
      </>
    );
  } else {
    
    navLinks = (
      <>
        
        <Link to="/signin" className="btn btn-outline-dark me-2">Sign In</Link>
        <Link to="/signup" className="btn btn-outline-dark">Sign Up</Link>
        
      </>
      
    );
  }

  return (
    <nav className="navbar  p-2 style-navbar">
      <div className="container-fluid d-flex justify-content-between">
        <a className="navbar-brand text-dark fw-bold" href="">
          <img src="images/icon.jpg" width="40" height="40" alt="logo" className="me-2" />
          Borrow Box
        </a>

       

        
        <div className="d-flex align-items-center">{navLinks}

             {/* profile offcanvas */}
      

          
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
