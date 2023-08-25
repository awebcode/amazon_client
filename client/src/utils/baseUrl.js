
import axios from "axios";
import { toast } from "react-toastify";
export const base_url = "https://amazonadmin-backend.onrender.com/api/"; //https://amazonadmin-backend.onrender.com
// http://localhost:5000/api/


export const logout = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/logout`,
      
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      // Successful logout logic, such as redirecting to the login page
        window.location.href = "/signin";
      toast.success("Logged Out") // Redirect to the login page
    } else {
      // Handle unsuccessful logout scenario
      console.error("Logout failed");
    }
  } catch (error) {
    console.error("Error during logout:", error);
  }
};
