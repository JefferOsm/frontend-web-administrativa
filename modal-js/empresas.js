let empresas;
let categorias;
let categories= [];
const cargarRestaurantes= async()=>{
    const respuesta= await fetch('http://localhost:3000/empresas',{
        method: 'GET',

    })
    empresas= await respuesta.json();
    console.log("Empresas", empresas) ;
}
cargarRestaurantes().then(()=>{
    renderizarRestaurantes();
});


const renderizarRestaurantes= ()=>{
    empresas.forEach(empresa => {
        document.getElementById('empresas').innerHTML+=
        `
                    <div class="card" data-bs-toggle="modal" data-bs-target="#categoriasModal" onclick="cargarCategorias('${empresa._id}')">
                            <div class="icon-case">
                                <img src="${empresa.icono}" alt="" class="imagen">
                                <h3>${empresa.nombreRestaurante}</h3>
                            </div>                      
                        </div>   
        `
    });
    document.getElementById('empresas').innerHTML+='<button id="myBtn" data-bs-toggle="modal" data-bs-target="#modalEmpresa"><img src="/img/agregar.png" alt=""> </button>'
}


const cargarCategorias= async(idEmpresa)=>{
    const respuesta= await fetch('http://localhost:3000/categorias',{
        method: 'GET',

    })
    categorias= await respuesta.json();
    console.log("Categorias", categorias) ;
    renderizarCategorias(idEmpresa);
}




const renderizarCategorias= (idEmpresa)=>{
    document.getElementById('categorias').innerHTML='';
    categorias.forEach(categoria => {
        document.getElementById('categorias').innerHTML+=
        `
        <div class="card-modal" >
        <img src="${categoria.imagenCategoria}" alt="..." class="imgModal">
        <div class="txtModal">
            <h4>${categoria.nombreCategoria}</h4>
            <h4>${categoria.tipos}items</h4>
        </div>
        <i class="fa-solid fa-square-plus btnModalP" onclick="enviarCategoria('${idEmpresa}','${categoria._id}')"></i>
        </div>
        `
    });
    categories=[]
}


const agregarEmpresa= async()=>{
    let nombre= document.getElementById('nombre').value;
    let img= document.getElementById('imagen').value;
    let description= document.getElementById('descripcion').value;
    let estrellas= document.getElementById('calificacion').value;
    let empresa= {
        nombreRestaurante: nombre,
        icono: img,
        descripcion: description,
        calificacion: estrellas,
        categorias: categories
    }
    const respuesta= await fetch('http://localhost:3000/empresas',
    {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(empresa)
    }
    );
    const result= await respuesta.json();
    console.log(respuesta);
    cargarRestaurantes();
}

const enviarCategoria= async(idEmpresa, idCategoria)=>{
    categories.push(idCategoria);
    console.log(categories);
    let categoria={
        categorias: categories
    }
    const result= await fetch(`http://localhost:3000/empresas/${idEmpresa}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(categoria)
    });
    const acept= await result.json();
    console.log(acept);
}
