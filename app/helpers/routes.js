import { navigateTo } from "../Router";
import { login, noFound, register } from "../scenes/public";
import { bookings, addFlight, editFlight, dashboard } from "../scenes/private";
import { Dashboard } from "../components/dashboard/dashboard";



//objeto para encontrar la ruta y ejecutar la funcion
const routesConfig = {
    public: [
        {path:'/login', component:login},
        {path:'/no-found', component:noFound},
        {path:'/register', component:register},
    ],
    private:[
        {path:'/dashboard', component:dashboard},
        {path:'/add-flight', component:addFlight},
        {path:'/update-flight', component:editFlight},
        {path:'/bookings', component:bookings},
    ]
}

//funcion logica para encontrar la ruta y ejecutar, capturar un evento si no encuentra la ruta como enviarlo a una ruta en especifico
export function routes (){
    const path = window.location.pathname;
    const publicRoute = routesConfig.public.find(e => e.path === path);
    const privateRoute = routesConfig.private.find(e => e.path === path);
    if(localStorage.getItem('token')){
        if(privateRoute){
            const {pageContent, logic} = privateRoute.component();
            Dashboard(pageContent, logic);
            return;
        }else{
            navigateTo('/dashboard');
            return;
        }
    }

    if(publicRoute){
        publicRoute.component();
        return;
    }else{
        navigateTo('/no-found')
        return;
    }
}