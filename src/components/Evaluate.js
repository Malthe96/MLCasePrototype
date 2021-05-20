import React, { useRef, useState, useEffect } from 'react'
import { Card, Container, Button, Form, Row, Col, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap'
import Webcam from "react-webcam"
import { useAuth } from '../contexts/AuthContext'
var imageCapturedFromWebcam
var images;
var predictions;

export default function Evaluate() {

    const webcamRef = useRef(null);
    const [timerShouldNotBeDisplayed, setShouldBeDisplayed] = useState(true);
    const [timerDisplay, setTimerDisplay] = useState("30");
    const [imageHasBeenTaken, setImageHasBeenTaken] = useState(true);
    const [uploadfil, setUploadData] = useState([]);
    const [uploadInProgress, setUploadInProgress] = useState(false);
    const [imageSRC, setImageSRC] = useState("");

    const { currentUser } = useAuth();
    
    const capture = React.useCallback(

        () => {
            // Get timer input.
            var amountOfSeconds = document.getElementById('timerInput').value

            // Set the initial timer display correctly.
            setTimerDisplay(amountOfSeconds)

            // Amount of iterations = amountOfSeconds as int.
            var maxIterations = parseInt(amountOfSeconds);
            var currentIterations = 0;

            // Change the button color to red while recording.
            document.getElementById('recordingButton').style.background = '#AB0000'

            // Display timer
            setShouldBeDisplayed(false);
            function captureImages() {
                setTimeout(function () {

                    
                    currentIterations++;
                    setTimerDisplay(maxIterations - currentIterations)
                    
                    // Call recursively if we have not waited long enough.
                    if (currentIterations < maxIterations) {
                        captureImages()
                    } else {
                        // Take Image
                        const imageSrc = webcamRef.current.getScreenshot();

                        // Remove timer
                        setShouldBeDisplayed(true);

                        // Change the button color back to blue.
                        document.getElementById('recordingButton').style.background = '#007bff'

                        // Display the image instead of the webcam.
                        displayTakenImage(imageSrc)
                    }
    
                }, 1000)
            }
            captureImages();
        }
    )

    function displayTakenImage(image) {
        imageCapturedFromWebcam = image;
        
        // Get the image display and set the image source.
        setImageSRC(image);

        // Display the image instead of the webcam.
        setImageHasBeenTaken(false);
    }

    function uploadImageToServerAndAwaitReply() {
        setUploadInProgress(true);
        var image = imageCapturedFromWebcam;
        var xhr = new XMLHttpRequest();
        var url = "https://dubious.invok.in/eval_pictures"

        xhr.open("POST", url, true);

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // Do something with the returning image data.
                var jsonData = JSON.parse(this.responseText);

                images = []
                predictions = []

                Object.keys(jsonData).forEach(function(key) {
                    if (key === "groupPicture") {
                        setImageSRC("data:image/png;base64," + jsonData[key]);
                    }
                    if (key.includes("prediction")) {
                        predictions.push(jsonData[key])
                    }
                    if (key.includes("image")) {
                        console.log("found image: " + jsonData[key])
                        images.push("data:image/png;base64," + jsonData[key])
                    }
                });

                setUploadData(images);
                setUploadInProgress(false);
            }
        };

        var jsonData = {};

        jsonData["userName"] = currentUser.displayName;
        jsonData["groupPicture"] = stripImageData(image)
        var data = JSON.stringify(jsonData);
        xhr.send(data)
    }

    function stripImageData(imageString) {
        var image = imageString;
        var block = image.split(";");
        var contentType = block[0].split(":")[1];
        var realData = block[1].split(",")[1];
        return realData;
    }

    function retakePictures() {
        setImageHasBeenTaken(true)
        setUploadData([])
    }

    return (
        <div className="d-flex align-items-center justify-content-center">
            <Card className="d-flex align-items-center justify-content-center" style={{marginTop: "15px", maxWidth: "1280px"}}>
                        <div className="mt-4 mb-1">
                            <figure hidden={!imageHasBeenTaken} className="position-relative">
                                <Webcam
                                audio={false}
                                height={720}
                                width={1280}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                ></Webcam>
                                <figcaption hidden={timerShouldNotBeDisplayed} id="timerDisplay" style={{position: "absolute", bottom: "2rem", margin: "0 28rem", marginBottom: "5rem", color: "white", fontSize: "350px", opacity: "45%"}}>
                                    {timerDisplay}
                                </figcaption>
                            </figure>
                            <img hidden={imageHasBeenTaken} src={imageSRC} style={{width: "960px", height: "720px", margin: "0 150px"}}></img>
                        </div>
                        <Container  className="d-flex align-items-center justify-content-center mb-2">
                            <Row hidden={!imageHasBeenTaken}>
                                <Col xs={30}>
                                    <Button id="recordingButton" disabled={!timerShouldNotBeDisplayed} onClick={capture} style={{width: "300px", height: "48px"}}>Take Picture</Button>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <OverlayTrigger placement="right" overlay={
                                            <Tooltip>
                                                The amount of seconds before a picture is taken.
                                            </Tooltip>
                                        }>
                                            <Form.Control id="timerInput" defaultValue="30" type="text" size="lg" style={{width: "55px"}} ></Form.Control>
                                        </OverlayTrigger>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Spinner animation="border" variant="success" className="mr-3" hidden={!uploadInProgress}></Spinner>
                            <Button id="uploadButton" hidden={imageHasBeenTaken} disabled={uploadInProgress} variant="success" onClick={() => uploadImageToServerAndAwaitReply()} style={{width: "300px", height: "48px"}}>Evaluate</Button>
                            <div>
                                <Button  hidden={imageHasBeenTaken} onClick={() => retakePictures()} variant="link">Retake Picture</Button>
                            </div>
                        </Container>
                        <Container className="mb-2" id="facePictures">
                            <Row>
                                {uploadfil.map((item, i) => 
                                <Col>
                                    <Card style={{width: "400px"}}>
                                        <Row>
                                            <Col>
                                                <img src={images[i]} width="100px" height="100px" alt="Prediction image"></img>
                                            </Col>
                                            <Col xs={8} className="d-flex align-items-center justify-content-center">
                                                <h4>{predictions[i]}</h4>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>)}
                            </Row>
                        </Container>
            </Card>
        </div>
    )
}
