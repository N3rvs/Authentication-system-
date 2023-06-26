import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

import toast, { Toaster } from 'react-hot-toast';
import { login } from "../services/user_services";

export const FormLogin = ()=>{
    const [ formData, setFormData ] = useState({});
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleChange = (e)=>{
        setFormData({ ...formData, [e.target.id]:e.target.value });
    }

    const handleClick = async (e) =>{
        e.preventDefault();
        const data = await login(formData)
        if(data.token){
            actions.loginState();
            navigate('/private')
        }
        toast.error("Usuario o contraseña incorrectos")
    }

    return(

        <div className="w-25">
        <div className="row py-3">
                <div className="col">
                <label htmlFor="email" className="form-label">
                    Email
                </label>
                <input
                    type="text"
                    id="email"
                    onChange={handleChange}
                    className="form-control"
                    aria-label="Email"
                />
                </div>
            </div>
            <div className="row">
                <div className="col">
                <label htmlFor="password" className="form-label">
                    Contraseña
                </label>
                <input
                    type="password"
                    id="password"
                    onChange={handleChange}
                    className="form-control"
                    aria-label="Contraseña"
                />
                </div>
            </div>
            <button type="button" className="btn btn-light" onClick={handleClick}>Iniciar sesion</button>
            <Toaster   
            position="bottom-left"
            reverseOrder={false}/>
        </div>

    )
}