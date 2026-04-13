import React from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

function App() {
    const [editProduct, setEditProduct] = React.useState(null);
    const [products, setProducts] = React.useState([]);

    const getProducts = async () => {
        try {
            const res = await fetch('http://localhost:3000/products');
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };

    React.useEffect(() => {
        getProducts();
    }, []);

    const prepareEdit = (product) => {
        setEditProduct(product);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } 

    const handleSave = async (formData, id=null) => {
        const method = id ? 'PUT' : 'POST';
        const url = id ? `http://localhost:3000/products/${id}` : 'http://localhost:3000/products';
        try {
            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
            });
            if(res.ok) {
                alert(`Producto ${id ? 'actualizado' : 'creado'} exitosamente!`);
                getProducts();
                setEditProduct(null);
            } else {
                const errorData = await res.json();
                alert(`Error: ${errorData.message || 'Ocurrió un error al procesar la solicitud.'}`);
            }
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
        }
    };

    const handleDelete = async (id) => {
        if(window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            await fetch(`http://localhost:3000/products/${id}`, { method: 'DELETE' });
            await getProducts();
        }
    };


    return (
        <div className="flex flex-col gap-3 items-center justify-center">
            <h1 className='text-2xl font-bold font-sans'>Prueba técncia</h1>
            <div className='flex flex-col gap-3 items-center justify-center'>
                <ProductList 
                    products={products}
                    onEdit={prepareEdit}
                    onDelete={handleDelete}
                />
                <ProductForm 
                    editProduct={editProduct}
                    setEditProduct={setEditProduct}
                    onSubmit={handleSave}
                />
            </div>

        </div>
    )
}

export default App;