import React from "react";
 

const Footer = () => {
  return (
    <section className=" text-dark pt-5 pb-3 mt-5">
      <div className="container-fluid footer-part">
        <div className="row">

          {/* Logo & About */}
          <div className="col-md-4 text-center mb-4">
            <img
              src="/images/icon.jpg"
              alt="Borrow Box Logo"
              width="80"
              className="mb-2 rounded-circle border"
            />
            <h5 className="fw-bold">Borrow Box</h5>
            <p>Your trusted hub for borrowing & lending with ease.</p>
            <p>Borrow Box is a community-powered platform where people share what they have and borrow what they need — saving money, reducing waste, and building trust through smarter, sustainable living.**</p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 text-center  mb-4">
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <p><a href="/addproduct" className="text-dark text-decoration-none">Add Product</a></p>
            <p><a href="/inbox" className="text-dark text-decoration-none">Inbox</a></p>
            <p><a href="/signup" className="text-dark text-decoration-none">Sign Up</a></p>
            <p><a href="/signin" className="text-dark text-decoration-none">Login</a></p>
          </div>

          {/* Contact & Social */}
          <div className="col-md-4 text-center  mt-4">
            <h5 className="fw-bold mb-3">Contact Us</h5>

            <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                </svg> +254 700 123 456</p>

            <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
                </svg> support@borrowbox.co.ke</p>

            <div className="mt-3">
              <a href="#" className="text-white me-3"><i className="bi bi-facebook fs-5"></i></a>
              <a href="#" className="text-white me-3"><i className="bi bi-instagram fs-5"></i></a>
              <a href="#" className="text-white"><i className="bi bi-twitter-x fs-5"></i></a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="row">
          <div className="col-12 text-center pt-3 border-top border-light">
          <p className="text-muted">© 2025 Borrow Box. All rights reserved.Developed by Tresy matata</p>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
