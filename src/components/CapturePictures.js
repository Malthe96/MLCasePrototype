import React, { useState, useEffect } from 'react'
import Webcam from "react-webcam"
import { useAuth } from '../contexts/AuthContext'
import { Container, Button, Card, InputGroup, DropdownButton, Dropdown, FormControl, Alert, Spinner, Form, OverlayTrigger, Tooltip } from 'react-bootstrap'
var imgArray = [];

const CapturePictures = () => {
    const webcamRef = React.useRef(null);
    const [recording, setRecording] = useState(false);
    const [uploadIsNotAllowed, setUploadIsNotAllowed] = useState(true);
    const [showError, setShowError] = useState(true);
    const [dropdown, setDropdown] = useState([]);
    const [uploadSucess, setUploadSucess] = useState(true);
    const [uploadIsInProgress, setUploadInProgress] = useState(false);
    const [timerDisplay, setTimerDisplay] = useState("");
    const { currentUser } = useAuth();

    useEffect(()=>{
        requestExistingLabels()
    },[]);

    const capture = React.useCallback(
        () => {
            setUploadSucess(true)
            indicateRecording(true)
            // Reset the image array.
            imgArray = [];
            
            // Reset the div containing all taken images.
            document.getElementById('capturedImages').innerHTML = "";

            // iteration counter for the loop.
            var iterations = 0;
            var amountOfTime = parseInt(document.getElementById('pictureInput').value)

            // Function that takes 30 pictures and saves them into imgArray.
            
            setTimeout(function () {
                captureImages();
                function captureImages() {
                    const imageSrc = webcamRef.current.getScreenshot();

                    imgArray.push(imageSrc);

                    // Create image for the div container.
                    var imageCaptured = document.createElement("img");
                    imageCaptured.setAttribute("src", imageSrc);
                    imageCaptured.setAttribute("alt", "Picture taken, number " + imgArray.length + 1);
                    imageCaptured.setAttribute("height", "150");
                    imageCaptured.setAttribute("width", "200");
                    document.getElementById('capturedImages').append(imageCaptured);
    
                    iterations++;
                    // Check if we have reached the iteration limit, if not recursive call.
                    if (iterations < 2) {
                    } else {
                        indicateRecording(false);
                        if (imgArray.length > 0) {
                            setUploadIsNotAllowed(false)
                        }
                    } 
                }
                setTimeout(function () {
                    captureImages()
                }, 1000)
            }, (amountOfTime * 1000) - 1000)
            
            var currentIterations = 0
            var maxIterations = amountOfTime
            var timeLeft = amountOfTime - 1
            
            function updateTimerDisplay() {
                setTimeout(function () {
                    setTimerDisplay('' + (timeLeft - currentIterations))
                    currentIterations++
                    if (currentIterations != amountOfTime) {
                        updateTimerDisplay()
                    } else {
                        setTimerDisplay("")
                    }
                }, 1000)
            } 

            updateTimerDisplay()
            
        },
        [webcamRef]
    );


function requestExistingLabels() {
    var xml = new XMLHttpRequest();
    var url = "https://dubious.invok.in/requestLabels";

    xml.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var existingLabels = JSON.parse(this.responseText);
            updateExistingLabelButton(existingLabels)
        }
    }

    xml.open("POST", url, true);
    xml.send(currentUser.displayName);
}

function updateExistingLabelButton(jsonArray) {
    setDropdown(jsonArray);
}

function addOnClickToId(item) {
    document.getElementById('input-group-dropdown-1').getElementsByClassName(item).onClick = changeFormText(item);
}

function changeFormText(item) {
    console.log('test' + item)
    var splitString = item.split("-");
    var formNameText = splitString[0].replace(' ', '');
    var formLabelText = splitString[1].replace(' ', '');

    document.getElementById('nameForm').value = formNameText;
    document.getElementById('labelForm').value = formLabelText;
}

function indicateRecording(isRecording) {
    const recordingButton = document.getElementById('buttonRecording')
    if (isRecording === true) {
        setRecording(true);
        recordingButton.style.background = '#AB0000'
    } else {
        setRecording(false);
        recordingButton.style.background = "#007bff"
    }
}

