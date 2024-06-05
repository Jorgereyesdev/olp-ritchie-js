export function bookings(){

    const pageContent = `
        <h2>Bookings</h2>
        <button type="button" onclick="window.location.href = 'index.html';">Back</button>
        <table>
            <thead>
                <tr>
                    <th>Numero de vuelo</th>
                    <th>Fecha de reserva</th>
                </tr>
            </thead>
            <tbody id="tbody"></tbody>
            </table>
    `
    //Peticion para mostrar las reservas haciendo comparaciones con el ID del usuario logueado
    const logic = async () => {
        const tbody = document.getElementById('tbody');
        const resp = await fetch('http://localhost:3000/bookings',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(resp.ok){
            const data = await resp.json();
            data.forEach(booking => {
                if(booking.UserId === localStorage.getItem('id')){
                    tbody.innerHTML += `
                    <tr>
                        <td>${booking.FlightId}</td>
                        <td>${booking.bookingDate}</td>
                    </tr>
                `
                }
            });
        }
    };

    return {
        pageContent,
        logic
    }
}