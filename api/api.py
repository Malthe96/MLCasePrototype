import os
import base64
from flask import Flask
from flask import flash, request, redirect, url_for, session, jsonify
from flask_cors import CORS, cross_origin
from os import path

from tensorflow.keras.preprocessing import image
from trainModelScript import createModel
from evaluateFaces import evalFaces
from jsonCreator import updateDataSize, updateEval
import logging
import json
import time
import threading

app = Flask(__name__)
CORS(app, Supports_credentials=True)


mutex = threading.Semaphore()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('HELLO WORLD')

UPLOAD_FOLDER = './images'
ALLOWED_EXTENSIONS = set(['jpg','jpeg'])
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/requestLabels', methods=['POST', 'GET'])
def getLabels():
    userName = request.data.decode("utf-8")

    # Check if there is a username folder.
    imagePath = "images/" + userName
    if not path.exists(imagePath):
        os.mkdir(imagePath)

    sub_folders = [name for name in os.listdir(imagePath) if os.path.isdir(os.path.join(imagePath, name))]
    jsonStr = json.dumps(sub_folders)
    return jsonStr

@app.route('/stats', methods=['POST', 'GET'])
def sendStats():
    userName = request.data.decode("utf-8")
    jsonDataPath = "models/" + userName + "/jsonData.txt"
    if path.exists(jsonDataPath):
        data = open(jsonDataPath, "r")
        jsonData = json.load(data)
        data.close()
        return jsonData
    else:
        return "noData"


@app.route('/eval_pictures', methods=['POST', 'GET'])
def createEvaluation():
    data = request.get_json(force=True)

    if data is None:
        print("No valid request body, json missing!")
        return jsonify({'error': 'No valid request body, json missing!'})

    # TODO Check if a group directory does not exist!

    userName = data["userName"]
    userDirectory = "models/" + userName
    imageTaken = data["groupPicture"]
    imagesDirectory = "images/" + userName
    # Detect faces in the picture, and save the individual faces.
    jsonData, personArray, accuracyArray = evalFaces(userDirectory, imageTaken, imagesDirectory, userName)
    jsonStats = updateEval(userName, personArray, accuracyArray)
    if not (jsonStats == None):
        with open("models/" + userName + "/jsonData.txt", "w") as write_file:
            json.dump(jsonStats, write_file)
    return jsonify(jsonData)


@app.route('/train_model', methods=['POST', 'GET'])
def trainModel():
    # Retrieve username from request.
    userName = request.data.decode("utf-8")

    # Check if there is a username folder.
    imagePath = "images/" + userName
    if not path.exists(imagePath):
        os.mkdir(imagePath)
    
    # Check if the username folder is populated with images.
    amountOfFiles = os.listdir(imagePath)
    if len(amountOfFiles) == 0:
        return "no_data"

    # Check if a model folder exists for the user.
    modelsPath = "models/" + userName
    if not path.exists(modelsPath):
        os.mkdir(modelsPath)

    # createModel(givenBatchSize, givenEpoch, modeldir, trainingDir):
    createModel(16,20,modelsPath + "/" + userName + "Model.h5",imagePath + "/")

    return "ok"

@app.route('/upload', methods=['POST', 'GET'])
def fileUpload():
    data = request.get_json(force=True)
    usernamePath = ""
    userName = ""
    labelName = ""
    imageStatSRC = ""

    print("data: ", request)
    if data is None:
        print("No valid request body, json missing!")
        return jsonify({'error': 'No valid request body, json missing!'})
    else:
        labelPath = ""
        for key in data:
            if (key == "userName"):
                userName = data[key]
                usernamePath = "images/" + str(data[key])
                if path.exists(usernamePath):
                    continue
                else:
                    os.mkdir(usernamePath)
                    continue
            if (key == "labelName"):
                labelName = data[key]
                labelPath = usernamePath + "/" + str(data[key])
                if path.exists(labelPath):
                    continue
                else:
                    os.mkdir(labelPath)
                    continue
            imageStatSRC = data[key]
            convert_and_save(labelPath, imageStatSRC, key)
        
        jsonData = updateDataSize(userName, labelName, imageStatSRC)
        with open("models/" + userName + "/jsonData.txt", "w") as write_file:
            json.dump(jsonData, write_file)
        return "ok"

def convert_and_save(labelPath,b64_string, fileName):
    with open(labelPath + "/" + fileName + ".jpg", "wb") as fh:
        fh.write(base64.decodebytes(b64_string.encode()))


if __name__ == "__main__":
    print("activating server!")
    app.secret_key = os.urandom(24)
    #app.run(debug=True,host="0.0.0.0",use_reloader=False)
    app.run(host="0.0.0.0", port="8080")


