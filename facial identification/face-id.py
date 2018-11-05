import numpy as np
import cv2
import pickle

face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
eye_cascade = cv2.CascadeClassifier('haarcascade_eye.xml')

recognizer = cv2.face.LBPHFaceRecognizer_create()
recognizer.read("face-trainer.yml")

labels = {"person_name": 1}
with open("pickle/face-labels.pickle", 'rb') as f:
	og_labels = pickle.load(f)
	labels = {v:k for k,v in og_labels.items()}

cap = cv2.VideoCapture(0)

while 1:
    ret, img = cap.read()
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)


    for (x, y, w, h) in faces:
        cv2.rectangle(img, (x, y), (x+w, y+h), (255, 0, 0), 2)
        roi_gray = gray[y:y+h, x:x+w]
        roi_color = img[y:y+h, x:x+w]

        person, conf = recognizer.predict(roi_gray)

        if conf >= 85:
            font = cv2.FONT_HERSHEY_SIMPLEX
            name = labels[person]
            cv2.putText(img, name, (x,y), font, 1, (255,0,0), 2, cv2.LINE_AA)          

    cv2.imshow('img', img)

    # press esc to break
    k = cv2.waitKey(30) & 0xff
    if k == 27:
        break

cap.release()
cv2.destroyAllWindows()
