import { navigateTo } from "../../../Router";

export function login() {
    const root = document.getElementById('root');
    root.innerHTML = `
        <form id="form">
            <input type="email" id="email" placeholder="Email">
            <input type="password" id="password" placeholder="Password">
            <input type="submit" id="submit" value="Submit">
        </form>
        <button id="register">Register</button>
    `;

    const register = document.getElementById('register');
    register.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo('/register')
    })

    const form = document.getElementById('form');
    form.addEventListener('submit', async e =>{
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if(!email || !password){
            alert('Email and password are required');
            return;
        }

        const respUser = await fetch('http://localhost:3000/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(respUser.ok){
            const user = await respUser.json();
            console.log(user);
            const validateUser = user.find(e => e.email === email && e.password === password)
            if(validateUser){
                alert('Login success');
                const token = Math.random().toString(36).toString(2);
                localStorage.setItem('token', token);
                localStorage.setItem('id', validateUser.id)
                navigateTo('/dashboard')
                return;
            }else{
                alert('Email or password incorrect');
                return;
            }
        }else{
            alert('Err in promise in App');
            return;
        }


    })

}