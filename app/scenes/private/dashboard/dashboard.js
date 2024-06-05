import { navigateTo } from "../../../Router";
import {styles} from "./dashboard.css"
export function dashboard(){
    const pageContent = `
        <h2>Vuelos Actuales</h2>
        <button id="create">Añadir vuelo</button>
        <section id="flight"></section>
    `;

    const logic = async () => {
        //funcion para validar que Roll se encuentra logueado y capturar para mostrar u ocultar elementos
        const flight = document.getElementById('flight');
        const user = await fetch(`http://localhost:3000/users/${localStorage.getItem('id')}`);
        let admin = false;
        if(user.ok){
            const data = await user.json();
            if(data.roleId === 1){
                admin = true;
            }
        }
        //funcion para mostrar todos los vuelos almacenados en la base de datos
        const resp = await fetch('http://localhost:3000/flights',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (resp.ok) {
            const vuelos = await resp.json();
            vuelos.forEach(vuelo => {
                flight.innerHTML += `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Numero de vuelo: ${vuelo.number}</h5>
                            <p class="card-text">Origen: ${vuelo.origin}</p>
                            <p class="card-text">Destino: ${vuelo.destination}</p>
                            <p class="card-text">Salida: ${vuelo.departure}</p>
                            <p class="card-text">Llegada: ${vuelo.arrival}</p>
                            <p class="card-text">Capacidad: ${vuelo.capacity}</p>
                            <button id="${vuelo.id}" class="reserva">Reservar</button>  <!-- Se le asigna el id de cada vuelo a las tarjetas de forma dinamica para luego usarlo en peticiones -->
                            <button id="${vuelo.id}" class="delete">Delete</button>
                            <button id="${vuelo.id}" class="update">Update</button>
                        </div>
                    </div>
                `;
            });

            //Capturar todos los botones que tengan la clase y luego asignar la reserva a la base de datos!
            document.querySelectorAll('.reserva').forEach(e => e.addEventListener('click', async a =>{
                const confirmacion = confirm('Desea realizar esta reserva?');
                if(confirmacion){
                    const resp = await fetch('http://localhost:3000/bookings', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            FlightId: a.target.id,
                            UserId: localStorage.getItem('id'),
                            bookingDate: new Date()
                        })
                    });
                    if(resp.ok){
                        alert('Vuelo reservado con exito');
                        return;
                    }else{
                        alert('Error al reservar el vuelo');
                        return;
                    }
                }
               
            }))
            
            const create = document.getElementById('create');
            //Validacion de Roll si es admin se mostraran todos los botones pero estara deshabilitado el boton de reservas
            if(admin){
                const btnReserva = document.querySelectorAll('.reserva').
                forEach(e => e.disabled=true);
            }
            if(!admin){ //Si no es admin los botones de eliminar y editar se ocultaran
                const btnDelete = document.querySelectorAll('.delete').
                forEach(e => e.style.display = 'none');
                const btnUpdate = document.querySelectorAll('.update').
                forEach(e => e.style.display = 'none');
                create.style.display='none';
            }

            create.addEventListener('click', e =>{
                e.preventDefault();
                navigateTo('/add-flight');
            })
            //Evento para capturar los vuelos que desee eliminar mediante la clase delete y el valor del id de cada vuelo
            document.querySelectorAll('.delete').
            forEach(e => e.addEventListener('click', async a =>{
                a.preventDefault();
                const confir = confirm('Esta seguro de eliminar este vuelo');
                if(confir){
                    const id = a.target.id;
                const delet = await fetch(`http://localhost:3000/flights/${id}`,{
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if(delet.ok){
                    alert('Vuelo eliminado con exito');
                    location.reload();
                    return;
                }
                else{
                    return;
                }
                }
            }))

            //Se captura la clase update para navegar a la escena de update la cual solo puede acceder administradores
            document.querySelectorAll('.update').
                forEach(e => e.addEventListener('click', async a =>{
                    a.preventDefault();
                    const id = a.target.id;
                    console.log(id);
                    localStorage.setItem('idFlight', id);
                    navigateTo('/update-flight');

                }))
        };

    }

    return {
        pageContent,
        logic
    }
}