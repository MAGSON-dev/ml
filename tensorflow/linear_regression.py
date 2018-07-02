import tensorflow as tf
import numpy as np # Used for setting up the fake data
import matplotlib.pyplot as plt # User for data visualization 

learning_rate = 0.01 # How fast the algorithm should learn
training_epochs = 100 # One epoch consists of one full training cycle on the training set.

x_train = np.linspace(-1, 1, 100) # Create a vector with 100 numbers evenly spaced between -1 and 1 
y_train = 2 * x_train + np.random.randn(*x_train.shape) * 0.33 # Multiply x_train with 2 and add some noice

X = tf.placeholder(tf.float32) # Input nodes
Y = tf.placeholder(tf.float32) # Output nodes

w = tf.Variable(0.0, name="weights") # The steepnes of y

y_model = tf.multiply(X, w) # y = w * X
cost = tf.square(Y-y_model) # Cost function is calculating how good the prediction was: (prediction - data)^2

train_op = tf.train.GradientDescentOptimizer(learning_rate).minimize(cost) # Make the training algorithm: gradient descent. Will be called on each iteration

sess = tf.Session() # Start a session
init = tf.global_variables_initializer() # Initiaize all variables
sess.run(init)

for epoch in range(training_epochs):
    for (x, y) in zip(x_train, y_train):
        sess.run(train_op, feed_dict={X: x, Y: y})

w_val = sess.run(w)

sess.close()
plt.scatter(x_train, y_train)
y_learned = x_train*w_val
plt.plot(x_train, y_learned, 'r')
plt.show()
