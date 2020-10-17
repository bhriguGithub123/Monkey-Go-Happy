var monkey, monkey_running
var obstacle, obstacleImage
var banana, bananaImage

var score = 0;
var survivalTime = 0;

var gameState = "start";

var rect1, rect2;

function preload() {


  monkey_running = loadAnimation("monkey_0.png", "monkey_1.png", "monkey_2.png", "monkey_3.png", "monkey_4.png", "monkey_5.png", "monkey_6.png", "monkey_7.png", "monkey_8.png")

  obstacleImage = loadImage("obstacle.png");

  bananaImage = loadImage("banana.png");

}



function setup() {

  createCanvas(400, 400);

  // rect1 = createSprite(350, 200, 100, 400);
  //rect2 = createSprite(50, 200, 100, 400);


  //creating monkey
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  //console.log(ground.x)

  obstaclesGroup = createGroup();
  bananasGroup = createGroup();
  
  
}


function draw() {

  background("green");

  if (gameState === "start") {
    monkey.visible = true;
    ground.visible = true;
    ground.velocityX = 0;
    monkey.collide(ground);

    textSize(16);
    fill("white");
    text("Avoid Rocks", 120, 80);
    text("Eat Bananas", 120, 130);
    text("You lose if you hit a rock", 80, 180);
    text("Press 'SPACE' to Play", 75, 220);

    if (keyDown("space")) {
      ground.velocityX = -5;
      gameState = "play";
    }
  }


  if (gameState === "play") {
    score = Math.ceil(frameCount / frameRate());
    monkey.visible = true;
    ground.visible = true;

    if (keyDown("space") && monkey.y >= 314) {
      monkey.velocityY = -12;
    }

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    monkey.velocityY = monkey.velocityY + 0.8;

    monkey.collide(ground);

    spawnObstacles();
    spawnBananas();
    monkey.collide(ground);

    if (obstaclesGroup.isTouching(monkey)) {
      gameState = "end";
    }

    if (bananasGroup.isTouching(monkey)) {
      bananasGroup.destroyEach();
    }
    survivalTime = 0;

  }

  if (gameState === "end") {
    ground.velocityX = 0;

    monkey.visible = false;
    ground.visible = true;
    
    rect1 = createSprite(350, 200, 100, 400);
    rect2 = createSprite(50, 200, 100, 400);


    monkey.collide(ground);

    
    textSize(35);
    fill("white");
    text("You Lose", 140, 140);
    textSize(25);
    text("Press 'R' to restart", 100, 170);

    if (keyDown("r")) {
      ground.velocityX = -5;
      score = 0;
      gameState = "play";
    }
    
    monkey.x =80;
    monkey.y =315;
    
    
  }

  textSize(20);
  fill("ORANGE");
  stroke("red");
  text("SURVIVAL TIME: " + score, 120, 40);



  drawSprites();




}




function spawnObstacles() {
  if (frameCount % 100 === 0) {
    obstacle = createSprite(400, 320, 20, 20);
    obstacle.velocityX = -6;
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.1;
    obstacle.lifetime = 70;

    obstaclesGroup.add(obstacle);
  }

}


function spawnBananas() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400, 350, 20, 20);
    banana.velocityX = -6;
    banana.y = random(200, 350);
    banana.addImage("bananas", bananaImage);
    banana.scale = 0.05;
    banana.lifetime = 70;
    bananasGroup.add(banana);
    monkey.depth = banana.depth + 1;
  }
}