# -*- coding: utf-8 -*-
"""Digits classifier, DNN.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1wVGtO-uRqon04viLNK5znGAydJzOK_sG
"""

import tensorflow as tf

from tensorflow.examples.tutorials.mnist import input_data
mnist = input_data.read_data_sets("MNIST_data/", one_hot=True)

# Placeholders
x = tf.placeholder(tf.float32,shape=[None,784])

# Variables
w = tf.Variable(tf.zeros([784,10]))
b = tf.Variable(tf.zeros([10]))

# Graph
y = tf.matmul(x,w) + b

# Loss function
y_true = tf.placeholder(tf.float32,[None,10])

cross_entropy = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits_v2(labels=y_true,logits=y))

# Optimizer
optimizer = tf.train.GradientDescentOptimizer(learning_rate=0.5)
train = optimizer.minimize(cross_entropy)

# Session
init = tf.global_variables_initializer()

with tf.Session() as sess:
  sess.run(init)
  
  epochs = 50000
  
  for step in range(epochs):
    batch_x , batch_y = mnist.train.next_batch(100)
    
    sess.run(train,feed_dict={x:batch_x,y_true:batch_y})
    
  
  # Evaluate
  correct_prediction = tf.equal(tf.argmax(y,1), tf.argmax(y_true,1))
  
  accuracy = tf.reduce_mean(tf.cast(correct_prediction,tf.float32))
  
  print(sess.run(accuracy,feed_dict={x:mnist.test.images,y_true:mnist.test.labels}))

