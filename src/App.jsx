import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import ProductCatalog from './components/ProductCatalog';
import TrackOrder from './components/TrackOrder';

const App = () => {
  return (
    <div>

    <NavigationBar/>
      
    <Routes>
      <Route path="/" element={<p>Home</p>} />

      {/* ==== customers ==== */}
      {/* List customers */}
      <Route path='/customers' element={<CustomerList/>} />

      {/* add customer */}
      <Route path='/add-customers' element={<CustomerForm/>} />

      {/* Customer Details */}
      {/* TODO - CustomerDetails.jsx */}
      <Route path='/customers/:id' element={<p>Customer Details</p>} />

      {/* Update customer form */}
      {/* TODO - UpdateCustomer.jsx */}
      <Route path='/update-customer/:id' element={<p>Customer Details</p>} />

      {/* ==== PRODUCTS ==== */}
      <Route path='/product-catalog' element={<ProductCatalog/>} />

      {/* TODO - EditProduct.jsx */}
      <Route path='/edit-product' element={<p>Edit Products</p>} />

      {/* ==== ORDERS ==== */}
      <Route path='/track-order-status' element={<TrackOrder/>} />
      
    </Routes>

    </div>
  )
}

export default App