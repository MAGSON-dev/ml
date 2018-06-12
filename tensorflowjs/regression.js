// This is an expriment based on The coding train's Video: https://www.youtube.com/watch?v=dLp10CFIvxI

/*
    This is a interactive program that makes linear or polynomial regression predictions
    based on input from the user in a canvas.  
*/

let x_vals = []; // store all the x coordinates (labels)
let y_vals = []; // store all the y coordinates

let a, b, c, d; // varbiable tensors that gets modified during training 

const learningRate = 0.5; // how fast the training will happen
const optimizer = tf.train.sgd(learningRate); // stochastic gradient descent

function setup() { // create a canvas 
    createCanvas(400, 400);
    // initialize the two variables with random floats 
    a = tf.variable(tf.scalar(random(1)));
    b = tf.variable(tf.scalar(random(1)));
    c = tf.variable(tf.scalar(random(1))); // only used for polynomial regression
    d = tf.variable(tf.scalar(random(1))); // only used for third degree polynomial regression
}

function loss(pred, labels) { // loss function: mean square error
    // the average of all (prediction - y_val)^2 
    return pred.sub(labels).square().mean();
}

function predict(x) { // takes an array of x coordinates as a parameter and returns the predicted ys as a tensor1d
    const xs = tf.tensor1d(x); // makes a tensor from the x coordinates
    // y = mx + b;
    const ys = xs.mul(a).add(b); // ys is a tensor1d with all predictions based on the x_vals
    return ys; // return the predicted y value
}

function predictPolynomial(x) {
    const xs = tf.tensor1d(x);
    // y = ax^2 + bx + c
    const ys = xs.square().mul(a)
        .add(xs.mul(b))
        .add(c);
    return ys;
}

function predictThirdDegree(x) {
    const xs = tf.tensor1d(x);
    // y = ax^3 + bx^2 + cx + d
    //const ys = xs.pow
}

function mousePressed() { // save coordinates
    let x = map(mouseX, 0, width, 0, 1);
    let y = map(mouseY, 0, height, 1, 0);
    x_vals.push(x);
    y_vals.push(y);
}

function draw() {

    tf.tidy(() => { // delete all tensors when finished
        if (x_vals.length > 0) { // make sure you have added points before making predictions
            const ys = tf.tensor1d(y_vals); // convert the y_vals array to a tensor1d
            optimizer.minimize(() => {
                switch (regressionType()) {
                    case 'linear':
                        return loss(predict(x_vals), ys); // train the optimizer (sgd) using the loss function 
                        break;
                    case 'polynomial':
                        return loss(predictPolynomial(x_vals), ys)
                        break;
                    case 'third-degree':
                        return loss(predictThirdDegree(x_vals), ys)
                        break;
                }
            });
        }
    });

    background(0);

    stroke(255);
    strokeWeight(8);
    for (let i = 0; i < x_vals.length; i++) { // adding all points to the canvas
        let px = map(x_vals[i], 0, 1, 0, width);
        let py = map(y_vals[i], 0, 1, height, 0);
        point(px, py);
    }

    if (regressionType() === 'linear') { // if linear => draw the regression line
        const lineX = [0, 1]; // the x values for the regression line 

        const ys = tf.tidy(() => predict(lineX)); // the predicted ys from the xs from the regression line
        let lineY = ys.dataSync(); // get the raw data from the tensor 
        ys.dispose(); // delete the tensor to prevent memory leaks

        let x1 = map(lineX[0], 0, 1, 0, width);
        let x2 = map(lineX[1], 0, 1, 0, width);

        let y1 = map(lineY[0], 0, 1, height, 0);
        let y2 = map(lineY[1], 0, 1, height, 0);

        strokeWeight(2);
        line(x1, y1, x2, y2); // draw the regression line
    }
    else if (regressionType() === 'polynomial') { // if polynomial => draw regression line
        const lineX = [];
        for (let x = 0; x <= 1; x += 0.05) {
            lineX.push(x);
        }

        const ys = tf.tidy(() => predict(lineX)); // the predicted ys from the xs from the regression line
        let lineY = ys.dataSync(); // get the raw data from the tensor 
        ys.dispose(); // delete the tensor to prevent memory leaks

        beginShape();
        noFill();
        stroke(255);
        strokeWeight(2);

        for (let i = 0; i < lineX.length; i++) {
            let x = map(lineX[i], 0, 1, 0, width);
            let y = map(lineY[i], 0, 1, 0, height);
            vertex(x, y)
        }
    }

    // console.log(tf.memory().numTensors); 
}

function regressionType() {
    return document.getElementById('regressionTypeSelect').value;
}