import React, { useState } from 'react'

const ProductForm = () => {
    const [form, setForm] = useState({
        name: '',
        descripion: '',
        price: '',
        url: '',
        category: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3000/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(form),
            });
            if(res.ok) {
                setForm({
                    name: '',
                    description: '',
                    price: '',
                    url: '',
                    category: ''
                });
                onProductCreated();
            }
        } catch (err) {
            console.error("Error al crear:", err);
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <h3>Crear un producto</h3>
            <input placeholder="Nombre" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required/>
            <input placeholder="Descripción" value={form.descripion} onChange={e => setForm({...form, description: e.target.value})} required/>
            <input placeholder="Precio" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required/>
            <input placeholder="Url" value={form.url} onChange={e => setForm({...form, url: e.target.value})} required/>
            <input placeholder="Categoría" value={form.category} onChange={e => setForm({...form,  category: e.target.value})} required/>
            <button type="submit">Guardar producto</button>
        </form>
    )
}

export default ProductForm;