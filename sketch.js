var gamestate="play"



function preload(){
  towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  ghostImage=loadImage("ghost-standing.png");
  sound=loadSound("spooky.wav")
}





function setup(){
  createCanvas(600,600);
  tower=createSprite(300,300);
  tower.addImage("tower",towerImage);
  tower.velocityY=1;
  
  doorsGroup= new Group()
  climberGroup= new Group();
  invisibleGroup= new Group();
  
  ghost=createSprite(200,200,50,50)
  ghost.addImage("ghost",ghostImage)
  ghost.scale=0.4 ;
  
  sound.loop();
  
}

function draw(){
  background("white");
  
  if (gamestate==="play"){
    if (tower.y > 400){
      tower.y=300;
      }
    if (keyDown("LEFT_ARROW")){
      ghost.x=ghost.x-3
      }
  
  if (keyDown("RIGHT_ARROW")){
    ghost.x=ghost.x+3
  }
  
  if (keyDown("SPACE")){
      ghost.velocityY=-5;
      }
  
  if (climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
}
  
  if (invisibleGroup.isTouching(ghost) || ghost.y>600){
      //ghost.destroy();
    gamestate="end";
      }  
  ghost.velocityY=ghost.velocityY + 0.8     
  spawndoors();
  drawSprites();
  
  }
  
  if (gamestate==="end"){
    background("black")
    fill("red")
    textSize(30)
      text("GAME OVER",300,300)
    
      }
  
}

function spawndoors(){
  if (frameCount%200===0){
      door=createSprite(200,-50);
    door.x=Math.round(random(100,400))
    door.addImage("door",doorImage)
    door.velocityY=1;
    door.lifetime=800;
    doorsGroup.add(door);
    climber=createSprite(200,10);
    climber.x=door.x;
    climber.addImage("climber",climberImage);
    climber.velocityY=1;
    climber.lifetime=800;
    climberGroup.add(climber); 
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    invisible=createSprite(200,15)
    invisible.width=climber.width;
    invisible.height=2;
    invisible.x=door.x;
    invisible.velocityY=1;
    invisible.lifetime=800;
    invisibleGroup.add(invisible);
      }  
}





