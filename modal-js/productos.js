let productos;

const cargarProductos= async()=>{
    const respuesta= await fetch('http://localhost:3000/productos',{
        method: 'GET',

    })
    productos= await respuesta.json();
    console.log("Categorias", productos) 
}
cargarProductos().then(()=>{
    renderizarProductos();
});



const renderizarProductos= ()=>{
    productos.forEach(producto => {
        document.getElementById('productos').innerHTML+=
        `
                    <div class="card">
                            <div class="icon-case">
                                <img src="${producto.imgProducto}" alt="" class="imagen">
                                <h3>${producto.nombreProducto}</h3>
                            </div>                      
                        </div>   
        `
    });
    document.getElementById('productos').innerHTML+='<button data-bs-toggle="modal" data-bs-target="#modalProductos"><img src="/img/agregar.png" > </button>'
}



const agregarProducto= async()=>{
    let nombre= document.getElementById('nombre').value;
    let descripcion = document.getElementById('descripcion').value;
    let precio= document.getElementById('precio').value;
    let img= document.getElementById('imagen').value;

    let producto= {
        nombreProducto: nombre,
        descripcion: descripcion,
        precio: precio,
        imgProducto: img
    }
    const respuesta= await fetch('http://localhost:3000/productos',
    {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    }
    );
    const result= await respuesta.json();
    console.log(result);
}