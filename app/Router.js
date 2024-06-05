import { routes } from "./helpers/routes";

//funcion para carturar la url y ejecutar la funcion routes
export function Router() {
    window.addEventListener('popstate', {
        routes
    })
    routes();
}

//funcion para cambiar la url y ejecutar la funcion routes
export function navigateTo(path){
    window.history.pushState({}, '', window.location.origin + path);
    routes();
}