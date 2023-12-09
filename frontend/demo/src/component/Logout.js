import React from "react"
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { toast } from "react-toastify";

function Logout() {
    const navigate = useNavigate();

    const handleLogout=(e)=>{
        e.preventDefault()
        localStorage.removeItem('auth');
        navigate("/")
        toast.success("logout succesfully ")
    }

    return(
        <div style={{marginTop:"5px"}}>
        <Button variant="outlined" startIcon={<LogoutIcon />}  onClick={(e)=>handleLogout(e)}>
        Logout
      </Button>
        </div>

    )
}
export default Logout