import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Alert, Button, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // TODO - delete user 
  // note: the delete function should trigger a reload of the customer list to reflect the changes

  useEffect(() => {

    const fetchCustomers = async () => {
      try {
      const response = await axios.get('https://fakestoreapi.com/users');
      setCustomers(response.data);
      } catch (error) {
      setError(error);
      } finally {
      setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) {
    return <Container><Alert variant='info'>Loading...</Alert></Container>;
  }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <Container>

      { error && <Alert variant='danger'>Error: {error.message}</Alert> }
      {/* { loading && <Alert variant='info'>Loading...</Alert> } */}

      <h1>Customer List</h1>

      <ListGroup>
        {customers.map(customer => (
          <ListGroup.Item key={customer.id} className='d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded'>

            {/* TODO - add edit customer route to app.jsx */}
            <Link to={`/edit-customers/${customer.id}`} >{customer.name.firstname} {customer.name.lastname}</Link>

            {/* TODO - replace onclick function with delete function */}
            <Button variant='outline-danger' size='sm'
              onClick={() => {alert(`Delete customer ${customer.id}`)}}
            >Delete</Button>

          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            {customer.name.firstname} {customer.name.lastname}
          </li>
        ))}
      </ul> */}
    </Container>
  );
};

export default CustomerList;