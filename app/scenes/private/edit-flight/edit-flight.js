import { navigateTo } from "../../../Router";

export function editFlight(){
    const pageContent = `
        <h2>vista de edicion</h2>
        <div id="container">
            <label>Fecha de origen</label>
            <input id="origen" type="text" placeholder="Fecha de origen">
            <label>Fecha de origen</label>
            <input id="llegada" type="text" placeholder="Fecha de llegada">
            <label>Fecha de llegada</label>
            <input id="capacidad" type="text" placeholder="Capacidad">
            <button id="enviar">Enviar</button>
        </div>
        <button type="button" onclick="window.location.href = 'index.html';">Back</button>
    `;

    const logic = async () => {
        //Se captura el id de la tarea que se va a editar por medio del local storage y luego se remueve de este
        const idFlight = localStorage.getItem('idFlight');
        localStorage.removeItem('idFlight');
        console.log(idFlight);

        //Validacion de que unicamente pueda ingresar a esta pagina usuarios con roll administrador de lo contrario sera dirigido a la escena dashboard
        const user = await fetch(`http://localhost:3000/users/${localStorage.getItem('id')}`);
        if(user.ok){
            const data = await user.json();
            if(data.roleId !== 1){
                navigateTo('/dashboard'); 
                return
            }
        }
        //llenar los campos previamente con la informacion del vuelo a editar utilizando el id de esta
        const container = document.getElementById('container');
        const flight = await fetch(`http://localhost:3000/flights/${idFlight}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(flight.ok){//se capturan todos los campos a editar asi como tambien se realiza la asignacion de los campos no editables para que mantengan los mismos valores
            const data = await flight.json();
            const origin = document.getElementById('origen');
            const destination = document.getElementById('llegada');
            const capacity = document.getElementById('capacidad');

            origin.value = data.origin;
            destination.value = data.departure;
            capacity.value = data.arrival;

            const enviar = document.getElementById('enviar');
            enviar.addEventListener('click', async () => {
            const origin = document.getElementById('origen').value;
            const destination = document.getElementById('llegada').value;
            const capacity = document.getElementById('capacidad').value;
        
            const flight = {
                "id": data.id,
                "number": data.number,
                "destination": data.destination,
                "departure": origin,
                "arrival": destination,
                "capacity": capacity
            }

            console.log(flight)
            const response = await fetch(`http://localhost:3000/flights/${data.id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(flight)
        });
        if(response.ok){
            alert('Fechas actualizadas correctamente')
        }else{
            alert('Error al actualizar las fechas')
        }
        })

    }

    };

    return{
        pageContent,
        logic
    }
}