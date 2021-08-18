exports.getAcceso = (req, res, next)=>{
    res.status(200).json({
        succes:true,
        data: "Acceso concedido",
    })
}