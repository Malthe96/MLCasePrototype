
import tensorflow.keras
from PIL import Image, ImageOps
import numpy as np
import os
import operator


def modelPredict(modelpath, imagepath, rootdir):
    CATEGORIES = []

    for dir in os.scandir(rootdir):
        folderName = os.path.basename(dir)
        CATEGORIES.append(folderName)

    # Disable scientific notation for clarity
    np.set_printoptions(suppress=True)

    # Load the model
    model = tensorflow.keras.models.load_model(modelpath)

    # Create the array of the right shape to feed into the keras model
    # The 'length' or number of images you can put into the array is
    # determined by the first position in the shape tuple, in this case 1.
    data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)

    # Replace this with the path to your image
    image = Image.open(imagepath)

    #resize the image to a 224x224 with the same strategy as in TM2:
    #resizing the image to be at least 224x224 and then cropping from the center
    size = (224, 224)
    image = ImageOps.fit(image, size, Image.ANTIALIAS)

    #turn the image into a numpy array
    image_array = np.asarray(image)

    # display the resized image
    #image.show()

    # Normalize the image
    normalized_image_array = (image_array.astype(np.float32) / 127.0) - 1

    # Load the image into the array
    data[0] = normalized_image_array

    # run the inference
    prediction = model.predict(data)

    #max element
    maxpos = np.argmax(prediction)

    #nogle prints
    dictionary_all ={}
    dictionary_all.clear()
    # Below inserts alle predicted persons and their accuracy in the dictionary
    for element in CATEGORIES:
        # Updates dict with acc for all elements
        dictionary_all.update({element: int(prediction[0][CATEGORIES.index(element)] * 100)})
    
     # print predict resultat
    print("Start--------------------------")
    print(dictionary_all)
    print("Predicted person: ", CATEGORIES.__getitem__(maxpos))
    # return position of max
    print("slut---------------------------")

    # Inserts only the person with highest accuracy in the dictionary
    
    #dictionary_max ={}
    #dictionary_max.update({"Person": CATEGORIES.__getitem__(maxpos), "Accuracy": int(prediction[0][maxpos] * 100)})
    #test
    imagePrediction = CATEGORIES.__getitem__(maxpos) + ": Accuracy " + str(int(prediction[0][maxpos] * 100)) + "%"
    personName = CATEGORIES.__getitem__(maxpos)
    perAccuracy = str(int(prediction[0][maxpos] * 100))
    return personName, perAccuracy



#modelPredict('api/save/fine_tuning.h5', 'api/testimages/vali_billede.png')