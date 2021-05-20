import React from 'react'
import { Container, Card, Row, Col, Button } from 'react-bootstrap'
import { useHistory } from "react-router-dom"
import surveillance_case from '../images/surveillance_case.png'
import blind_case from '../images/blind_case.png'
import bank_case from '../images/bank_case.png'
import mri_case from '../images/mri_case.png'
import insta_case from '../images/instagram_case.png'
import illegal_fishing from '../images/illegal_fishing.png'

export default function CaseOverview() {
    const history = useHistory();
    return (
        <div>
            <Container className="d-flex align-items-center justify-content-center" style={{maxWidth: "1920px", marginTop: "15px"}}>
                <Row>
                    <Col>
                        <Card className="d-flex align-items-center justify-content-center" style={{height: "650px"}}>
                            <img src={surveillance_case} alt="An illustration depicting surveillance cameras." height="245" width="466"></img>
                            <Container className="justify-content-left">
                                <h2 className="mt-3">Police surveillance</h2>
                            </Container>
                            <p className="ml-3 mr-3">
                            The Copenhagen Police Department has listed a project, where they want to use facial recognition in surveillance cameras in public spaces. They want to identify criminals who move about in these public spaces. The police want to get notified when a criminal enters a certain camera district.
                            </p>
                            <p className="ml-3 mr-3">
                            The videos are recorded and saved with the found faces, so the police force can review the videos at a later date. Additionally, the model should be able to recognize criminals even if they are wearing different types of clothing, such as glasses, scarfs or different types of hats.
                            </p>
                            <Button onClick={() => history.push("/police_case")} className="w-100 mb-3" style={{maxWidth: "300px", height: "50px"}}>Continue</Button>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="d-flex align-items-center justify-content-center" style={{height: "650px"}}>
                            <img src={blind_case} alt="An illustration depicting a blind man." height="245" width="466"></img>
                            <Container className="justify-content-left">
                                <h2 className="mt-3">Guiding the blind</h2>
                            </Container>
                            <p className="ml-3 mr-3">
                            A Company would like to develop a new system to assist visually impaired people in their everyday lives. The company wants to use machine learning, more specifically image and text detection/recognition to help users identify objects.
                            </p>
                            <p className="ml-3 mr-3">
                            Your task is to select an objective which blind people face in their daily lives and build a dataset. Furthermore you will be required to train a machine learning model sufficiently enough for it to be able to recognize the items that will solve your chosen issue
                            </p>
                            <Button className="w-100 mb-3" disabled={true} style={{maxWidth: "300px", height: "50px"}}>Continue</Button>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="d-flex align-items-center justify-content-center" style={{height: "650px"}}>
                            <img src={bank_case} alt="An illustration depicting a bank." height="245" width="466"></img>
                            <Container className="justify-content-left">
                                <h2 className="mt-3">Predicting bank loans</h2>
                            </Container>
                            <p className="ml-3 mr-3">
                            A bank wants to develop an internal system which can predict if customers are able to afford a bank loan. The bank wants the system to be as profitable as possible, thus not lending customers who can not pay their loans back. The bank wants you to investigate which parameters solve this issue, and present how the system processes various customer economics with your chosen parameters.
                            </p>
                            <p className="ml-3 mr-3">
                            Furthermore, the bank wants to be informed whether your solution can be used independently without having paid employees re-evaluate the result.
                            </p>
                            <Button className="w-100 mb-3" disabled={true} style={{maxWidth: "300px", height: "50px"}}>Continue</Button>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Container className="d-flex align-items-center justify-content-center" style={{maxWidth: "1920px", marginTop: "15px", marginBlockStart: "15px"}}>
                <Row>
                    <Col>
                        <Card className="d-flex align-items-center justify-content-center" style={{height: "650px"}}>
                            <img src={mri_case} alt="An illustration depecting a CT scan." height="245" width="466"></img>
                            <Container className="justify-content-left">
                                <h2 className="mt-3">Analyzing CT scans with ML</h2>
                            </Container>
                            <p className="ml-3 mr-3">
                            CT-scans can tell alot about what is going on inside our bodies. With this new technology, hospitals are able to detect various symptoms before they get to a stage where they are dangerous.
                            </p>
                            <p className="ml-3 mr-3">
                            A company you work for however acknowledges that CT-scanned images can take many employee-hours of highly educated staff to process. To solve this, the company has asked you to create a machine-learning model, where a computer can predict what symptoms are present on a CT-scan. To do this, the company suggests that you look into supervised Machine-learning, collect a dataset and create a model for which will solve the issue. You need to report which symptoms your model can detect and if it is accurate enough for deployment.
                            </p>
                            <Button className="w-100 mb-3" disabled={true} style={{maxWidth: "300px", height: "50px"}}>Continue</Button>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="d-flex align-items-center justify-content-center" style={{height: "650px"}}>
                            <img src={insta_case} alt="An illustration depicting instagram comments." height="245" width="466"></img>
                            <Container className="justify-content-left">
                                <h2 className="mt-3">Moderating instagram comments</h2>
                            </Container>
                            <p className="ml-3 mr-3">
                            Instagram is looking into incorporating machine learning into their comment section, to automatically moderate the comment section field. The goal is to prevent bot-advertisement and remove comments which are against Instagram's terms of service. This is for example internet bullying and racism. 
                            </p>
                            <p className="ml-3 mr-3">
                            Your task is to resolve the issue and present if there are further complications in the comment section which should be taken care of. To do this, you will have to create a text recognition system, which can detect, remove and save comments which breaks ToS and your chosen parameters. Next,  you will have to present how Instagram should handle users which have been detected with your machine learning algorithm.
                            </p>
                            <Button className="w-100 mb-3" disabled={true} style={{maxWidth: "300px", height: "50px"}}>Continue</Button>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="d-flex align-items-center justify-content-center" style={{height: "650px"}}>
                            <img src={illegal_fishing} height="245" width="466"></img>
                            <Container className="justify-content-left">
                                <h2 className="mt-3">Countering illegal fishing</h2>
                            </Container>
                            <p className="ml-3 mr-3">
                            Google wants to develop a platform, where countries sea administrations can keep an eye on illegal commercial fishing. Google wants to use their satellite imagery and tracking to define where illegal fishing is happening and where the ships are moving to in the water.                            </p>
                            <p className="ml-3 mr-3">
                            Google wants to be able to notify the sea administrations once it has detected illegal fishing in their waters, however they want to make sure they are precise since launching counter expeditions can be very costly.                            </p>
                            <Button className="w-100 mb-3" disabled={true} style={{maxWidth: "300px", height: "50px"}}>Continue</Button>
                        </Card>
                    </Col>
                </Row>
            </Container>
            
        </div>
    )
}
  