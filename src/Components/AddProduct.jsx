import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const AddProduct = () => {
    //const storedUserId = localStorage.getItem("user_id");

    const [user_id, setUser_id] = useState("");
    const [product_name, setProduct_name] = useState("");
    const [product_desc, setProduct_desc] = useState("");
    const [product_cost, setProduct_cost] = useState("");
    const [product_category, setProduct_category] = useState("");
    const [availability, setAvailability] = useState("");
    const [product_photo, setProduct_photo] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");

    const Submit = async (e) => {
        e.preventDefault();

        try {
            setLoading("Please wait as we submit your data...");
            setSuccess("");
            setError("");

            const data = new FormData();
            data.append("user_id", user_id); // Using stored user ID
            data.append("product_name", product_name);
            data.append("product_desc", product_desc);
            data.append("product_cost", product_cost);
            data.append("product_category", product_category);
            data.append("availability", availability);
            data.append("product_photo", product_photo);

            const response = await axios.post("https://ntinyari.pythonanywhere.com/api/addproduct", data);
            setSuccess("Product added successfully");
            setLoading("");
        } catch (error) {
            setLoading("");
            setError(error.message);
        }
    };

    // // if (!storedUserId) {
    //     return (
    //         <div className="text-center mt-5 card shadow p-4">
    //             <h4 className="text-danger">You must be logged in to add a product.</h4>
    //             <p><Link to="/signin">Click here to login</Link></p>
    //         </div>
    //     );
    // }

    return (
        <div className="row justify-content-center mt-4">
            <div className="col-md-6 card shadow p-4 form-container">
                <h2 className="text-info">Add product</h2>
                <b className="text-success">{success}</b>
                <b className="text-warning">{loading}</b>
                <b className="text-danger">{error}</b>
                <form onSubmit={Submit}>
                <input
                        type="number"
                        className="form-control"
                        placeholder="Enter your id"
                        onChange={(e) => setUser_id(e.target.value)}
                        required
                    /> <br />

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter product name"
                        onChange={(e) => setProduct_name(e.target.value)}
                        required
                    /> <br />

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Product description"
                        onChange={(e) => setProduct_desc(e.target.value)}
                        required
                    /> <br />

                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter product cost"
                        onChange={(e) => setProduct_cost(e.target.value)}
                        required
                    /> <br />

                    <select
                        className="form-control"
                        onChange={(e) => setProduct_category(e.target.value)}
                        required
                    >
                        <option value="">Select product category</option>
                        <option value="Books">Books</option>
                        <option value="Camping Gear">Camping Gear</option>
                        <option value="Cleaning">Cleaning</option>
                        <option value="Cleaning">Clothes</option>
                        <option value="Gaming">Gaming</option>
                        <option value="Tools">Tools</option>
                        <option value="Tools">Appliances</option>
                        <option value="Photography">Photography</option>
                    </select>
                    <br />

                    <select
                        className="form-control"
                        onChange={(e) => setAvailability(e.target.value)}
                        required
                    >
                        <option value="">Select availability</option>
                        <option value="Available now">Available now</option>
                        <option value="Lent out">Lent out</option>
                    </select>
                    <br />

                    <label>Product photo</label>
                    <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setProduct_photo(e.target.files[0])}
                        required
                    /> <br />

                    <button className="btn btn-info">Add product</button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
