from itertools import Predicate
from numpy.lib.type_check import imag
from modelPrediction import modelPredict
from faceDetection import detectFaces
from os import path
import os
import base64
import shutil

'''
    File name: evaluateFaces.py
    Author: Sindri Arngrimsson
    Date created: 12/05/2021
    Date last modified: 12/05/2021
    Python Version: 3
'''

def evalFaces(modelDirectory, groupPicture, imagesDirectory, userName):
    groupDirectory = modelDirectory + "/faceDetection"
    # Check if the overall directory exists
    if not path.exists(groupDirectory):
        os.mkdir(groupDirectory)
    else:
        try:
            shutil.rmtree(groupDirectory)
            os.mkdir(groupDirectory)
        except OSError as e:
            print(e)
    
    # Check if the cropped images directory exists.
    croppedImagesDirectory = groupDirectory + "/croppedImages"
    if not path.exists(croppedImagesDirectory):
        os.mkdir(croppedImagesDirectory)

    # TODO Delete files from the directory if it exists.

    # Save taken group picture from website.
    imageLocation = groupDirectory + "/groupPictureWebsite.jpg"
    with open(imageLocation, "wb") as fh:
        fh.write(base64.decodebytes(groupPicture.encode()))
    
    groupPictureFormat = groupDirectory + "/group_picture_plot.png"
    # detectFaces method takes image from a directory and saves all the cropped images in another directory
    # Parameters:
    # 1- Image dir you want to detect face
    # 2- Dir you want to save cropped images
    # 3- dir you want to save the full images with boxes on faces
    detectFaces(imageLocation, croppedImagesDirectory + "/groupDetection.png",  groupPictureFormat)
    
    # Set image directory for which you want to predt and path to model
    modelPath = modelDirectory + "/" + userName + "Model.h5"

    # Below finds full path of every image in the image directory and runs a prediction and creates a dictionary with the image path and prediction
    jsonData = {}
    counter = 0
    personNameList = []
    accuracyList = []
    # Search directory for file path to use in prediction
    for file in os.listdir(croppedImagesDirectory):
        fullpath = os.path.join(croppedImagesDirectory, file)
        if os.path.isfile(fullpath):
            personName, perAccuracy = modelPredict(modelPath, fullpath, imagesDirectory)
            personNameList.append(personName)
            accuracyList.append(perAccuracy)
            predictData = personName + ": Accuracy " + perAccuracy + "%"
            with open(fullpath, "rb") as image_file:
                base64Image = base64.b64encode(image_file.read())
            base64_message = base64Image.decode('ascii')
            jsonData.update({'image' + str(counter): base64_message, 'prediction' + str(counter): predictData})
            counter += 1
    
    # Include the group picture in the jsonData.
    groupPicturePath = groupDirectory + "/group_picture_plot.png"
    with open(groupPicturePath, "rb") as group_picture:
        base64GroupPicture = base64.b64encode(group_picture.read())
    decodedGroupPicture = base64GroupPicture.decode('ascii')

    jsonData.update({'groupPicture': decodedGroupPicture})

    return jsonData, personNameList, accuracyList