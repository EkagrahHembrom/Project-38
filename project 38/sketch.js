var bananaImage,obstacleImage,obstaclegroup,background,score
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0
var survivalTime = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var background,backgroundImage
var A = 1;



function preload(){
  backImage=loadImage("jungle.jpg");
  player_running=("Monkey_01.png","Monkey_2.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png",
 "Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("Banana.png");
  obstacle_img = loadImage("stone.png") 
  
}

function setup() {
  {
    createCanvas (600,400);
    
    background = createSprite(0,0,2000,800);
    background.addImage("image",backgroundImage);
    background.scale = 1.5;
    //background.velocityX = -4;
    background.x = background.width/2;
    
    monkey = createSprite(80,315,20,20);
    monkey.addAnimation("moving", monkey_running);
    monkey.scale = 0.10;

function draw() if(gameState === PLAY){
  
  if (keyDown("space") && monkey.y >= 300) {
      
    monkey.velocityY = -15;    
          
  }
    
  monkey.velocityY = monkey.velocityY + 0.8

  monkey.velocityX = 4
  
  monkey.collide(ground);
  monkey.collide(obstacleGroup);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score : " + score, 500,50); 

  stroke("black");
  textSize(20);
  fill("black");    
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time : " + survivalTime,100,50);
   }  
  
  else if (gameState === END) {
   ground.velocityX = 0; 
   monkey.velocityX = 0; 
   obstacleGroup.velocityX = 0;
   bananaGroup.velocityX = 0; 
   monkey.velocityX = 0;
   obstacleGroup.setLifetimeEach(0); 
   bananaGroup.setLifetimeEach(0); 
   monkey.collide(ground); 
  }
  
  if(bananaGroup.isTouching(monkey)) {
    score = score + 2;
    bananaGroup.setLifetimeEach(0);
  }

  switch(score) {
    case 10: monkey.scale = 0.12;
    break;
    case 20: monkey.scale = 0.14;
    break;
    case 30: monkey.scale = 0.16;
    break;
    case 40: monkey.scale = 0.18;
    break;
  }
  
 
  
  if(obstacleGroup.isTouching(monkey) && score > 0) {
    A = 2;
  }
  
  if(obstacleGroup.isTouching(monkey) && score === 0) {
    A = 3;
  }
  
  if(obstacleGroup.isTouching(monkey) && monkey.scale > 0.10) {
    score = 0;
  }
  
  if(gameState === END) {
    A = 1;
  }
  
  if(A === 2) {
    monkey.scale = 0.10;
  }
  
  if(A === 3) {
    gameState = END;
  }
    

  camera.position.x = monkey.x;
  camera.position.y = monkey.y -100;

  food();
  rock();
  
  drawSprites();
  
  text("Score : " + score,400,50);
}

function food() {
if (frameCount % 80 === 0) {
    
    var banana = createSprite(600,Math.round(random(120,200)),20,20);
    banana.addImage("banana", bananaImage);
    banana.scale = 0.1;
    //banana.velocityX = -7;
    banana.lifetime = 92;
    bananaGroup.add(banana);
    
  }
}
  
function rock () {
  
  if (frameCount % 300 === 0) {
      
    obstacle = createSprite(600,320,20,20);
    obstacle.addImage("rock", obstacleImage);
    obstacle.scale = 0.2;
   // obstacle.velocityX = -7;
    obstacle.lifetime = 95;
    obstacleGroup.add(obstacle);
  
  }

}