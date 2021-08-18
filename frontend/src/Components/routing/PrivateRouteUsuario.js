import { Route, Redirect } from 'react-router-dom'

import { useSelector } from 'react-redux';

const PrivateRouteUsuario = ({component:  Component, ...rest} ) => {
    
    const usuario = useSelector((state) => state.usuarioIniciarSesion);
    const {infoUsuario} = usuario
    
    return (
        <Route
            {...rest}
            render={(props) =>
                infoUsuario ?(
                    <Component {...props}/>
                ) : (
                    <Redirect to= "/login"/>
                )
            }
        />
    )
}

export default PrivateRouteUsuario