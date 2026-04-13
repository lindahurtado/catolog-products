import React, { useState, useEffect } from 'react'

const ProductForm = ({ editProduct, setEditProduct, onSubmit }) => {
    const initialForm = {
        name: '',
        description: '',
        price: '',
        url: '',
        state: true,
    };
    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        if (editProduct) {
            setForm(editProduct);
        } else {
            setForm(initialForm);
        }
    }, [editProduct]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(editProduct) {
                await onSubmit(form, editProduct.id);
            } else {
                onSubmit(form);
            }
            setForm(initialForm);
            setEditProduct(null);
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
        }
    };

    return(
        <form onSubmit={handleSubmit} className='flex flex-col p-4 border rounded shadow'>
            <h2>{editProduct ? 'Editar' : 'Crear'} producto</h2>
            <input type="text" placeholder="Nombre" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className='border p-2 w-full mb-2'/>
            <input type="text" placeholder="Descripción" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required className='border p-2 w-full mb-2'/>
            <input type="number" placeholder="Precio" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required className='border p-2 w-full mb-2'/>
            <input type="url" placeholder="Url" value={form.url} onChange={e => setForm({...form, url: e.target.value})} className='border p-2 w-full mb-2'/>
            <select placeholder="Estado" value={form.state} onChange={e => setForm({...form, state: e.target.value})} required className='border p-2 w-full mb-2'>
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
            </select>
            <div>
                <button type="submit" className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600'>{editProduct ? 'Actualizar' : 'Crear'} producto</button>
                <button type="button" className='bg-gray-500 text-white p-2 rounded hover:bg-gray-600 ml-2' onClick={() => {
                    setForm({initialForm});
                    setEditProduct(null);
                }}>
                    Cancelar
                </button>
            </div>
        </form>
    )
}

export default ProductForm;