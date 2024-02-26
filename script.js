// tile breaker: Break the tiles using the paddle by moving your mouse. Be sure to not let the ball hit the bottom of the screen!

// Variables 
let tiles, ball, paddle, score;

// Setup function: Runs once at the start
function setup() {
createCanvas(300,300); // Create game canvas of width and height of 300 
  
  tiles = new Group(); // Group of tiles
  tiles.w = 40; // Tile Width
  tiles.h = 20; // Tile Height
  tiles.collider = 'static'; // Collider Type is static so tiles don't move 
  tiles.tile = '='; // Tile character

  // Create tiles in a grid
  tilesGroup = new Tiles([
      "======",
      "======",
      "======",
      "======",
      "======",
    ],
    45, 20, //x and y position of first tile
    tiles.w + 2, // horizontal spacing between tiles
    tiles.h + 2, // vertical spacing between tiles
  );

  //Ball(sprite) properties
  const diameter = 20;
  ball = new Sprite(width/2,height-diameter,diameter); // create ball
  // ball.color = ('blue');
  ball.y = height/2; // starting height of ball
  world.gravity.y = 10; // gravity

  // Paddle(sprite) properties
  const paddleHeight = 20;
  paddle = new Sprite(width, height, 50, paddleHeight,'static'); // create paddle

  // Initialize score
  score = 0;
}

// Draw Function: Runs in a loop
function draw() {
  background('pink');

  paddle.x = mouse.x; // move paddle with mouse
  
// Ball bouncing off the walls
  if(ball.x < 0 || ball.x > width){
    ball.vel.x = -ball.vel.x; // reverse x velocity
  }
// Ball bouncing off the top
  if(ball.y < 0){
    ball.vel.y = -ball.vel.y; // reverse y velocity
  }
  // Game Over: Ball bouncing off the bottom
  if(ball.y > height){
    noLoop();
    endGame();
  }

  // Keep paddle on the screen
  if(paddle.x < 0){
    paddle.x = 0;
  }
  else if(paddle.x > width){
    paddle.x = width;
  }
  
  // Game Play: Ball bouncing off paddle
  if (ball.collides(paddle)){
    ball.vel.x = random(-5,5);
    ball.vel.y = -10; // increase velocity to increase difficulty
  }
  // Game Play: Ball hitting tiles
  for(let tile of tiles){
    if(ball.collides(tile)){
      tile.remove();
      score = score + 1;
      ball.vel.x = random(-5,5);
      ball.vel.y = -5; // increase velocity to increase difficulty
    }
  }
  
  // Player Wins: All tiles are removed and score is equal to intial tile count
  if(tiles.length == 0 && score == 30){
    noLoop();
    playerWins();
  }
}

// Game Over message
function endGame(){
  tiles.remove();
  textAlign(CENTER,CENTER);
  textSize(15);
  text('Game Over', width/2 , height/2);
  text('You hit ' + score + ' out of 30 tiles' , width/2, height/2 +20);
}

// Player Wins message
function playerWins(){
  textAlign(CENTER,CENTER);
  textSize(15);
  text( 'You Win!', width/2, height/2);
}

