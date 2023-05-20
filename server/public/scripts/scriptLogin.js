

window.addEventListener("load",() => {
    
    let formulario = document.getElementById("formInicioSesion");
    
    formulario.addEventListener("submit", function (eventoSubmit) {
        //Prevenimos el comportamiento por default
        eventoSubmit.preventDefault();
  

        //accedemos a los inputs
        let nombreInput=document.getElementsByName("usuarioNombre")[0];
        let passInput=document.getElementsByName("usuarioPass")[0];

        //recogemos el valor introducido
        let usuarioValue = nombreInput.value;
        let passValue = passInput.value;
    

        //fetch al LOGIN
        fetch("http://localhost:8080/login",{
            method:"POST",
            body:JSON.stringify({
                usuario: usuarioValue,
                pass: passValue
            }),
            headers:{
                'Content-Type': 'application/json'
                }, 
            credentials:'same-origin'                  
        }).then(function (response) {
            response.json().then((data) => {
                alert(data.mensaje);
            });
        }).catch(function (error) {
            console.warn(error);
        })

    //fin formulario eventoSubmit    
    })

    let areaPrivada = document.getElementById("areaPrivada");
    areaPrivada.addEventListener("click", () => {

        //fetch al areaPrivada
        fetch("http://localhost:8080/areaPrivada",{
            method:"GET",
            credentials:'same-origin'               
        }).then(function (response) {
            response.json().then((data) => {
               alert(data.mensaje);
            });
        }).catch(function (error) {
            console.warn(error);
        })        
    //fin del evento click en boton Area privada    
    })

       
    //Fin window onload
})