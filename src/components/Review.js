import React, { useState, useEffect } from 'react'
import { Container, Card, Row, Col, Button, Spinner, Alert} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
var recentScores = []
var dataSets = []
var imageSets = []
var personNames = []
export default function Review() {
    const { currentUser } = useAuth();

    // Hidden variables for the user displays.
    const [trainingIsInProgress, setTrainingInProgress] = useState(false);
    const [showTrainingAlert, setTrainingAlert] = useState(false);
    const [uploadfil, setUploadData] = useState([]);
    const [gettingStats, setGettingStats] = useState(false)

    useEffect(()=>{
        requestStats()
    },[]);

    function requestStats() {
        var xhr = new XMLHttpRequest();
        var url = "https://dubious.invok.in/stats"
        xhr.open("POST", url, true)

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = this.responseText;
                if (response == "noData") {
                    // something
                } else {
                    var jsonData = JSON.parse(this.responseText);
                    var bestScores = []
                    recentScores = []
                    dataSets = []
                    imageSets = []

                    Object.keys(jsonData).forEach(function(key) {
                        var person = jsonData[key]
                        personNames.push(key)
                        Object.keys(person).forEach(function(childKey){
                            if (childKey === "bestScore") {
                                bestScores.push(person[childKey])
                            }
                            if (childKey === "recentScore") {
                                recentScores.push(person[childKey])
                            }
                            if (childKey === "dataSet") {
                                dataSets.push(person[childKey])
                            }
                            if (childKey === "img") {
                                imageSets.push("data:image/png;base64," + person[childKey])
                            }
                        })
                    });

                    setUploadData(bestScores)
                    setGettingStats(true);

                }
            }
        };

        xhr.send(currentUser.displayName)
    }

    function insertDataIntoPage(data) {

    }

    function trainModel() {
        setTrainingInProgress(true);
        var xml = new XMLHttpRequest();
        var url = "https://dubious.invok.in/train_model"

        xml.timeout = 300000;

        xml.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var response = this.responseText;
                if (response == "ok") {
                    // Alert success
                } else {
                    // Alert error
                }
                setTrainingInProgress(false);
                setTrainingAlert(true);
            }
        }

        xml.ontimeout = function() {
            console.log("xml has timed out, rip.")
        }

        xml.open("POST", url, true);
        xml.send(currentUser.displayName);
    }


    return (
        <div>
            <Container className="mt-3">
                <Alert variant="success" hidden={!showTrainingAlert} onClose={() => setTrainingAlert(false)} dismissible>
                    <Alert.Heading>Training successfull!</Alert.Heading>
                    <p>
                        Your model has been trained succesfully, you can review the updated dataset below. You
                        can evaluate your model with the new identified dataset.
                    </p>
                </Alert>
            </Container>
            <Container className="mt-5 d-flex align-items-center justify-content-center" style={{maxWidth: "1920px"}}>
                <h2 hidden={gettingStats}>Getting statistics</h2>
                <Spinner className="ml-3" animation="border" variant="primary" hidden={gettingStats} />
            </Container>
            <Container className="mt-5 d-flex align-items-center justify-content-center" style={{maxWidth: "1920px"}}>
                <Row>
                    {uploadfil.map((item,i) => 
                    <Col>
                        <Card className="m-2" style={{width: "700px", height: "255px"}}>
                            <Row>
                                <Col xs={7}>
                                    <img id="img1" src={imageSets[i]} width="340px" height="255px"></img>
                                </Col>
                                <Col>
                                    <h2>{personNames[i]}</h2>
                                    <p>Highest prediction: {item}%</p>
                                    <p>Most recent prediction: {recentScores[i]}%</p>
                                    <p>Data set: {dataSets[i]} Pictures</p>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    )}
                </Row>
            </Container>

            <Container className="d-flex align-items-center justify-content-center" style={{marginTop: "10px"}}>
                <Spinner animation="border" hidden={!trainingIsInProgress} className="mr-3" variant="primary" />
                <Button onClick={trainModel} disabled={trainingIsInProgress} className="w-100" style={{maxWidth: "300px", height: "50px"}}>
                    Train Model
                </Button>
            </Container>
        </div>
    )
}
