import NavProfileBtn from "./NavProfileBtn/NavProfileBtn";
import HeaderAuth from "./HeaderAuth/HeaderAuth";
import Navigation from "./Navigation/Navigation";
import HeaderNav from "./HeaderNav/HeaderNav";
import Logo from "../Logo/Logo";
import React from "react";
import './Header.css'

const Header = ({auth}) => {
    const [isOpen, setIsOpen] = React.useState(false);

    function handleClickOpen() {
        setIsOpen(true)
    }

    function handleClickClose() {
        setIsOpen(false)
    }

    return (
    <div>
        <header className={`header ${!auth ? 'header__signup' : ''}`}>  
            <div className='header__logo-container'>
                <Logo/>
                {auth && <HeaderNav onClick={handleClickOpen}/>}
            </div>
            {!auth ? <HeaderAuth/> : <NavProfileBtn isOpen={handleClickOpen}/>}
            <Navigation isOpen={isOpen} onClick={handleClickClose}/>
        </header>
    </div>
    );
}

export default Header;