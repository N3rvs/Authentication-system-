import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const PrivatePage = () =>{
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const handleClick = (e)=>{
		localStorage.removeItem("jwt-token");
		actions.logoutState();
        navigate('/')
    }
    return(
    <>
    {store.isAuthenticated?
    <div class="container bg-dark">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand text-white" href="#">Private Page</a>
            <button type="button" class="btn btn-danger" onClick={handleClick}>Cerrar sesión</button>
        </div>
    </nav>
    </div>
    :
    <h1>No has iniciado sesión</h1>
    }
    
    </>
    )
}