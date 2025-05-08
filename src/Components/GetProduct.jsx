import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import SectionOne from "./SectionOne";
import Carousel from "./Carousel";
import SectionTwo from "./SectionTwo";
import Footer from "./Footer";

const GetProduct = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [searchItem, setsearchItem] = useState(""); 

  const navigate = useNavigate();
  const img_url = "https://ntinyari.pythonanywhere.com/static/images/";

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading("Please wait...");
        setError("");

        const response = await axios.get("https://ntinyari.pythonanywhere.com/api/getproducts");
        setProducts(response.data);
        setLoading("");
      } catch (error) {
        setLoading("");
        setError(error.message);
      }
    };

    getProducts();
  }, []);

  const loadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  //  Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.product_name.toLowerCase().includes(searchItem.toLowerCase())
  );

  return (
    <div className="row">
      <Navbar />
      <Carousel />
      <SectionOne />
      <SectionTwo />

      <div className="text-center mt-4">
        <input
          type="text"
          className="form-control w-50 mx-auto"
          placeholder="Search by product name"
          value={searchItem}
          onChange={(e) => setsearchItem(e.target.value)}
        />
      </div>

      <b className="text-warning text-center">{loading}</b>
      <b className="text-danger text-center">{error}</b>

      {filteredProducts.slice(0, visibleCount).map((product) => (
        <div className="col-md-3 justify-content-center mt-4" key={product.id}>
          <div className="card shadow card-margin p-3 ">
            <img
              src={img_url + product.product_photo}
              alt={product.product_name}
              className="product_img card-img-top "
            />
            <div className="card-body ">
              <b className="text-warning">{product.availability}</b>
              <h6 className="card-title mt-2">{product.product_name}</h6>
              <b className="text-dark text-price">{product.product_cost} KSH</b>
              <br />
              <button
                className="btn btn-info mt-2 w-50"
                onClick={() => navigate("/singleproduct", { state: { product } })}
              >
                Borrow
              </button>
            </div>
          </div>
        </div>
      ))}

      {visibleCount < filteredProducts.length && (
        <div className="text-center mt-4">
          <button className="btn btn-primary" onClick={loadMore}>
            Load More
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default GetProduct;
