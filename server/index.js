//1 en consola instalar npm install init
//se crea un package.json
//2. instalamos el paquete express de node npm install express
//nos crea un package-lock.jason y la carpeta node_modules
//no subir a git hub el node_module .gitignore

//importamos libreria express
const express = require('express');
//importamos el body Parser. Se usa en los endpoints que acepten body
const bodyParser = require('body-parser');
//instalar con npm install cookie-parser para crear cookies más fácil
const cookieParser = require('cookie-parser');
//instalamos el middlewhere de express (cors)  npm install cors , tratar problemas cors
const cors = require ('cors');
//path es una dependencia nativo de Node que trabaja con rutas
const path = require("path");

//instanciamos express
const app = express();
const port = 8080

//metodo de express, use, para hacer uso de las distintas librerias
//use static para crear ruta completa desde cualquier punto de partida ala carpeta public
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//MIDDLEARE 
function validarUsuario(req, res, next) {
  //todo con Strings
  if(req.cookies["usuario"] === "autenticado"){

    next();
  }else{
    res.status(403).send({
      mensaje: "No estás autorizado"
    });
  }
}

//creamos un nuevo endpoint donde crear una cookie
app.post('/login', (req, res)=>{
  console.log(req.body);

  const nombre = req.body["usuario"]
  const pass = req.body["pass"]

  //si el nombre y la pass son correctos creamos la cookie
  if (nombre === "Sara" && pass === "asdf"){
    //creamos una cookie para lo cual es necesario haber instalado cookie-parser
    res.cookie("usuario", "autenticado", {
      maxAge: Date.now()+3600,
      httpOnly: true,
    });
    
    res.status(200).send({
      mensaje: "Usuario autenticado"
    })

  }else{
    //si el nombre y la pass no son correctos, enviamos un mensaje no estás autorizddo 401
    res.status(401).send({
      mensaje: "No estás autenticado"
    });
  }
})

//acceso restringido, necesitamos un middlewhere que valide que está autenticado, validarUsuario
app.get('/areaPrivada', validarUsuario, (req, res)=>{
 
  res.send({
    mensaje: "Sesión Iniciada en Área Privada"
  })
});


//función express para que cuando todo falle pase por aquí
//esta función debe estar al final de todos los endpoints
app.use((req, res, next) => {
  res.status(404).send("No encontrado");
}) 

//listen al puerto que hemos definido
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})