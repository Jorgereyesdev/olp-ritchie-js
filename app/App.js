import { Router } from "./Router";

//funcion para capturar el elemento del html y poder ejecutar la funcion Router
export function App (){
    const root = document.getElementById("root");
    if(root){
        Router();
    }else{
        alert('Error en App');
    }
}