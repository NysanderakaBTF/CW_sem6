import {Button, Input} from "@nextui-org/react";
import {useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {store} from "../store/store.js";
import {userReducer} from "../store/slices/userStore.js";
import {Form, Navigate, Router, useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function login_handler( em, pass){
        axios.post('http://127.0.0.1:3000/users/login', {
            "email":em,
            "password":pass
        }).then(
            (value) => {
                dispatch(userReducer.actions.setToken({
                    token: value.data.token
                }))
                const user = jwtDecode(value.data.token)
                dispatch(userReducer.actions.setUser(user))


                navigate('/main')
            }
        ).catch(
            (reason) => console.log(reason)
        )
    }


    return (
        <>
            <form onSubmit={(event)=>{event.preventDefault(); login_handler(email, password)}} className="flex w-full flex-wrap flex-col md:flex-nowrap gap-4">
                <Input type="email" label="Email" placeholder="Email" onValueChange={(value) => {setEmail(value);}}/>
                <Input type="password" label="Email" placeholder="Password"  onValueChange={(value) => {setPassword(value);}}/>
                <Button  type="submit" label="Submit">
                    Button
                </Button>

            </form>
        </>
    )
}