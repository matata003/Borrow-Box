import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";


const SignUp = () => {

    let[username,setUsername] = useState("")
    let[email,setEmail] = useState("")
    let[phone,setPhone] = useState("")
    let[location,setLocation] = useState("")
    let[password,setPassword] = useState("")
    let[success,setSuccess] = useState("")
    let[loading,setLoading] = useState("")
    let[error,setError] = useState("")

    const navigate = useNavigate("")
    const submit = async(e)=>{
        e.preventDefault()

        try {
            setLoading("Please wait as we submit")
            setError("")
            setSuccess("")

            const data = new FormData();
            data.append("username",username)
            data.append("email",email)
            data.append("phone",phone)
            data.append("location",location)
            data.append("password",password)

            const response = await axios.post("https://ntinyari.pythonanywhere.com/api/signup",data)
            //console.log(response)
            setLoading("")
            setSuccess("Account created successfully")
        
            navigate("/signin")

            setUsername("")
            setEmail("")
            setPhone("")
            setLocation("")
            setPassword("")
        


        } catch (error) {
            //console.log(error)
            setLoading("")
            setError(error.message)
            
        }
    }

    
    return (  
        <div className="row justify-content-center mt-4 ">
            <div className="col-md-6 card shadow p-4">
                <h2 className="text-center text-info">Sign up </h2>
                <b className="text-warning">{loading}</b>
                <b className="text-success">{success}</b>
                <b className="text-danger">{error}</b>
                <div className="signup-container">

                    <form onSubmit = {submit}>
                        <input type= "name" className="form-control" placeholder="Enter your name"
                        onChange={(e)=>setUsername(e.target.value)} required/> <br />

                        <input type="email" className="form-control" placeholder="Enter your email"
                        onChange={(e)=>setEmail(e.target.value)} required/> <br />
                        

                        <input type="tel" className="form-control" placeholder="Enter your phone number"
                        onChange={(e)=>setPhone(e.target.value)} required/> <br />

                        <input type ="location" className="form-control" placeholder="Enter your location"
                        onChange={(e)=>setLocation(e.target.value)} required/> <br />

                        <input type="password" className="form-control" placeholder="Enter your password"
                        onChange={(e)=>setPassword(e.target.value)} required/> <br />

                        <button type="submit" className="btn btn-info">Sign up</button>
                    </form>
                    

                </div>
            </div> 
        </div>
    );
}
 
export default SignUp;