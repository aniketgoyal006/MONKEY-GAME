var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var ground
var survivalTime

function preload(){
 
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(400,400);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400,350,900,10);
  ground.velocityX =-4;
  ground.shapeColor = "green";

  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
  survivalTime = 0;
}


function draw() {

  background("white");

  if (ground.x < 0){
      ground.x = ground.width/2;
    }

    if(keyDown("space")&& monkey.y>310) {
        monkey.velocityY = -22;
    }
   monkey.velocityY = monkey.velocityY + 0.9

  monkey.collide(ground);

    if(obstacleGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        monkey.velocityX = 0;
        obstacleGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        bananaGroup.setVelocityXEach(0);
        bananaGroup.setLifetimeEach(-1);
        survivalTime = 0;
    }

  spawnObstacles();
  spawnBananas();
  drawSprites();   
  
  survivalTime = survivalTime + Math.round(getFrameRate()/60);
  stroke = ("black");
  textSize(20);
  fill = ("black");
  text("Survival Time:" + survivalTime,100,50);
  
}

function spawnBananas() {
  
   if (frameCount % 80 === 0){
   banana = createSprite(600,165,10,40);
   banana.y = Math.round(random(120,200));  
   banana.addImage(bananaImage);
   banana.velocity.x = -6;
   banana.scale = 0.1;
   banana.lifetime = 100;
   bananaGroup.add(banana);
  }
}

function spawnObstacles() {
 
  if (frameCount % 60 === 0){
   obstacle = createSprite(600,330,10,40);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -6;
   obstacle.scale = 0.1;
   obstacle.lifetime = 100;
   obstacleGroup.add(obstacle);
  }
}