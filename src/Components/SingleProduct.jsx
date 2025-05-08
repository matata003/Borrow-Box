import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SingleProduct = () => {
    
  const { product } = useLocation().state || {};

  let [user, setUser] = useState(null);
  let [phone, setPhone] = useState("");
  let [loading, setLoading] = useState("");
  let [success, setSuccess] = useState("");
  let [error, setError] = useState("");

  const navigate = useNavigate();

  

  const img_url = "https://ntinyari.pythonanywhere.com/static/images/";

  // Fetch the user details from backend using user_id in the product
  useEffect(() => {
    const fetchUser = async () => {
      if (product && product.user_id) {
        try {
          const res = await axios.get(  `https://ntinyari.pythonanywhere.com/api/users/${product.user_id}` );
          setUser(res.data); // after fetching data,youu store it in the user. 
        } catch (error) {
          console.error("User fetch error:", error);
        }
      }
    };

    fetchUser();
  }, [product]); //run the effect only when the product changes

  const handleSendMessage = () =>{
    navigate("/conversations", { state: { reciever_id: product.user_id } });
  }

  const Submit = async (e) => {
    e.preventDefault();
    try {
      setLoading("Please wait as we submit your data...");
      setError("");
      setSuccess("");

      const data = new FormData();
      data.append("amount", product.product_cost);
      data.append("phone", phone);

      const response = await axios.post("https://ntinyari.pythonanywhere.com/api/mpesa_payment", data);
      setSuccess(response.data.message);
      setLoading("");
    } catch (error) {
      setLoading("");
      setError(error.message);
    }
  };

  // if (!product) return <p>No product selected.</p>;

  return (
    <div className="row mt-4 ">
      {/* Product Info */}
      <div className="col-md-4 card shadow p-2 m-2 ">
        <h2>{product.product_name}</h2>
        <img src={img_url + product.product_photo} className="img-fluid" alt="Product" />
        <p className="text-muted">{product.product_desc}</p>
       

      </div>

      {/* User Info */}
      
          <div className="col-md-3  card shadow m-4  " id="lender-card">
            <h4 className="text-primary">Lender Details</h4>
            {user ? (
              <>
                <p><strong>Name:</strong> {user.username}</p>
                <p><strong>Location:</strong> {user.location}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <button className="btn btn-primary" onClick={handleSendMessage}>Send Message</button>
                {/* <button className="btn btn-primary" onClick={() => navigate("/conversations")}>Send Message</button> */}
              </>
            ) : (
            <p className=" spinner-border"></p>
            
            )}
          </div>
      

      {/* Payment Form */}

      <div className="col-md-3 card shadow m-4">
      <h4 className ="text-primary">Payment form</h4>

        <form onSubmit={Submit}>
          <input
            type="number"
            value={product.product_cost}
            className="form-control"
            readOnly
          />
          <br />
          <input
            type="tel"
            placeholder="Enter Mpesa 2547xxxxxxxx"
            className="form-control"
            required
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <button className="btn btn-primary">Submit</button>
          <p className="text-success">{success}</p>
          <p className="text-warning">{loading}</p>
          <p className="text-danger">{error}</p>
        </form>
      </div>
    </div>
  );
};

export default SingleProduct;
