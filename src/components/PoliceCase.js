import React from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import vertical_steps from '../images/machine_learning_steps_vertical.png'
import { useHistory } from "react-router-dom"

export default function PoliceCase() {
    const history = useHistory();

    function continueButton() {
        history.push("/police");
    }

    return (
        <div>
            <Container className="mt-5">
                <Card>
                    <Row>
                        <Col className="mt-2" xs={4}>
                            <img src={vertical_steps}></img>
                        </Col>
                        <Col className="mt-5"> 
                            <h2>Police Surveillance</h2>
                            <p>The Copenhagen Police Department has listed a project, where they want to use facial recognition in surveillance cameras in public spaces. They want to identify criminals who move about in these public spaces.</p>
                            <p>The police want to get notified when a criminal enters a certain camera district. The videos are recorded and saved with the found faces, so the police force can review the videos at a later date.</p>
                            <p>Your task is to develop the model, by using the tools presented in the "Machine Learning Prototype".</p>
                            <p><b>1.</b> Start by capturering images of each individual who should be represented in the model. Label them accordingly.</p>
                            <p><b>2.</b> Review the current dataset, and train the model.</p>
                            <p><b>3.</b> Take a "city scenario" picture, and review the findings of the model.</p>
                            <p>Once you have completed all 3 steps, consider if the model needs further work. Is the predictions correct? How does the predictions change if the people in the evaluation picture move positions/angles? Could you wear different items of apparel to change the outcome of the model?</p>
                        </Col>
                    </Row>
                    <Container className="d-flex align-items-center justify-content-center">
                        <Button onClick={continueButton} className="w-100 mb-3" style={{maxWidth: "300px", height: "50px"}}>Continue</Button>
                    </Container>
                </Card>
            </Container>
        </div>
    )
}
