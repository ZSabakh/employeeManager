# -*- coding: utf-8 -*-
"""
@author: zurab
"""

import cv2
import face_recognition
from numpy import load
from transliterate import translit
import os
import sys
from transliterate import translit
import requests
import json

try:
    # all_file_names = load('../../utility/FaceRec/dataset/female_names.npy')
    # all_face_encodings = load('../../utility/FaceRec/dataset/female_encodings.npy')
    all_file_names = load('./utility/FaceRec/dataset/female_names.npy')
    all_face_encodings = load('./utility/FaceRec/dataset/female_encodings.npy')

    img_data = requests.get(sys.argv[1]).content
    with open('test.jpg', 'wb') as handler:
        handler.write(img_data)


    image_to_scan = "test.jpg"

    starting_image = cv2.imread(image_to_scan)

    upsampling = 2
    jitters = 3
    
    # choice = sys.argv[2]
    # if(choice == 'easy'):
    #     upsampling = 2
    #     jitters = 3
    #     continue
    # if(choice == 'medium'):
    #     upsampling = 5
    #     jitters = 7
    #     continue
    # if(choice == 'hard'):
    #     upsampling = 10
    #     jitters = 13
    #     continue


    image_to_detect = face_recognition.load_image_file(image_to_scan)
    faces_locations = face_recognition.face_locations(image_to_detect, model="hog", number_of_times_to_upsample=upsampling)
    faces_encodings = face_recognition.face_encodings(image_to_detect, faces_locations, num_jitters=jitters, model="large")
    face_distances = face_recognition.face_distance(all_face_encodings, faces_encodings)


    def roundToPercentage(x):
        x = round(((1 - float(x)) * 100), 2)
        return x


    name_index = {}

    for i, face_distance in enumerate(face_distances):
        name_index.update({all_file_names[i]: face_distance})

    name_index = {k: v for k, v in sorted(name_index.items(), key=lambda item: item[1])}

    for one_face_location, one_face_encoding in zip(faces_locations, faces_encodings):
        top_pos, right_pos, bottom_pos, left_pos = one_face_location

    results = {"Name": [], "Probability": []}

    for x in range(6):
        results["Name"].append(translit(list(name_index.keys())[x][:-4], 'ka', reversed=True))
        results["Probability"].append(roundToPercentage(list(name_index.values())[x]))

    # print(str(results))
    print(json.dumps(results))
    sys.stdout.flush()
    os.remove("test.jpg")
    name = list(name_index.keys())[0]
except Exception as e:
    print(e)
    sys.stdout.flush()

