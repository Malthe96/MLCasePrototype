import os
import json

from os import path


def jsonDataExists(labelName, amountOfPictures, jsonData, image):

    person = {
        labelName: {
            "bestScore": "",
            "recentScore": "",
            "dataSet": amountOfPictures,
            "img": image
        }
    }

    jsonData.update(person)
    return jsonData


def updateDataSize(userName, labelName, imageSRC):
    jsonData = {}

    jsonDataPath = "models/" + userName + "/jsonData.txt"

    amountOfPictures = 0

    # Count amount of picture data.
    for base, dirs, files in os.walk("images/" + userName + "/" + labelName):
        for Files in files:
            amountOfPictures += 1

    # Check if there is existing Json Data.
    if not path.exists(jsonDataPath):
        return jsonDataExists(labelName, amountOfPictures, jsonData, imageSRC)
    else:
        data = open(jsonDataPath, "r")
        jsonData = json.load(data)
        data.close()

        # Check if person exists.
        if (jsonData.get(labelName) is None):
            return jsonDataExists(labelName, amountOfPictures, jsonData, imageSRC)
        else:
            newJsonData = {}
            for key in jsonData:
                if key == labelName:
                    personData = jsonData[key]
                    person = {
                        key: {
                            "bestScore": personData["bestScore"],
                            "recentScore": personData["recentScore"],
                            "dataSet": amountOfPictures,
                            "img": imageSRC
                        }
                    }
                    newJsonData.update(person)
                else:
                    personData = jsonData[key]
                    person = {
                        key: {
                            "bestScore": personData["bestScore"],
                            "recentScore": personData["recentScore"],
                            "dataSet": personData["dataSet"],
                            "image": personData["image"]
                        }
                    }
                    newJsonData.update(person)

            return newJsonData


def updateEval(userName, personArray, accuracyArray):
    jsonDataPath = "models/" + userName + "/jsonData.txt"
    jsonData = {}
    # Check if there is existing Json Data.
    if not path.exists(jsonDataPath):
        return None
    # TODO fix det her
    data = open(jsonDataPath, "r")
    jsonData = json.load(data)
    data.close()
    newJsonData = {}
    for key in jsonData:
        personData = jsonData[key]
        for arrayKey, value in personArray.items():
            if value == key:
                person = {
                    personArray[arrayKey]: {
                        "bestScore": personData["bestScore"],
                        "recentScore": personData["recentScore"],
                        "dataSet": personData["dataSet"],
                        "img": personData["img"],
                    }
                }
        if key == labelName:
            
            person = {
                key: {
                    "bestScore": personData["bestScore"],
                    "recentScore": personData["recentScore"],
                    "dataSet": amountOfPictures,
                    "img": imageSRC
                }
            }
            newJsonData.update(person)
        else:
            personData = jsonData[key]
            person = {
                key: {
                    "bestScore": personData["bestScore"],
                    "recentScore": personData["recentScore"],
                     "dataSet": personData["dataSet"],
                     "image": personData["image"]
                }
            }
            newJsonData.update(person)
    return newJsonData
