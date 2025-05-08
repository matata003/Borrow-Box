import axios from "axios";
import { useEffect, useState } from "react";

const Profile = () => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    const user_id = localUser?.user_id;

    const [userData, setUserData] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (!user_id) {
            setError("User not logged in");
            return;
        }

        const getUser = async () => {
            try {
                setLoading(true);
                setError("");
                const response = await axios.get(`https://ntinyari.pythonanywhere.com/api/users/${user_id}`);
                setUserData(response.data);

                const product_response = await axios.get(`https://ntinyari.pythonanywhere.com/api/productsDetails/${user_id}`);
                setProducts(product_response.data);

            } catch (error) {
                setError(error);
                setLoading("");
            }
        };

        getUser();
    }, [user_id]);

    // Function to delete a product
    const deleteProduct = async (product_id) => {
        try {
            const response = await axios.delete(`https://ntinyari.pythonanywhere.com/api/deleteProduct/${product_id}`);
            alert(response.data.message); // Show success message
            // After deletion, remove the deleted product from the state
            setProducts(products.filter(product => product.product_id !== product_id));
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Error deleting product");
        }
    };

    return (
        <div className="" >
            <button className="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#profileOffcanvas">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-lines-fill" viewBox="0 0 16 16">
                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/>
                </svg>
            </button>

            <div className="offcanvas offcanvas-end profile-style" tabIndex="-1" id="profileOffcanvas" aria-labelledby="offcanvasLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title profile-h5" id="offcanvasLabel">Your Profile</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <p className="text-warning">{loading}</p>
                    <p className="text-danger">{error}</p>

                    {/* Display user info */}
                    {userData && (
                        <div>
                            <h5 className="profile-h5 ">You are logged in as {userData.username}</h5>
                            <img src="/images/profile.webp" alt="profile" style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "50%" }} />
                            <div className="mt-3">
                                <p><strong>ID:</strong> {userData.user_id}</p>
                                <p><strong>Name:</strong> {userData.username}</p>
                                <p><strong>Email:</strong> {userData.email}</p>
                                <p><strong>Phone:</strong> {userData.phone}</p>
                                <p><strong>Location:</strong> {userData.location}</p>
                            </div>

                            {/* Display products with delete buttons */}
                            <div className="card ">
                                <h5 className="text-start profile-h5 ">Your Products</h5> <br />
                                <h6>You have {products.length} products</h6>
                                {products.length > 0 ? (
                                    <ul>
                                        {products.map((product) => (
                                            <li key={product.product_id}>
                                               <span> {product.product_name} </span>
                                                <button onClick={() => deleteProduct(product.product_id)} className="btn btn-danger btn-sm rouunded-circle mb-3 ">
                                                    
                                                    Delete
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>You have no products listed</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
