import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';

const App = () => {
  return (
    <div>

    <NavigationBar/>
      
    <Routes>
      <Route path="/" element={<p>Home</p>} />
      <Route path='/customers' element={<CustomerList/>} />
      <Route path='/add-customers' element={<CustomerForm/>} />
      
    </Routes>

    </div>
  )
}

export default App