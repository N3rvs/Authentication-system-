import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/user_services";

export const FormSignup = () => {
	const [ formData, setFormData ] = useState({});
    const navigate = useNavigate();

	const handleChange = (e)=>{
		setFormData({ ...formData,[e.target.id]: e.target.value });
	}

	const handleClick = (e)=>{
		e.preventDefault();
		signup(formData)
		navigate('/')
	}
return (
    <>
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
    <button type="button" class="btn btn-light" onClick={handleClick}>Registrar</button>
	</div>
    </>
    );
};
