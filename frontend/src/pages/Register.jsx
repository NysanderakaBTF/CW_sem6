import { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import axios from "axios";
import {useDispatch} from "react-redux";
import {userReducer} from "../store/slices/userStore.js";
import {useNavigate} from "react-router-dom";

export const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        password2: '',
    });
    const [error, setError] = useState('');
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        if (formData.password !== formData.password2) {
            setError('Passwords do not match');
        } else {
            axios.post('http://45.61.149.220:3000/users/register',
                {

                    email: formData.email,
                    name: formData.name,
                    password: formData.password,
                    password2: formData.password2,
                }
            ).then(r => {
                console.log(r);
                if(r.data.token) {
                    dispatch(userReducer.actions.setToken({
                        token: r.data.token
                    }))
                    navigate('/photos')
                }
                else
                    alert('Check your data')
            }).catch(response => alert(response))
        }
    }

    return (
        <div className="flex w-full flex-wrap flex-col md:flex-nowrap gap-4">
            <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
            />
            <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
            />
            <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
            />
            <Input
                type="password"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                placeholder="Confirm Password"
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Button onClick={handleSubmit}>Register</Button>
        </div>
    )
};