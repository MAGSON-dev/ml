
import tensorflow as tf
import tkinter as tk
from tensorflow.examples.tutorials.mnist import input_data
import numpy as np
import matplotlib.pyplot as plt

#mnist = input_data.read_data_sets("MNIST_data/", one_hot=True)


def train():
    print("magsonnnnnnn")


def run():
    print("magson er best")

root = tk.Tk()
# Code to add widgets will go here...
btnTrain = tk.Button(text="Train AI", command=train())
btnRun = tk.Button(text="Run AI", command=run())
img = tk.PhotoImage()
labelAcc = tk.Label()

panel = tk.Label(root, image=img)

panel.pack(side="bottom", fill="both", expand="yes")
labelAcc.pack()
btnTrain.pack()
btnRun.pack()
root.mainloop()

