import axios from "axios";
import {  useEffect, useState ,} from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Conversations = () => {

    let[messages,setMessages] = useState([]);
    let[newMessage,setNewmessage] = useState("");//
    let[error,setError] = useState("");
    let[loading,setLoading] = useState("");
    // let[success,setSuccess] = useState("");
    const storedUserId = localStorage.getItem("user_id");
    const sender_id = storedUserId ? parseInt(storedUserId) : null; // Parse the stored user ID as an integer
    const{reciever_id} = useLocation().state || {};
    

    console.log("Stored user_id from localStorage:", storedUserId);
    console.log("Parsed sender_id:", sender_id);
    console.log("Received reciever_id from navigation:", reciever_id);

    // if (!sender_id || !reciever_id) {
    //     console.error("Sender or Receiver ID is missing! Redirecting...");
    //     navigate("/products"); // or login page
    //     return null;
    // }

    //get conversations between sender and reciever
    const getMessages = async()=>{
        setLoading("loading messages...")
        setError("")
        try {
            const response = await axios.get(`https://ntinyari.pythonanywhere.com/api/conversations/${sender_id}/${reciever_id}`)
           console.log("getting messages",response.data)
            setMessages(response.data)
            setLoading("")
        } catch (error) {
            
            setError("error fetching messages")
        }
    }
    //fetches messages when the reciever_id changes
    useEffect(()=>{
        if(reciever_id && sender_id){
            getMessages()
        }
    },[reciever_id,sender_id]);
    console.log("Receiver ID:", reciever_id);
    console.log("Sender_id: ",sender_id);  // Log this to check if reciever_id is correctly set


// sending a message
const sendMessage =async(e)=>{
    e.preventDefault();
    
     if(!newMessage) return;
    try {
        const response = await axios.post("https://ntinyari.pythonanywhere.com/api/sendmessage",
            {
              sender_id,
              reciever_id,
              message_content: newMessage,  
            }
        )
        const newMsg = {
          sender_id: response.data.sender_id,
          reciever_id: response.data.reciever_id,
          message_content: response.data.message_content,
          timestamp: response.data.timestamp
      };
        // Append the new message to the messages state
      setMessages((prevMessages) => [
        ...prevMessages,
        newMsg // Assuming response.data.message is the newly sent message
      ]);
        setNewmessage("")
        console.log(response.data)
        console.log("getting messages", response.data)

    } catch (error) {

     setError(error.message)   
    }


}

    const navigate = useNavigate();
    
    return ( 
        <div className="container mt-4">
          <h5><span><img src="/images/chatting.webp" className="chat-image"></img></span>
          Chat with lender</h5>
      {loading && <p>Loading messages...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="card p-3 mb-3" style={{ height: "400px", overflowY: "auto" }}>
        {/* Loop through messages and display each one */}
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              backgroundColor: msg.sender_id === sender_id ? "#007bff" : "#6c757d",
              color: "white",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "10px",
              maxWidth: "70%",
              alignSelf: msg.sender_id === sender_id ? "flex-end" : "flex-start",
            }}
          >
            <div>{msg.message_content}</div>
            {/* Display timestamp below each message */}
            <div style={{ fontSize: "12px", marginTop: "5px", color: "#d1d1d1" }}>
              Message sent: {new Date(msg.timestamp).toLocaleString()} 
             </div>
          </div>
        ))}
      </div>

      {/* Input form to send new message */}
      <form onSubmit={sendMessage} className="align-items-center">
        <textarea
          className="form-control "
          rows="2"
          value={newMessage}
          onChange={(e) =>setNewmessage(e.target.value)}
          placeholder="Type a message"
        ></textarea>
        <button type="submit" className="btn btn-primary mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
             <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
            </svg>
        </button>
      </form>
    </div>
     );
}
 
export default Conversations;