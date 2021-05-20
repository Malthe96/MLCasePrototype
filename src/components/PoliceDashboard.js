import React, { useState } from 'react'
import { Container, Card, Row, Col, Button, Alert } from 'react-bootstrap'
import regonizeFaceIcon from '../images/regonize_faces.png'
import trainIcon from '../images/train_icon.png'
import takePictureIcon from '../images/take_picture_icon.png'
import { useHistory } from "react-router-dom"
import { useAuth } from '../contexts/AuthContext'



export default function PoliceDashboard() {
    const history = useHistory();
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    return (
        <div>
            <Container>
                {error && <Alert variant="danger">{error}</Alert>}
            </Container>
            <Container className="mt-3" style={{maxWidth: "1300px"}}>
                <h2>Police Surveillance</h2>
                <p>
                    The Copenhagen Police Department has listed a project, where they want to use facial recognition in surveillance cameras in public spaces. They want to identify criminals who move about in these public spaces. The police want to get notified when a criminal enters a certain camera district.
                </p>
                <Card></Card>
            </Container>
            <Container className="mt-5 d-flex align-items-center justify-content-center" style={{maxWidth: "1920px"}}>
                    <Row style={{textAlign: "center"}}>
                        <Col>
                            <img onClick={() => history.push("/capture")} style={{cursor: 'pointer'}} src={takePictureIcon} width="390" height="391"></img>
                            <h1 onClick={() => history.push("/capture")} style={{cursor: 'pointer'}} className="mt-4">Upload Data</h1>

                        </Col>
                        <Col>
                            <img onClick={() => history.push("/review")} style={{cursor: 'pointer'}} src={trainIcon} width="390" height="391"></img>
                            <h1 onClick={() => history.push("/review")} style={{cursor: 'pointer'}} className="mt-4">Review Model</h1>
                        </Col>
                        <Col>
                            <img onClick={() => history.push("/evaluate")} style={{cursor: 'pointer'}} src={regonizeFaceIcon} width="390" height="391"></img>
                            <h1 onClick={() => history.push("/evaluate")} style={{cursor: 'pointer'}} className="mt-4">Test Model</h1>
                        </Col>
                    </Row>
            </Container>
            <Container>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>Log Out</Button>
            </div> 
            </Container>
        </div>
    )

    async function handleLogout() {
        setError('');
        try {
          await logout();
          history.pushState('/login')
        } catch {
          setError('Failed to log out.')
        }
      }
}
