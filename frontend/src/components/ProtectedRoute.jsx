import {Navigate} from "react-router-dom";
import React from "react";

function ProtectedRoute({children, render, loggedIn}) {
    return render && (loggedIn ? (children) : (<Navigate to="/"/>));
}

export default ProtectedRoute;