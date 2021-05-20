# plot photo with detected faces using opencv cascade classifier
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as pyplot
from matplotlib.patches import Rectangle, Circle
import os
import time
import base64
from datetime import datetime
from threading import Lock
from os import path

from keras_preprocessing.image import array_to_img, save_img, load_img

from mtcnn.mtcnn import MTCNN


from tkinter import *


# help method to detect faces in the image
def faceDetector(filename):

    pixels = pyplot.imread(filename)
    # create the detector, using default weights
    detector = MTCNN()
    # detect faces in the image
    faces = detector.detect_faces(pixels)
    return faces


# draw an image with detected objects
def draw_image_with_boxes(filename, faces, fullImageDir):
    faces = faces
    # load the image
    data = pyplot.imread(filename)
    # plot the image
    pyplot.imshow(data)
    # get the context for drawing boxes
    ax = pyplot.gca()
    ax.axis('off')
    '''
    pyplot.subplots_adjust(top = 1, bottom = 0, right = 1, left = 0, 
            hspace = 0, wspace = 0)
    pyplot.margins(0,0)
    pyplot.gca().xaxis.set_major_locator(pyplot.NullLocator())
    pyplot.gca().yaxis.set_major_locator(pyplot.NullLocator())
    pyplot.savefig("filename.pdf", bbox_inches = 'tight',
    pad_inches = 0)
    '''
    # plot each box
    for face in faces:
        # get coordinates
        x, y, width, height = face['box']
        # create the shape
        rect = Rectangle((x, y), width, height, fill=False, color='red')
        # draw the box
        ax.add_patch(rect)
        # draw the dots
        for key, value in face['keypoints'].items():
            # create and draw dot
            dot = Circle(value, radius=2, color='red')
            ax.add_patch(dot)
    
    # Delete the plotted picture if it allready exists.
    if path.exists(fullImageDir):
        os.remove(fullImageDir)

    # Save the group picture plot
    pyplot.savefig(fullImageDir, bbox_inches='tight', pad_inches=0)

    pyplot.close()


# This method crops the faces and saves them in the given crop directory
def crop_faces(filename, faces, cropDir):
    result_list = faces
    # load the image
    data = pyplot.imread(filename)
    # plot each face as a subplot
    for i in range(len(result_list)):
        # get coordinates
        x1, y1, width, height = result_list[i]['box']
        x2, y2 = x1 + width, y1 + height
        # define subplot
        pyplot.subplot(1, len(result_list), i + 1)
        pyplot.axis('off')
        # plot face
        #pyplot.imshow(data[y1:y2, x1:x2])

        # crop faces
        faceData = data[y1:y2, x1:x2]

        # Data to image
        faceimage = image_array_to_image(faceData)

        # Save faces in directory
        save_faces(faceimage, cropDir)

   
# Converts an images array into an image of size 224,244
def image_array_to_image(faceData):
    faceimage = array_to_img(faceData)
    faceimage = faceimage.resize((224, 224))
    return faceimage

# TODO: Maybe fix this bug with sleeper
# Saves the cropped faces in a given directory
def save_faces(faceimage, cropDir):
    # saves image in given dir with date on name
  
    time.sleep(1)
    faceimage.save(cropDir + 'navn' + datetime.today().strftime('%m-%d-%Y-%H-%M-%S') + '.png',format='png')
    #faceimage.save('api/pics/croppedimages/' + 'navn' + datetime.today().strftime('%m-%d-%Y-%H-%M-%S') + '.png',format='png')


# Main methods which call the other methods of detecting faces, drawing boxes over the faces
# Cropping the images and lastly saving them in a desired directory
def detectFaces(filename, cropDir, fullImageDir):
    # find faces in the given images with the Detector from the MTCN library
    faces = faceDetector(filename)
    # Draw box on faces
    draw_image_with_boxes(filename, faces, fullImageDir)
    # crops the faces and saves them
    crop_faces(filename, faces, cropDir)
    
