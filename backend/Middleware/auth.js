const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuarios');


exports.auth = async(req, res, next) =>{
    const token = req.header("x-auth-token");
    if(!token){
        return res.status(401).json({
                error: "No autorizado por aurh"
            }) 
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET, (err, decode)=>{
          if(err){
            res.status(400).json({
              message: "Toquen invalido"
            })
          }else{
            req.usuario = decode;
          }
        })
        // req.usuario = payload
        next()
    } catch (error) {
        return res.status(400).json({
            error: "Toquen invalido"
        }) 
    }
}


exports.protegido = async (req, res, next) => {
    let token;
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
  
    if (!token) {
      return res.status(401).json({
        error: `No tiene autorizacion para acceder a esta ruta`
    }) 
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      const usuario = await Usuario.findById(decoded._id);
  
      if (!usuario) {
        return res.status(404).json({
            error: `No se encuentra un usuario con este id`
        }) 
      }
      req.usuario = usuario;
      next();
    } catch (err) {
      return res.status(401).json({
        error: `No tiene autorizacion para acceder a esta ruta ${err}`
    })
    }
  };

exports.isAdmin = (req, res, next) => {
  
  if (req.usuario && req.usuario.isAdmin) {
    return next();
  }
  return res.status(401).send({ message: 'Token invalido de Admin' });
};  


// exports.protegido = async (req, res, next) =>{
//     let token;

//     if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
//         //Bearer 6aw4da+wd489ad4aw84d
//         token = req.headers.authorization.split(" ")[1]
//     }
//     if(!token){
//         return next(
//             res.status(401).json({
//                 error: "No autorizado por protegido "
//             })
//         )
//     }
//     try {
//         const decoded  = jwt.verify(token, process.env.JWT_SECRET);

//         const usuario = await Usuario.findById(decoded.id)

//         if(!token){
//             return next(
//                 res.status(404).json({
//                     error: "No se ecuentra el usuario",
//                 })
//             )
//         }
        
//         req.usuario = usuario;
//         next();
//     } catch (error) {
//         return next(
//             res.status(401).json({
//                 error: `No stiene acesso a esta ruta ${error}` ,
//             })
//         )
//     }
// }