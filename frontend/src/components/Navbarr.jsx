import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button} from "@nextui-org/react";
import Logo from "../assets/Logo.jsx";
import {BrowserRouter, Link as LLink, Route, Routes} from "react-router-dom";
import {Login} from "../pages/Login.jsx";
import {Register} from "../pages/Register.jsx";
import {Home} from "../pages/Home.jsx";
import {Admin} from "../pages/Admin.jsx";
import {User} from "../pages/User.jsx";

export const Navbarr = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const menuItems = [
        {name:"Profile", path:"/me"},
        {name:"Photos",path:"/photos"},
        {name:"Posts", path:"/posts"},
        {name:"Main", path:"/main"},
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
                    <Link href="#" aria-current="page">
                        <LLink to="/contests">Contests</LLink>
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        <LLink to="/me">My page</LLink>
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem >
                    <Link href="#">
                        <LLink to="/login">Login</LLink>
                    </Link>
                </NavbarItem>
                <NavbarItem className="hidden lg:flex">
                    <Link href="#">
                        <LLink to="/register">Sign Up</LLink>
                    </Link>
                </NavbarItem>
            </NavbarContent>
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
                <Route path="/me" element={<User/>}/>
            </Routes>
        </BrowserRouter>
    )
}