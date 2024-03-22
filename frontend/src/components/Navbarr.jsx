import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button} from "@nextui-org/react";
import Logo from "../assets/Logo.jsx";
import {BrowserRouter, Link as LLink, Route, Routes, useNavigate} from "react-router-dom";
import {Login} from "../pages/Login.jsx";
import {Register} from "../pages/Register.jsx";
import {Home} from "../pages/Home.jsx";
import {Admin} from "../pages/Admin.jsx";
import {User} from "../pages/User.jsx";
import {useDispatch, useSelector} from "react-redux";
import {Gallery} from "../pages/Gallery.jsx";
import {userReducer} from "../store/slices/userStore.js";
import {Posts} from "../pages/Posts.jsx";
import {PostModal} from "./PostModal.jsx";

export const Navbarr = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const user = useSelector((state)=>state.user.token)
    const userId = useSelector((state)=>state.user.user.id)
    const dispatch = useDispatch()



    const menuItems = [
        {name:"Profile", path:`/user/${userId}`},
        {name:"Photos",path:"/photos"},
        {name:"Posts", path:"/posts"},
        {name:"Contests", path:"/contests"}
    ];
    return (
        <BrowserRouter>
        <Navbar onMenuOpenChange={setIsMenuOpen} height="auto">
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Logo />
                    <p className="font-bold text-inherit">PhotoGallery</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        <LLink to="/photos">Photos</LLink>
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        <LLink to="/posts">Posts</LLink>
                    </Link>
                </NavbarItem>
                { user && <NavbarItem>
                    <Link color="foreground" href="#">
                        <LLink to={"/user/"+userId}>My page</LLink>
                    </Link>
                </NavbarItem>}
                { user && <NavbarItem>
                    <Button onClick={()=>{
                        dispatch(userReducer.actions.setUser({}))
                        dispatch(userReducer.actions.setToken(''))
                    }}> <LLink to="/login">Log Out</LLink></Button>
                </NavbarItem>}
            </NavbarContent>
            {!user && <NavbarContent justify="end">
                <NavbarItem >
                    <Link href="#">
                        <LLink to="/login">Login</LLink>
                    </Link>
                </NavbarItem>
                <NavbarItem className=" lg:flex">
                    <Link href="#">
                        <LLink to="/register">Sign Up</LLink>
                    </Link>
                </NavbarItem>
            </NavbarContent>}
            <NavbarMenu className="mt-auto">
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`} >
                        <Link
                            className="w-full"
                            href="#"
                            size="lg"
                        >
                            <LLink to={item.path}>{item.name}</LLink>
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/main" element={<Home/>}/>
                <Route path="/admin" element={<Admin/>}/>
                <Route path="/user/:id" element={<User/>}/>
                <Route path="/photos" element={<Gallery/>}/>
                <Route path="/posts" element={<Posts/>}/>
                <Route path="/posts/create" element={<PostModal/>}/>
            </Routes>
        </BrowserRouter>
    )
}