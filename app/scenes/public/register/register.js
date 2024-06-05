import { navigateTo } from "../../../Router";

export function register() {
    const root = document.getElementById('root');
    root.innerHTML = `
        <form id="form">
            <input type="text" id="name" placeholder="name"> 
            <input type="email" id="email" placeholder="Email">
            <input type="text" id="date" placeholder="Fecha de nacimiento">
            <input type="password" id="password" placeholder="Password">
            <input type="submit" id="submit" value="Submit">
        </form>
        <button id="login">Login</button>
    `;

    const login = document.getElementById('login');
    login.addEventListener('click', e => {
        e.preventDefault();
        navigateTo('/login');
    });


    const emailValidator = (email) => {
        const validate = (/[@]/).test(email);
        const validate2 =/[.]/.test(email);
        if(validate === true && validate2 === true){
            return true;
        }
        return false;
    };

    const form = document.getElementById('form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const birthdate = document.getElementById('date').value;
        const password = document.getElementById('password').value;
       
        const emailTest = emailValidator(email);
        
        if(!emailTest){
            alert('El email no es valido');
            return;
        }

        if(!name || !email || !password || !birthdate){
            alert('Todos los campos son obligatorios');
            return;
        }

        const user = {
            name: name,
            email: email,
            birthdate: birthdate,
            password: password,
            "roleId": 2
        };
       
        const respCreate = await fetch('http://localhost:3000/users', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if(respCreate.ok){
            alert('Se a creado el usuario!');
            navigateTo('/login');
        }else{
            alert('No se pudo crear el usuario');
        }
        

    });
}