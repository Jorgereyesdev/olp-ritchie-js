import { navigateTo } from "../../../Router";

export function addFlight(){
    try {
        const pageContent = `
        <h1>Add Flight</h1>
        <form>
            <input type="text" id="numeroDeVuelo" placeholder="Numero de vuelo">
            <input type="text" id="origen" placeholder="Lugar de origen">
            <input type="text" id="destino" placeholder="Lugar de destino">
            <input type="text" id="salida" placeholder="Fecha de salida YYYY-MM-DD">
            <input type="text" id="llegada" placeholder="Fecha de llegada">
            <input type="text" id="capacity" placeholder="Capacidad">
            <button type="submit">Add</button>
        </form>
        <button type="button" onclick="window.location.href = 'index.html';">Back</button>
    `;

    const logic = async () => {

        //Funcion para validar el roll del usuario logeado
            const user = await fetch(`http://localhost:3000/users/${localStorage.getItem('id')}`);
            if(user.ok){
                const data = await user.json();
                if(data.roleId !== 1){
                    navigateTo('/dashboard'); 
                    return
                }
            }

        const form = document.querySelector('form');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const number = document.querySelector('#numeroDeVuelo').value;
            const origin = document.querySelector('#origen').value;
            const destination = document.querySelector('#destino').value;
            const departure = document.querySelector('#salida').value;
            const arrival = document.querySelector('#llegada').value;
            const capacity = document.querySelector('#capacity').value;
            const flight = {
                number,
                origin,
                destination,
                departure,
                arrival,
                capacity,
            }
            console.log(flight);
            
            //peticion para crear un nuevo vuelo en la base de datos
            const resp = await fetch('http://localhost:3000/flights', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(flight)
            });
            if (resp.ok){
                alert('Vuelo creado con exito');
            }else{
                alert('Error al crear el vuelo');
            }
        });
        
    }

    return{
        pageContent,
        logic
    }
    } catch (error) {
        throw new Error('Error: ' + error.message)
    }
    
}