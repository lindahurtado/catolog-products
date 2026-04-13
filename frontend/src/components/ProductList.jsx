import React from 'react';

const ProductList = ({ products, onEdit, onDelete }) => {
    return(
        <div className='flex flex-col gap-3 justify-center items-center'>
            <h2 className='text-lg font-bold font-sans'>Catalogo</h2>
            <div className='overflow-x-auto rounded-lg shadow-lg'>
                <table className='min-w-full table-auto bg-white'>
                    <thead className='bg-blue-400 text-slate-700'>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>Nombre</th>
                            <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>Descripción</th>
                            <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>Precio</th>
                            <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>Url</th>
                            <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>Estado</th>
                            <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-500'>
                        {products?.map(product => (
                            <tr key={product.id} className='hover:bg-gray-50 transition-colors'>
                                <td className='px-6 py-4 whitespace-nowrap font-medium text-gray-700'>{product.name}</td>
                                <td className='px-6 py-4 text-sm text-gray-700'>{product.description}</td>
                                <td className='px-6 py-4 text-sm font-bold text-blue-800'>
                                    ${new Intl.NumberFormat('es-CO').format(product.price)}
                                </td>
                                <td className='px-6 py-4 text-sm text-gray-700'>{product.url}</td>
                                <td>
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.state ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {product.state ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                <td className='px-6 py-4 text-sm flex gap-3'>
                                    <button 
                                        className='text-indigo-600 hover:text-indigo-950' 
                                        onClick={() => {
                                            onEdit(product);
                                        }}
                                    >
                                        Editar
                                    </button>
                                    <button onClick={() => onDelete(product.id)} className='text-red-600 hover:text-red-950 ml-2'>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductList;