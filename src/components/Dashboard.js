import React, { useState } from 'react'
import { Card, Button, Alert, Container, ButtonGroup } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const history = useHistory();

  async function handleLogout() {
    setError('');
    try {
      await logout();
      history.pushState('/login')
    } catch {
      setError('Failed to log out.')
    }
  }

  return (
    <>
    <style type="text/css">
      {`

      
      `}
    </style>
    <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
      <div className="w-100" style={{maxWidth: "1200px"}}> 
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Welcome {currentUser.displayName}</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <div class="text-center">
              <ButtonGroup aria-label="ML Navigation" className="mb-4" style={{minHeight: "40vh", minWidth: "100vh"}}>
                <Button className="mr-2 h-200">Train Model</Button>
                <Button className="mr-2 h-200">Evaluate Model</Button>
                <Button className="mr-2 h-200">View Dataset</Button>
              </ButtonGroup>
            </div>
            <div class="text-center">
            <Link to="/update-profile" className="btn btn-primary w-100 mt-3" style={{maxWidth: "30vh"}}>Edit Profile</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Button variant="link" onClick={handleLogout}>Log Out</Button>
        </div>
      </div>
    </Container>
  </>
  )
}
