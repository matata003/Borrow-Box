import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Inbox = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const user_id = user?.user_id;

      if (!user || !user_id) {
        setError("User not logged in or missing ID.");
        return;
      }

      try {
        setLoading("Loading messages...");
        setError("");

        const response = await axios(
          `https://ntinyari.pythonanywhere.com/api/inbox/${user_id}`
        );

        setMessages(response.data);
        console.log("Fetched messages:", response.data);
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Failed to load messages.");
      
        setLoading("");
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="container mt-5">
      <h3><span><img src="/images/inbox.png" className="inbox-image"></img></span>Inbox</h3>

      {loading && (
        <div className="d-flex align-items-center mb-3">
          <div className="spinner-border text-primary me-2" role="status"></div>
          <span>Loading messages...</span>
        </div>
      )}

      {error && <p className="text-danger">{error}</p>}

      <div className="card p- mb-3 inbox-scroll">
        {messages.length === 0 && !loading ? (
          <p>You have no messages.</p>
        ) : (
          messages.map((message,index) => (
            <div key = {message.message_id || index}
             className="inbox-message" style={{border: "1px solid #ccc", padding: "10px", marginBottom: "10px"}}>
              <p>
                <strong>From:</strong> {message.sender_username || "Unknown"}
              </p>
              <p>{message.message_content}</p>

              <div className="inbox-timestamp">
                Message received:{" "}
                {new Date(message.timestamp).toLocaleString()}
              </div>

              <button
                className="btn btn-success mt-2"
                onClick={() =>
                  navigate(`/conversations`,{
                    state: { reciever_id: message.sender_id }})
                }
              >
                Reply
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Inbox;
