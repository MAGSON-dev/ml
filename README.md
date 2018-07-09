[![Gitter](https://img.shields.io/badge/chat-on%20gitter-blue.svg)](https://gitter.im/MAGSON-dev/Lobby)

<h1 align="center">Magson - Machine Learning Experiments</h1>
<h4 align="center">
    <strong>This is the official repositories with all of Magson's machine learning experiments and notes.</strong>
</h4>

<h3>Experiments</h3>
<h4>Table of Contents</h4>
<h5>Tensorflow in Python</h5>
<ul>
    <li>
        <a href="https://github.com/MAGSON-dev/ml/blob/master/tensorflow/linear_regression.py">Linear regression</a>
    </li>
    <li>
        <a href="https://github.com/MAGSON-dev/ml/blob/master/tensorflow/polynomial_regression.py">Polynomial regression</a>
    </li>
</ul>
<h5>TensorflowJS</h5>
<ul>
    <li>
        <a href="https://github.com/MAGSON-dev/ml/blob/master/tensorflow/polynomial_regression.py">Regression</a>
    </li>
</ul>

<h3>Notes</h3>
<h2>ML Terminology</h2>
<strong>Machine learning systems learn how to combine input to produce useful predictions on never-before-seen data.</strong>
<ul>
    <li>
        <strong>Labels: </strong> is what we try to predict. E.g. the y variable in linear regression.</li>
    <li>
        <strong>Features: </strong>is an input variable. E.g. the x variable in linear regression.</li>
    <li>
        <strong>Model: </strong>defines the relationship between features and labels.</li>
    <li>
        <strong></strong>
    </li>
</ul>
<h2>Regression VS. Classification</h2>
<p><strong>Regression</strong> model predicts continous values. E.g:</p>
<ul>
    <li>What is the value of the house?</li>
    <li>What is the probability that a user clicks an ad?</li>
</ul>
<p><strong>Classification</strong> model predicts discrete values:</p>
<ul>
    <li>Is mail spam or not spam?</li>
    <li>Is this image of a dog or cat?</li>
</ul>
<h2>Linear regression</h2>
<math>y = mx + b</math>
<ul>
    <li>y is the value we try to predict</li>
    <li>m is the slope of the line</li>
    <li>x is the input feature</li>
    <li>b is the y-intercept</li>
</ul>
<p>By convention in machine learning, you'll write the equation for a model slightly differently:</p>
<math>y = b + wx</math>
<ul>
    <li>y = predicted labels</li>
    <li>b = biases</li>
    <li>w = weights</li>
    <li>x = features</li>
</ul>