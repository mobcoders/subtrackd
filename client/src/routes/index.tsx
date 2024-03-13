import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function IndexPage() {
  const { userId } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (userId) {
      navigate("/dashboard")
      
    }
  })
  return (
    <div>
      <h1> This is the index page</h1>
      <div>
        <ul>
          <li><Link to="/sign-up">Sign Up</Link></li>
          <li><Link to="/sign-in">Sign In</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
      </div>
    </div>
  )
}
