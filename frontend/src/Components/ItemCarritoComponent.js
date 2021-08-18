
import {Link} from 'react-router-dom';

const ItemCarritoComponent = ({ item, cantidad, borrar}) => {
    return (
        <div className="cartitem">
            <h1>Carrito</h1>
            <div className="cartitem__image">
                <img src={item.imagenUrl}
                alt={item.nombre}/>
            </div>
            <Link to={`/producto/${item.producto}`}>
                <p>{item.nombre}</p>
            </Link>
            <p className="carditem__price">${item.precio}</p>
            <select className="cartitem__select" 
                value={item.cantidad} 
                onChange={(e)=> cantidad(item.producto, e.target.value)}
            >
                {[...Array(item.stock).keys()].map(x=>(
                    <option key={x+1} value={x+1}>{x+1}</option>
                ))}
            </select>

            <button className="cartitem__deleteBtn" onClick={() => borrar(item.producto) }>
                <i className="fas fa-trash"></i>
            </button>
        </div>
    )
}

export default ItemCarritoComponent
