import React from 'react'
import { Nav, Navbar, Button } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from "react-router-dom"

export default function Navigationbar() {
    // If the user is not logged in, then return an empty div to hide the navbar.
    const { currentUser } = useAuth();
    const history = useHistory();

    if (currentUser === null) {
        return (
            <div></div>
        )
    }

    return (
        <div>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand onClick={() => history.push("/police")} style={{cursor: 'pointer'}}>MLCT</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link onClick={() => history.push("/")}>Cases</Nav.Link>
                    <Nav.Link onClick={() => history.push("/capture")}>Update Dataset</Nav.Link>
                    <Nav.Link onClick={() => history.push("/review")}>Review Model</Nav.Link>
                    <Nav.Link onClick={() => history.push("/evaluate")}>Evaluate Model</Nav.Link>
                </Nav>
                <Button onClick={() => history.push("/learn_more")} variant="outline-light">Learn More</Button>
            </Navbar>
        </div>
    )
}
