var PLAY=1;
var END=0;
var gameState = PLAY;

var Banana,Stone,backgr; 
var monkey,monkey_running;
var BananaImage,StoneImage,backgroundImage,MonkeyImage;
var invisibleGround;
var BananaGroup,StoneGroup;
var score;


function preload(){
  
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png"); 
  
  BananaImage = loadImage("banana.png"); 
  StoneImage = loadImage("stone.png"); 
  backgroundImage = loadImage("jungle.jpg");
  
} 

function setup() { 
  createCanvas(660,490); 
   
  backgr = createSprite(300,300,5,5);
  backgr.addImage(backgroundImage);
  backgr .velocityX = -3;
  backgr.x = backgr.width/2;
    
  monkey = createSprite(70,468,15,15); 
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.05 ;
  
  invisibleGround = createSprite(70,468,1160,10);
  invisibleGround.visible = false;

  
  BananaGroup = new Group();
  StoneGroup = new Group();
  
  score = 0;
  
  monkey.setCollider("circle",0,0,150);
  monkey.debug = false;
  
  
} 
function draw() { 
    
  monkey.collide (invisibleGround);
  
  //RESET THE GROUND
  if (backgr.x<150){
    backgr.x = backgr.width/2;
  }

  //GAME STATE PLAY HERE
  if (gameState===PLAY){
  
    
  //INCREASE THE SPEED OF GROUND
   backgr.velocityX = -(4+3*score/10);
    
    
  //MAKE MONKEY JUMP ON PRESSING SPACE 
  if (keyDown("space")&&monkey.y >= 100){
    monkey.velocityY =-10; 
  }
  
  //RESET THE SCALE WHEN MONKEY TOUCHES STONE
    if (StoneGroup.isTouching(monkey)) {
    monkey.scale=0.05;
}
    
  //GIVE GRAVITY
   monkey.velocityY = monkey.velocityY+0.5;
  
    
 //INCREASE THE SCORE WHEN MONKEY TOUCHES BANANA
  if (BananaGroup.isTouching(monkey)){
    BananaGroup.destroyEach();
    score = score+2;
  }
     
  //INCREASE THE SIZE OF MONKEY 
    switch(score){
        
       case 10:monkey.scale = 0.12;
        break;
        
        case 20:monkey.scale = 0.14;
        break;
        
        case 30:monkey.scale = 0.16;
        break;
        
        case 40:monkey.scale = 0.18;
        break;
        
        default:break;
    }
    
  //spawn the bananas //
  spawnBanana();
  
  //spawn the stone //
  spawnStone();
  }
  
  drawSprites(); 
  
 //TEXT FOR SCORE
  textFont ("Comic Sans MS ");
  textSize (25);
  strokeWeight (3);
  stroke("pink");
  text("Score :"+score,480,30);
}

function spawnBanana(){
  
  if (frameCount%60 === 0){
  Banana = createSprite(670,300,15,15);
  Banana.addImage(BananaImage);
  Banana.scale = 0.04;
  Banana.y = Math.round(random(250,300));
  Banana.velocityX = -5;
  Banana.Lifetime = 200; 
  BananaGroup.velocityX = -(5+3*score/10);
  BananaGroup.add(Banana);  
  monkey.depth = Banana.depth+1;
  }
}

function spawnStone(){
  
  if (frameCount%80 === 0){
    Stone = createSprite(670,460,15,15);
  Stone.addImage(StoneImage);
  Stone.scale = 0.1; 
  Stone.velocityX = -3;
  Stone.Lifetime = 200;
  StoneGroup.velocityX = -(3+7*score/10);
  StoneGroup.add(Stone);  
  }
}

