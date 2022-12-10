let categorias;
let productos;
let products=[]


const cargarCategorias= async()=>{
    const respuesta= await fetch('http://localhost:3000/categorias',{
        method: 'GET',

    })
    categorias= await respuesta.json();
    console.log("Categorias", categorias) 
}
cargarCategorias().then(()=>{
    renderizarCategorias();
});



const renderizarCategorias= ()=>{
    categorias.forEach(categoria => {
        document.getElementById('categorias').innerHTML+=
        `
                    <div class="card" data-bs-toggle="modal" data-bs-target="#productosModal" onclick="cargarProductos('${categoria._id}')">
                            <div class="icon-case">
                                <img src="${categoria.imagenCategoria}" alt="" class="imagen">
                                <h3>${categoria.nombreCategoria}</h3>
                            </div>                      
                        </div>   
        `
    });
    document.getElementById('categorias').innerHTML+='<button  data-bs-toggle="modal" data-bs-target="#modalCategorias"><img src="/img/agregar.png" alt=""> </button>'
}


const cargarProductos= async(idCategoria)=>{
    const respuesta= await fetch('http://localhost:3000/productos',{
        method: 'GET',

    })
    productos= await respuesta.json();
    console.log("Categorias", productos) ;
    renderizarProductos(idCategoria);
}



const renderizarProductos= (idCategoria)=>{
    document.getElementById('productos').innerHTML='';
    productos.forEach(producto => {
        document.getElementById('productos').innerHTML+=
        `
        <div class="card-modal" >
        <img src="${producto.imgProducto}" alt="..." class="imgModal">
        <div class="txtModal">
            <h4>${producto.nombreProducto}</h4>
            <h4>L.${producto.precio}</h4>
        </div>
        <i class="fa-solid fa-square-plus btnModalP" onclick="enviarProducto('${idCategoria}','${producto._id}')"></i>
        </div>
        `
    });
    products=[]
}


const agregarCategoria= async()=>{
    let nombre= document.getElementById('nombre').value;
    let tipos= document.getElementById('tipos').value;
    let img= document.getElementById('imagen').value;

    let categoria= {
        nombreCategoria: nombre,
        tipos: tipos,
        imagenCategoria: img,
        productos: products
    }
    const respuesta= await fetch('http://localhost:3000/categorias',
    {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoria)
    }
    );
    const result= await respuesta.json();
    console.log(result);
    cargarCategorias();
}

const enviarProducto= async(idCategoria, idProducto)=>{
    products.push(idProducto);
    console.log(products);
    let producto={
        productos: products
    }
    const result= await fetch(`http://localhost:3000/categorias/${idCategoria}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(producto)
    });
    const acept= await result.json();
    console.log(acept);
}
