import { useState } from 'react'
import axios from 'axios'
import { Alert, Button, Container, Form, Modal } from 'react-bootstrap'

const CustomerForm = () => {

  // Customer Variables
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [modalName, setModalName] = useState('')

  // Form State Variables
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  // API error 
  const [error, setError] = useState(null)

  // Form validate errors 
  const [errors, setErrors] = useState(null)
  // const [errors, setErrors] = useState({
  //   "name": '',
  //   "email": '',
  //   "password": ''
  // })


  const handleSubmit = async (e) => {
    e.preventDefault(); 

    // Validate the form 
    const errors = validateForm()
    if (Object.keys(errors).length > 0){
      setErrors(errors)
      return
    }

    // Begin the loading process
    setIsLoading(true)
    setError(null)

    const user = {name, email, password}
    console.log(user)

    try {
      const response = await axios.post("https://fakestoreapi.com/users", user, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = response.data;
      console.log("User Created:", data)

      // Trigger popup with success message (modal)
      setShowSuccessModal(true)
      setModalName(name)

      // Reset the form 
      setName('')
      setEmail('')
      setPassword('')

    } catch (error) {
	    console.log("Error", error)
	    setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const validateForm = () => {
    const errors = {}
    // const errors = {
    //   "name": '',
    //   "email": '',
    //   "password": ''
    // }
    if (!name) errors.name = "Name is required"
    if (!email) errors.email = "Email is required"
    if (!password) errors.password = "Password is required"
    return errors 
  }

  return (
    <Container>

      { isLoading && <Alert variant='info'>Submitting customer data...</Alert> }
      { error && <Alert variant='danger'>Error: {error}</Alert> }

      <Form onSubmit={handleSubmit}>

        {/* Name section */}
        <Form.Group controlId='formGroupName'>
          {/* Replace label, input with Form.Label and Form.Control */}
          <Form.Label>Name:</Form.Label>
          <Form.Control type='text' value={name} onChange={(e) => setName(e.target.value) }/>
          { errors?.name && <Alert variant='danger'>{errors.name}</Alert> }
        </Form.Group>

        <br />

        {/* Email section */}
        <Form.Group controlId='formGroupEmail'>
          <Form.Label>Email:</Form.Label>
          <Form.Control type='email' value={email} onChange={(e) => setEmail(e.target.value) }/>
          { errors?.email && <Alert>Email is required</Alert> }
        </Form.Group>

        <br />

        {/* Password section */}
        <Form.Group controlId='formGroupPassword'>
          <Form.Label>Password:</Form.Label>
          <Form.Control type='password' value={password} onChange={(e) => setPassword(e.target.value) }/>
          { errors?.password && <Alert>Password is required</Alert> }
        </Form.Group>

        <br />

        <Button type='submit' disabled={isLoading}>
          { isLoading ? 'Creating User...' : 'Create User' }
        </Button>
      </Form>

       {/* Modal */}
       <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{modalName} created successfully!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='danger' onClick={() => setShowSuccessModal(false)}>Close</Button>
          </Modal.Footer>
       </Modal>

    </Container>
  )
}

export default CustomerForm