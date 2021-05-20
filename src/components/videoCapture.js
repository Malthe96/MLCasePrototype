import React from 'react'
import ReactDOM from 'react-dom';
import Webcam from "react-webcam"

const videoCapture = () => {




  
    return (
        <div>
            <div id="root"></div>
        </div>
    )
}
//s
(function () {
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user",
        audio: false
    };

    var imgArray = [];

    ReactDOM.render(
        <Webcam
            videoConstraints={videoConstraints}
            width={1280}
            height={720}
        />,
        document.getElementById('root')
    )

    const WebcamCapture = () => {
        const webcamRef = React.useRef(null);
        const [imgSrc, setImgSrc] = React.useState(null);
      
        const capture = React.useCallback(() => {
            // Reset the image arary, upon new capture.
            imgArray = [];
            
            // Reset the display of pictures if any have been taken.
            document.getElementById('imageCaptures').innerHTML = "";

            // Take 30 pictures with a small time interval.
            var iteration = 0;

            function ImageCaptureLoop() {
                setTimeout(function () {
                    const imageSrc = webcamRef.current.getScreenshot();
                    setImgSrc(imageSrc);
                    imgArray.push(imageSrc);
                    console.log(imgArray);
                    var element = document.createElement("img");
                    element.setAttribute("src", imageSrc);
                    element.setAttribute("alt", "captured image from recording");
                    element.setAttribute("height", "150");
                    element.setAttribute("width", "200");
                    document.getElementById('imageCaptures').append(element);

                    // Check if we have reached the limit, if not take one more.
                    iteration++;
                    if (iteration < 30) {
                        ImageCaptureLoop();
                    }
                }, 20)
            }

            ImageCaptureLoop();

        }, [webcamRef, setImgSrc]);
      
        return (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />
            <button onClick={capture}>Record data</button>
            <div id="imageCaptures"></div>
            {imgSrc && (
              <img
                src={""}
                alt="   "
              />
            )}
          </>
        );
      };
      
      ReactDOM.render(<WebcamCapture />, document.getElementById("root"));
})()

export default videoCapture