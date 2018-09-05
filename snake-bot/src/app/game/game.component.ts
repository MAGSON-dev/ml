import { AuthService } from './../services/auth.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { take } from '../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {

  snakeX = 10;
  snakeY = 10;
  boardLength = 20;
  foodX = 15;
  foodY = 15;
  snakeDirectionX = 0;
  snakeDirectionY = 0;
  trail = [];
  tail = 5; // the length of the snake
  score = 0;

  output = [];

  running = false;
  speed = 190;

  newKey = true; // prevents swithcing direction before snake has moved

  canv: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  uid: string;

  constructor(public afs: AngularFirestore, public auth: AuthService) {
    this.auth.user$.pipe(take(1)).subscribe(user => {
      this.uid = user.uid;
    });
  }

  ngOnInit() {
    this.canv = (<HTMLCanvasElement>document.getElementById('gc'));
    this.ctx = this.canv.getContext('2d');

    setInterval(() => {
      if (this.running) {
        this.game();
      }
    }, this.speed);
    this.game(); // run game loop once to draw the snake
  }

  game() {

    // move snake
    this.snakeX += this.snakeDirectionX;
    this.snakeY += this.snakeDirectionY;
    // if the snake go out of the canvas
    if (this.snakeX < 0) {
      this.snakeX = this.boardLength - 1;
    }
    if (this.snakeX > this.boardLength - 1) {
      this.snakeX = 0;
    }
    if (this.snakeY < 0) {
      this.snakeY = this.boardLength - 1;
    }
    if (this.snakeY > this.boardLength - 1) {
      this.snakeY = 0;
    }

    for (let i = 0; i < this.trail.length; i++) {
      // if the snake hits itself
      if ((this.trail[i].x === this.snakeX && this.trail[i].y === this.snakeY) && this.running === true) {
        this.reset();
      }
    }

    this.trail.push({ x: this.snakeX, y: this.snakeY });
    // remove old point
    while (this.trail.length > this.tail) {
      this.trail.shift();
    }

    // if the snake hits food
    if (this.foodX === this.snakeX && this.foodY === this.snakeY) {
      this.updateScore();
      this.tail++;
      this.updateFoodPos();
    }

    this.newKey = true;

    this.draw();
    this.log();
  }

  log() {
    const input = [];
    for (let y = 0; y < this.boardLength; y++) {
      for (let x = 0; x < this.boardLength; x++) {
        if (this.foodX === x && this.foodY === y) {
          input.push(1);
        } else {
          input.push(0);
        }
      }
    }

    for (let y = 0; y < this.boardLength; y++) {
      for (let x = 0; x < this.boardLength; x++) {
        let isSnakeHere = false;
        for (let t = 0; t < this.trail.length; t++) {
          if (this.trail[t].x === x && this.trail[t].y === y) {
            isSnakeHere = true;
            break;
          }
        }
        if (isSnakeHere) {
          input.push(1);
        } else {
          input.push(0);
        }
      }
    }

    this.afs.collection('trainingData').add({
      data: { input, output: this.output },
      uid: this.uid
    }).catch(err => alert(err));
  }

  updateFoodPos() {
    this.foodX = Math.floor(Math.random() * this.boardLength);
    this.foodY = Math.floor(Math.random() * this.boardLength);

    for (let i = 0; i < this.trail.length; i++) {
      if (this.trail[i].x === this.foodX && this.trail[i].y === this.foodY) {
        this.updateFoodPos();
      }
    }
  }

  draw() {
    this.ctx.fillStyle = '#263238';
    this.ctx.fillRect(0, 0, this.canv.width, this.canv.height);

    this.ctx.fillStyle = '#039386';

    for (let i = 0; i < this.trail.length; i++) {
      this.ctx.fillRect(this.trail[i].x * this.boardLength, this.trail[i].y * this.boardLength, this.boardLength - 2, this.boardLength - 2);
    }

    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(this.foodX * this.boardLength, this.foodY * this.boardLength, this.boardLength - 2, this.boardLength - 2);
  }

  @HostListener('document:keydown', ['$event']) keyDown(evt: KeyboardEvent) {
    if (this.newKey) {
      this.keyPressed(evt.key);
    }
  }

  keyPressed(key) {
    switch (key) {
      case 'w':
        // up key pushed
        if (this.snakeDirectionY < 1) {
          this.snakeDirectionX = 0; this.snakeDirectionY = -1;
          this.running = true;
          this.output = [1, 0, 0, 0];
          this.newKey = false;
        }
        break;
      case 'd':
        // right key pushed
        if (this.snakeDirectionX > -1) {
          this.snakeDirectionX = 1; this.snakeDirectionY = 0;
          this.running = true;
          this.output = [0, 1, 0, 0];
          this.newKey = false;
        }
        break;
      case 's':
        // down key pushed
        if (this.snakeDirectionY > -1) {
          this.snakeDirectionX = 0; this.snakeDirectionY = 1;
          this.running = true;
          this.output = [0, 0, 1, 0];
          this.newKey = false;
        }
        break;
      case 'a':
        // left key pushed
        if (this.snakeDirectionX < 1) {
          this.snakeDirectionX = -1; this.snakeDirectionY = 0;
          this.running = true;
          this.output = [0, 0, 0, 1];
          this.newKey = false;
        }
        break;
      case 'ArrowUp':
        // up key pushed
        if (this.snakeDirectionY < 1) {
          this.snakeDirectionX = 0; this.snakeDirectionY = -1;
          this.running = true;
          this.output = [1, 0, 0, 0];
          this.newKey = false;
        }
        break;
      case 'ArrowRight':
        // right key pushed
        if (this.snakeDirectionX > -1) {
          this.snakeDirectionX = 1; this.snakeDirectionY = 0;
          this.running = true;
          this.output = [0, 1, 0, 0];
          this.newKey = false;
        }
        break;
      case 'ArrowDown':
        // down key pushed
        if (this.snakeDirectionY > -1) {
          this.snakeDirectionX = 0; this.snakeDirectionY = 1;
          this.running = true;
          this.output = [0, 0, 1, 0];
          this.newKey = false;
        }
        break;
      case 'ArrowLeft':
        // left key pushed
        if (this.snakeDirectionX < 1) {
          this.snakeDirectionX = -1; this.snakeDirectionY = 0;
          this.running = true;
          this.output = [0, 0, 0, 1];
          this.newKey = false;
        }
        break;
      case 'p':
        this.running = !this.running;
        console.log('pause');
        break;
    }
  }

  updateScore() {
    this.score++;
    document.getElementById('scoreText').innerHTML = 'Score: ' + this.score;
  }

  reset() {
    this.uploadToFirebase(this.score);

    // reset all variables
    this.snakeX = 10;
    this.snakeY = 10;
    this.foodX = 15;
    this.foodY = 15;
    this.snakeDirectionX = 0;
    this.snakeDirectionY = 0;
    this.trail = []; //
    this.tail = 5; // the length of the snake
    this.score = 0;
    this.running = false;
    this.newKey = true;

    document.getElementById('scoreText').innerHTML = 'Score: ' + this.score;
  }

  uploadToFirebase(score) {
    console.log('uploading to firebase');
    // update user
    const ref = this.afs.firestore.doc('users/' + this.uid);
    return this.afs.firestore.runTransaction(trans => {
      return trans.get(ref).then(doc => {
        const data = doc.data();
        if (score > 30) {
          const kr = (score - 30) / 30;
          data.kr += kr;
        }
        if (score > doc.data().highscore) { // new highscore
          data.highscore = score;
        }
        return trans.update(ref, data);
      });
    });
  }

}



// The snake is in a 20 x 20 boxes







