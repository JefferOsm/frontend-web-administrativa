
const comprobarAdministrador= async()=>{
    let email= document.getElementById('login-email').value;
    let password= document.getElementById('login-password').value;

    let admin={
        email:email,
        pasword:password,
    }

    const resul= await fetch('http://localhost:3000/admin/login',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(admin)
    });
     const user=  await resul.json()

  
     if(user.error=="password incorrecto"){
        window.alert('Password o Email Incorrecto')
     }else{
        console.log(user,user.nombre);
        window.location.href="home.html";
     }
   

}