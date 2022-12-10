let productos;
let empresas;
let ordenes;
let today= new Date();
let fecha= today.toLocaleDateString('en-US');



const cargarOrdenes= async()=>{
    const respuesta= await fetch('http://localhost:3000/ordenes/ordenes-pendientes',{
        method: 'GET'
    })
    ordenes= await respuesta.json();
    console.log(ordenes)
   
}
cargarOrdenes().then(()=>{
    renderizarOrdenesCard();
})

const renderizarOrdenesCard= ()=>{
    document.getElementById('ordenes').innerHTML=
    `
    <h1>${ordenes.length}</h1>
     <h3>Pedidos Pendientes</h3>
    `;
    
    document.getElementById('pendientes').innerHTML+=
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

    
    ordenes.forEach((orden,i) => {
        
        document.getElementById('pendientes').innerHTML+=
        `
            
        <tr>
        <td>${i}</td>
        <td>${fecha}</td>
        <td>${orden.nombreCliente}</td>
        <td>${orden.totalProductos} Productos</td>
        <td>L.${orden.totalPago}</td>
        <td>Pendiente</td>
        
        
         </tr>
        `
    });
    
}

const cargarRestaurantes= async()=>{
    const respuesta= await fetch('http://localhost:3000/empresas',{
        method: 'GET',

    })
    empresas= await respuesta.json();
    console.log("Empresas", empresas) ;
}

cargarRestaurantes().then(()=>{
    renderizarRestaurantesCard();
});

const renderizarRestaurantesCard= ()=>{
    document.getElementById('empresas').innerHTML=
    `
    <h1>${empresas.length}</h1>
   <h3>Empresas</h3>
    `;
}



const cargarProductos= async()=>{
    const respuesta= await fetch('http://localhost:3000/productos',{
        method: 'GET',

    })
    productos= await respuesta.json();
    console.log("Categorias", productos) 
}
cargarProductos().then(()=>{
    renderizarProductosCard();
});

const renderizarProductosCard= ()=>{
    document.getElementById('productos').innerHTML=
    `
    <h1>${productos.length}</h1>
    <h3>Productos totales</h3>
    `;
}