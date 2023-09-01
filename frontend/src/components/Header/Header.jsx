import NavProfileBtn from "./NavProfileBtn/NavProfileBtn";
import HeaderAuth from "./HeaderAuth/HeaderAuth";
import Navigation from "./Navigation/Navigation";
import HeaderNav from "./HeaderNav/HeaderNav";
import Logo from "../Logo/Logo";
import React from "react";
import './Header.css'
import { useLocation } from "react-router-dom";

const Header = ({auth}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const { pathname } = useLocation();
    const isBasePath = pathname === "/";
    const isHeaderPath =
    pathname === "/" ||
    pathname === "/movies" ||
    pathname === "/saved-movies" ||
    pathname === "/profile";
    function handleClickOpen() {
        setIsOpen(true)
    }

    function handleClickClose() {
        setIsOpen(false)
    }

    if(isHeaderPath) {
        return (
        <div>
            <header className={`header ${!isBasePath  && 'header__signup'}`}>  
                <div className='header__logo-container'>
                    <Logo/>
                    {auth && <HeaderNav onClick={handleClickOpen}/>}
                </div>
                {!auth ? <HeaderAuth/> : <NavProfileBtn isOpen={handleClickOpen}/>}
                <Navigation 
                isOpen={isOpen} 
                onClick={handleClickClose}
                isBasePath={isBasePath}
                />
            </header>
        </div>
        );
    }else {
        return null;
    }
}

export default Header;