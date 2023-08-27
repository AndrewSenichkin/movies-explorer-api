import {useNavigate} from "react-router-dom";
import './NavProfileBtn.css'
import React from 'react';

function NavProfileBtn(props) {
    const navigate = useNavigate();
    return (
        <>
            <button className='nav-profile-btn' type='button' onClick={() => navigate("/profile")}>
                <p className='nav-profile-btn__text'>Аккаунт</p>
            </button>
            <button className='nav-profile-menu' type='button' onClick={props.isOpen}>
            </button>
        </>
    );
}

export default NavProfileBtn;