function uploadImages(ev) {
    var nameFormValue = document.getElementById('nameForm').value
    var labelFormValue = document.getElementById('labelForm').value

    if (nameFormValue !== "" && labelFormValue !== "") {
        setUploadInProgress(true);
        var xhr = new XMLHttpRequest();
        var url = "https://dubious.invok.in/upload";
        xhr.open("POST", url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = xhr.responseText;
                if (response === "ok") {
                    setUploadSucess(false);
                }
                setUploadInProgress(false);
            }
        }
    
        var jsonData = {};
    
        jsonData["userName"] = currentUser.displayName;
        
        // Create input string and append it to the json object.
        var nameAndLabel = nameFormValue + " - " + labelFormValue;
        jsonData["labelName"] = nameAndLabel;

        imgArray.forEach(function(value, index) {
            let randomName = Math.random().toString(36).substring(7);
            jsonData["img_" + index + "_" + randomName] = stripImageData(value);
        })
    
        var data = JSON.stringify(jsonData);
        xhr.send(data);
    } else {
        setShowError(false);
    }
}

function resetUploadStatus() {
    document.getElementById('capturedImages').innerHTML = ""
    setUploadIsNotAllowed(true);
}

function stripImageData(imageString) {
    var image = imageString;
    var block = image.split(";");
    var contentType = block[0].split(":")[1];
    var realData = block[1].split(",")[1];
    return realData;
}
    
    return (
        <div>
            <Container className="mt-2">
                <Alert variant="danger" hidden={showError} onClose={() => setShowError(true)} dismissible>
                    <Alert.Heading>Enter a name and label!</Alert.Heading>
                    <p>
                        Remember to enter a name and label. The name should reflect an individuals name,
                        and the label should reflect whether a person is a criminal or not.
                    </p>
                </Alert>
                <Alert variant="success" hidden={uploadSucess}>Upload was sucessful! You can now train the model with the new data set.</Alert>
            </Container>
            <Container className="mt-3">
                <InputGroup>
                    <DropdownButton
                    as={InputGroup.Prepend}
                    title="Existing Label"
                    id="input-group-dropdown-1"
                    >
                        {dropdown.map((item,i) => <Dropdown.Item key={i} onClick={() => addOnClickToId(item)} id={item}>{item}</Dropdown.Item>)}
                    </DropdownButton>
                    <FormControl id="nameForm" placeholder="Name of person" />
                    <FormControl id="labelForm" placeholder="Label: Criminal or Citizen"/>
                </InputGroup>
            </Container>
            <Card style={{marginLeft: "15px", marginRight: "15px", marginTop: "15px"}}>
                <div  className="mb-4" style={{display: "flex", justifyContent: "center", marginTop: "10px" }}>
                    <div style={{height: "720px", width: "430px", display: "flex", flexWrap: "wrap", gap: "5px", overflow: "auto"}} id="capturedImages">
                        </div>
                        <div>
                            <figure className="position-relative">
                                <Webcam
                                audio={false}
                                height={720}
                                width={1280}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                ></Webcam>
                                <figcaption id="timerDisplay" style={{position: "absolute", bottom: "2rem", margin: "0 28rem", marginBottom: "5rem", color: "white", fontSize: "350px", opacity: "45%"}}>
                                    {timerDisplay}
                                </figcaption>
                            </figure>
                        </div>
                </div>
            </Card>
            <Container className="d-flex align-items-center justify-content-center" style={{marginTop: "10px"}}>
                <Button id="buttonRecording" hidden={!uploadIsNotAllowed} disabled={recording} onClick={capture} className="w-100" style={{maxWidth: "300px", height: "50px"}}>Record</Button>
                <Form.Group hidden={!uploadIsNotAllowed}>
                    <OverlayTrigger placement="right" overlay={
                        <Tooltip>
                            The amount of seconds before 2 pictures are taken.
                        </Tooltip>
                    }>
                    <Form.Control id="pictureInput" defaultValue="15" type="text" size="lg" style={{width: "70px"}} className="mt-3 ml-2"></Form.Control>
                    </OverlayTrigger>
                </Form.Group>
                <Spinner animation="border" className="mr-3" hidden={!uploadIsInProgress} variant="success" />
                <Button id="uploadButton" variant="success" hidden={uploadIsNotAllowed} disabled={uploadIsInProgress} onClick={uploadImages} className="w-100" style={{maxWidth: "300px", height: "50px"}}>Upload Images</Button>
            </Container>
            <Container className="d-flex align-items-center justify-content-center">
                <Button disabled={uploadIsNotAllowed} variant="link" onClick={resetUploadStatus}>Retake Pictures</Button>
            </Container>
        </div>
    )
}

// <button onClick={capture}>Record Images</button>
// <button onClick={uploadImages}>Upload Data</button>
// <Button className="w-100" onClick={capture}>Record</Button>

// TODO: Redirect efter at man har uploadet et billede til main menu / næste step.
export default CapturePictures
