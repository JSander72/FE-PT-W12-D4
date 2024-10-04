import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import axios from 'axios' // Add this import
import { ProgressBar } from 'react-bootstrap'

const TrackOrder = () => {
  const [orderID, setOrderID] = useState('')
  // const [order, setOrder] = useState(null)
  const [order, setOrder] = useState({
    "customer_id": 4,
    "delivery_date": "2024-09-06",
    "id": 4, 
    "order_date": "2024-09-02"
  })
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const [orderStatus, setOrderStatus] = useState({
    "variant": "danger", 
    "message": "In Progress",
    "value": 50
  })


  const trackOrder = async (e) => {
    e.preventDefault(); 

    try {
      setIsLoading(true)

      const response = await axios.get(`http://127.0.0.1:5000/orders/${orderID}`)
      console.log(response)
      setOrder(response.data)

      // Do some calculations about date 
      // We should check if the current date > delivery date (update order status to complete)
        const currentDate = new Date(); 
        const delivery = new Date(response.data.delivery_date)
        const isLate = currentDate > delivery 

        if (isLate) {
          setOrderStatus({
            "variant": "success", 
            "message": "Complete",
            "value": 100
          })
        } else {
          setOrderStatus({
            "variant": "danger", 
            "message": "In Progress",
            "value": 50
          })
        }
      // if it is not - keep the same 

      // Reset the form
      setOrderID('')

    } catch (error){
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container>

      {/* Form to get the ID */}
      <Form onSubmit={trackOrder}>
        <Form.Group controlId='formBasicOrderID'>
          <Form.Label>What order would you like to track?</Form.Label>
          <Form.Control type='number' value={orderID} onChange={(e) => setOrderID(e.target.value)}/>
        </Form.Group>

        <br />

        <Button type="submit">Submit</Button>

      </Form>

      {/* Display data about the order */}
      {/* Track Order Status: Develop a component that enables customers to track the status 
      and progress of their orders. 
      Customers should be able to access information such as order dates and expected 
      delivery dates. */}

      <br />

      <div className='order-details-container'>
        { order && 
          <div>
            <p>{order.delivery_date}</p>
            <p>{order.order_date}</p>

            <h3>Order Status:</h3>
            <p>{orderStatus.message}</p>
            <ProgressBar variant={orderStatus.variant} now={orderStatus.value} />

          </div>
        }
      </div>

    </Container>
  )
}

export default TrackOrder