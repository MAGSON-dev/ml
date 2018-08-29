
import tensorflow as tf
import Tkinter as tk
from tensorflow.examples.tutorials.mnist import input_data
import numpy as np
import matplotlib.pyplot as plt
mnist = input_data.read_data_sets("MNIST_data/", one_hot=True)


def init_weights(shape):
    init_random_dist = tf.truncated_normal(shape, stddev=0.1)
    return tf.Variable(init_random_dist)

# Initialize biases


def init_bias(shape):
    init_bias_vals = tf.constant(0.1, shape=shape)
    return tf.Variable(init_bias_vals)

# Convolutional 2D


def conv2d(x, W):
    # x = [batch, Height, Width,Color channels]
    # W = [filter height, filter width, color channels in, color channels out]

    return tf.nn.conv2d(x, W, strides=[1, 1, 1, 1], padding='SAME')

# Pooling layer


def max_pool_2by2(x):
    # x = [batch, Height, Width,Color channels]

    return tf.nn.max_pool(x, ksize=[1, 2, 2, 1], strides=[1, 2, 2, 1], padding='SAME')

# Convolutional layer


def convolutional_layer(input_x, shape):
    W = init_weights(shape)
    b = init_bias([shape[3]])
    return tf.nn.relu(conv2d(input_x, W)+b)

# Normal layer


def normal_full_layer(input_layer, size):
    input_size = int(input_layer.get_shape()[1])
    W = init_weights([input_size, size])
    b = init_bias([size])
    return tf.matmul(input_layer, W) + b


init = tf.global_variables_initializer()
epochs = 5000

# Placeholders

x = tf.placeholder(tf.float32, shape=[None, 784])
y_true = tf.placeholder(tf.float32, shape=[None, 10])

# Layers
x_image = tf.reshape(x, [-1, 28, 28, 1])
convo_1 = convolutional_layer(x_image, shape=[5, 5, 1, 32])
convo_1_pooling = max_pool_2by2(convo_1)

convo_2 = convolutional_layer(convo_1_pooling, shape=[5, 5, 32, 64])
convo_2_pooling = max_pool_2by2(convo_2)

convo_2_flat = tf.reshape(convo_2_pooling, [-1, 7*7*64])
full_layer_one = tf.nn.relu(normal_full_layer(convo_2_flat, 1024))

# Dropout
hold_probabilities = tf.placeholder(tf.float32)
full_one_dropout = tf.nn.dropout(full_layer_one, keep_prob=hold_probabilities)

y_pred = normal_full_layer(full_one_dropout, 10)

# Loss function

cross_entropy = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits_v2(labels=y_true, logits=y_pred))

# Optimizer and trainer

optimizer = tf.train.AdamOptimizer(learning_rate=0.001)
train = optimizer.minimize(cross_entropy)


def train():
    with tf.Session() as sess:
        sess.run(init)

        for i in range(epochs):
            batch_x, batch_y = mnist.train.next_batch(50)

            sess.run(train, feed_dict={x: batch_x,y_true: batch_y, hold_probabilities: 0.5})

            if i % 100 == 0:
                print("On step: {}".format(i))
                print("Accuracy: ")

                matches = tf.equal(tf.argmax(y_pred, 1), tf.argmax(y_true, 1))
                accuracy = tf.reduce_mean(tf.cast(matches, tf.float32))

                print(sess.run(accuracy, feed_dict={x: mnist.test.images, y_true: mnist.test.labels, hold_probabilities: 1.0}))
                print('\n')


def run():
    print("magson er best")


root = tk.Tk()
# Code to add widgets will go here...
btnTrain = tk.Button(text="Train AI", command=lambda: train())
btnRun = tk.Button(text="Run AI", command=lambda: run())
img = tk.PhotoImage()
label = tk.Label()

panel = tk.Label(root, image=img)

panel.pack(side="bottom", fill="both", expand="yes")
label.pack()
btnTrain.pack()
btnRun.pack()
root.mainloop()
