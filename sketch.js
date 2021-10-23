var PLAY = 1;

var END = 0;

var gameState = PLAY;

var stickman, stickman_running;

var ground, invisibleGround, groundImage;

var enemysGroup, enemy1;

var score;

var sonic_music;

function preload(){
  stickman_running = loadAnimation("stickman3.png","stickman2.png","stickman1.png");
  
  groundImage = loadImage("background.png");
  
  
  enemy1 = loadImage("enemy.png");
  
  sonic_music = loadSound("sonic music.mp3");
}

function setup() {
  createCanvas(600, 200);
   sonic_music.loop();
  var message = "This is a message";
 console.log(message)
  
  stickman = createSprite(50,160,20,50);
  stickman.addAnimation("running", stickman_running);
  

  stickman.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  
 
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  enemysGroup = createGroup();

  
  stickman.setCollider("rectangle",0,0,stickman.width,stickman.height);
  stickman.debug = true
  
  score = 0;
  
}

function draw() {
  
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){
    stickman_running = loadAnimation("stickman3.png","stickman2.png","stickman1.png");
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& stickman.y >= 100) {
        stickman.velocityY = -12;
    }
    
    //add gravity
    stickman.velocityY = stickman.velocityY + 0.8
  
    //spawn obstacles on the ground
    spawnenemy();
    
    if(enemysGroup.isTouching(stickman)){
        //trex.velocityY = -12;
        gameState = END;

    
    }

    
     
     
      ground.velocityX = 0;
      stickman.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    enemysGroup.setLifetimeEach(-1);
     
     enemysGroup.setVelocityXEach(0);   

     if(mousePressedOver(stickman)) {
      reset();
    }  


   
  
 
  

  
  


  drawSprites();
}
  
function reset(){
  gameState=PLAY;
  enemy1.destroyEach();
  score=0;
}


function spawnenemy(){
 if (frameCount % 60 === 0){
   var enemy1 = createSprite(600,165,10,40);
   enemy1.velocityX = -(6 + score/100);
   

    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: enemy1.addImage(enemy1);

      default: break
    }
   
            
    enemy1.scale = 0.5;
    enemy1.lifetime = 300;
   
   
    enemysGroup.add(enemy1);
 }
}