import React from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

function App() {
    return (
        <div className="flex flex-col">
            <h1>Prueba técncia</h1>
            <div>
                <ProductForm />
                <ProductList />
            </div>

        </div>
    )
}

export default App;