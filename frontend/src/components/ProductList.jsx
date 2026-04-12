import React, { useEffect, useState } from 'react';
import { getProducts } from '../../services/catalog';

const ProductList = () => {
    const [products, setProducts ] = useState([]);

    const handleState = async (id) => {
        await fetch(`http://localhost:3000/products/${id}`, { method: 'DELETE'});
        onRefresh();
    }

    useEffect(() => {
        getProducts().then(data => setProducts(data));
    }, []);

    return(
        <div>
            <h2>Catalogo</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>
                                <button>Editar</button>
                                <button onClick={() => handleState(product.id)}>Deshabilitar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProductList;