var pedidos;
let today= new Date();
let fecha= today.toLocaleDateString('en-US');
let pendiente;



const cargarPedidos= async()=>{
    const respuesta= await fetch('http://localhost:3000/ordenes',{
        method: 'GET',

    })
    pedidos= await respuesta.json();
    //console.log("Categorias", pedidos,fecha) 
    return  pedidos;
}

cargarPedidos().then(()=>{
    renderizarPedidos();
});

const renderizarPedidos= ()=>{
    document.getElementById('pedidos').innerHTML+=
    `
    <tr>
        <th>#</th>
        <th>Fecha</th>
        <th>Nombre</th>
        <th>N Productos</th>
        <th>Total</th>
        <th>Estado</th>
    </tr>
    `;

    pedidos.forEach((pedido,i) => {
        if(pedido.aceptado==0){
            pendiente='Pendiente';
        }else{
            pendiente='Entregado';
        }
        document.getElementById('pedidos').innerHTML+=
        `
            
        <tr>
        <td>${i}</td>
        <td>${fecha}</td>
        <td>${pedido.nombreCliente}</td>
        <td>${pedido.totalProductos} Productos</td>
        <td>L.${pedido.totalPago}</td>
        <td>${pendiente}</td>
        
        
         </tr>
        `
    });
    
}



