import {baseUrl} from "./constants";

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(res);
    }
}

export async function authorization({email, password}) {
    const data = await fetch(`${baseUrl}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({password, email}),
    })
    return checkResponse(data);
}


export async function registration({email, password, name}) {
    const data = await fetch(`${baseUrl}/signup`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password, name}),
    })
    return checkResponse(data);
}

export const getContent = (token) => {
    return fetch(`https://auth.nomoreparties.co/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    }).then(checkResponse);
}