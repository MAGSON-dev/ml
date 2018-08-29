import os
import tensorflow as tf
from tensorflow.examples.tutorials.mnist import input_data
from tensorflow.contrib.tensorboard.plugins import projector
import numpy as np

PATH = os.getcwd()

LOG_DIR = PATH + '/mnist-tensorboard/log-1'
metadata = os.path.join(LOG_DIR, 'metadata.tsv')

mnist = input_data.read_data_sets(
    PATH + "/mnist-tensorboard/data/", one_hot=True)
images = tf.Variable(mnist.test.images, name='images')
#def save_metadata(file):
with open(metadata, 'w') as metadata_file:
    for row in range(10000):
        c = np.nonzero(mnist.test.labels[::1])[1:][0][row]
        metadata_file.write('{}\n'.format(c))


with tf.Session() as sess:
    saver = tf.train.Saver([images])

    sess.run(images.initializer)
    saver.save(sess, os.path.join(LOG_DIR, 'images.ckpt'))

    config = projector.ProjectorConfig()
    embedding = config.embeddings.add()
    embedding.tensor_name = images.name
    embedding.metadata_path = metadata
    projector.visualize_embeddings(tf.summary.FileWriter(LOG_DIR), config)

# RUN COMMAND BELOW TO START TENSORBOARD BITCHEEEEES
#tensorboard --logdir=/Technical_works/tensorflow/mnist-tensorboard/log-1 --port=6006
