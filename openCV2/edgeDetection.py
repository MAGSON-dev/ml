import numpy as np
import cv2

cap = cv2.VideoCapture(0)

while True:
    _, frame = cap.read()
    # Change numbers for different treshold
    edges = cv2.Canny(frame, 100, 100)

    cv2.imshow('edges', edges)
    cv2.imshow('frame', frame)

    # Press escape to dissmiss
    k = cv2.waitKey(30) & 0xff
    if k == 27:
        break

cv2.destroyAllWindows()
cap.release()
