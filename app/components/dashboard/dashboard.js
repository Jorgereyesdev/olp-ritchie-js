import { navBar } from "../navbar/navbar";
import { navigateTo } from "../../Router";

//Funcion para ejecutar rutas privadas manteniendo la funcion navbar fija!
export function Dashboard(pageContent,logic){
    const root = document.getElementById("root");
    root.innerHTML = `
        <div>${navBar()}</div>
        <div>${pageContent}</div>
    `;

    logic();

    const logout = document.getElementById("logout");
    logout.addEventListener("click", () => {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        navigateTo("/login");
    });

    const dashboard = document.getElementById("dashboard");
    dashboard.addEventListener("click", () => {
        navigateTo("/dashboard");
    });

    const bookings = document.getElementById("bookings");
    bookings.addEventListener("click", () => {
        navigateTo("/bookings");
    });
}