//var santa,santaImg;
var path,pathImage;
var giftImg,gift1,gift2,gift3,gift4;
var score = 0;
var GiftsDelivered = 0;

var NOGift_house1,NOGift_house2,NOGift_house3;
var YESGift_house1,YESGift_house2,YESGift_house3,YESGift_house4;

var giftEffect, theImg;
var vid;
var sprite;

//obstacles
var snowball,snowballImg;


function preload(){

santaImg = loadImage("images/santa character transparent.png");
pathImage = loadImage("images/snowy path.jpg");
giftImg = loadImage("images/gift.png");

gift1 = loadImage("images/gift 1.png");
gift2 = loadImage("images/gift 2.png");
gift3 = loadImage("images/gift 3.png");
gift4 = loadImage("images/gift 4.png");

//houses with no gifts images here
NOGift_house1 = loadImage("houses/good_house_2-removebg-preview.png");
NOGift_house2 = loadImage("houses/good_house_5-removebg-preview.png");
NOGift_house3 = loadImage("houses/good_house_6-removebg-preview.png");

//houses with gifts images here
YESGift_house1 = loadImage("houses/house with gift 1.png");
YESGift_house2 = loadImage("houses/house with gift 2.png");
YESGift_house3 = loadImage("houses/house_with_gift_3.png");
YESGift_house4 = loadImage("houses/house with gift 4.png");

//the gift effect image
theImg = loadAnimation("images/output-onlinegiftools (3).gif");

//vid.loadVedio("output-onlinegiftools-_3_");
//obstacles images
snowballImg = loadImage("images/hurling snowball for game.png");

}

function setup() {
  createCanvas(1400,680);

  path = createSprite(750,280,1500,680);
  path.addImage(pathImage);

  santa = createSprite(400, 450, 50, 50);
  santa.addImage(santaImg);
  santa.scale = 1.3;

  //creating groups
  giftsGroup = new Group();
  housesGroup = new Group();
  snowGroup = new Group();

  //giftEffect = createSprite(200,200,50,50);
  //giftEffect.addAnimation(theImg);
//playing giftEffect vedio -
 vid = createVideo("output-onlinegiftools-3.webm");
  vid.loop()
  vid.speed(2);
  vid.position(600, 20);
  vid.pause();
  vid.hide(); 

  
  sprite = createSprite();
}

function draw() {
  background(pathImage);  
  drawSprites();

//setting the score
fill("black");
textSize(30);
text("Score : " + score,200,50);

//no. of gifts delivered.
fill("black");
textSize(30);
text("Gifts Delivered to houses: " + GiftsDelivered,600,50);

  //giving velocity to path.
path.velocityX = -4;

if (path.x < 650) {
  path.x = path.width / 2;
}

//making slegge move like game
if (keyDown(UP_ARROW)) {
  if (santa.velocityY === 0) {
    santa.velocityY = -6;

  } else {
    santa.velocityY = 0;
  }
  
}


if (keyDown(DOWN_ARROW)) {
  if (santa.velocityY === 0) {
    santa.velocityY = 6;

  } else {
    santa.velocityY = 0;
  }

}

  //spawnGift();
  spawnPresents();
  spawnHouses3();
  throwBall();
 
//gifts collecting feature to be added.
if(santa.isTouching(giftsGroup)){
  giftsGroup.destroyEach();
  score = score + 1;
}
//set the sprite collider later.
santa.debug = false;
santa.setCollider("rectangle",35,18,520,90);

//creating edge sprites;
edges = createEdgeSprites();

if(score > 3  || score === 3){
  spawnHouses4();

}
   
if(sprite.lifetime === 0){
console.log("vid hide code works");
vid.hide();
} 

 //decide lifetime for snowball
 if(snowGroup.isTouching(santa)){
  snowGroup.setLifetimeEach(0);
}


}//function draw bracket

function keyPressed(){
if(keyCode === 32){
  sprite = createSprite();
  sprite.lifetime = 30;
  console.log("it worked!");
  GiftsDelivered = GiftsDelivered + 1;
  vid.play();
  vid.show();
}
}
  
function keyReleased(){
sprite.lifetime = 50;
}

/* create another function to do (functio hisesprite)
 if(sprite.lifetime === 0){
  vid.hide();
} else {
  vid.show();
}  */

function spawnGift() {
  //write code here to spawn the gift
  if (frameCount % 300 === 0) {
    gift = createSprite(945, 70, 40, 40);
    gift.y = Math.round(random(200, 800));
    gift.addImage(giftImg);
    gift.scale = 0.6;
    gift.velocityX = -3;

    //assign lifetime to the variable
    gift.lifetime = 400;

    //adjust the depth
    gift.depth = santa.depth;

    //making the gift invisible as we don't want to use it - only its lifetime for gifteffect
    //gift.visible = false;
  
    //adding gift to the group
    giftsGroup.add(gift);
  }
}

function spawnPresents(){
  //write code here to spawn the gift
  if (frameCount % 300 === 0) {
    present = createSprite(1401, 70, 40, 40);
    present.y = Math.round(random(200, 800));
    
    var rand = Math.round(random(1, 4));
    switch (rand) {
      case 1: present.addImage(gift1);
        break;
      case 2: present.addImage(gift2);
        break;
      case 3: present.addImage(gift3);
        break;
      case 4: present.addImage(gift4);
          break;
      default: break;
    }

    present.scale = 0.6;
    present.velocityX = -5;

    //assign lifetime to the variable
    present.lifetime = 1200;

    //adjust the depth
    present.depth = santa.depth;
  
    present.debug = false;
    //adding gift to the group
    giftsGroup.add(present);
  }
}


function spawnHouses3(){
  //write code here to spawn the gift
  if (frameCount % 350 === 0) {
    house = createSprite(1601, 320, 40, 40);
      
    var rand = Math.round(random(1, 3));
    switch (rand) {
      case 1: house.addImage(NOGift_house1);
              house.scale = 2;
              house.y = 300;
        break;
      case 2: house.addImage(NOGift_house2);
        break;
      case 3: house.addImage(NOGift_house3);
              house.y = 370;
        break;
      default: break;
    }

    //present.scale = 0.6;
    house.velocityX = -5;

    //assign lifetime to the variable
    house.lifetime = 1200;

    //adjust the depth
    house.depth = santa.depth - 1;
  
    //house.debug = false;
    //adding house to the group
    housesGroup.add(house);
  }
}


function spawnHouses4(){
  //write code here to spawn the gift
  if (frameCount % 550 === 0) {
    home = createSprite(1650, 290, 40, 40);
      
    var rand = Math.round(random(1, 4));
    switch (rand) {
      case 1: home.addImage(YESGift_house1);
        break;
      case 2: home.addImage(YESGift_house2);
        break;
      case 3: home.addImage(YESGift_house3);
        break;
      case 4: home.addImage(YESGift_house4);
              home.scale = 1.6;
              home.y = 210;
        break;
      default: break;
    }

    //present.scale = 0.6;
    home.velocityX = -5;

    //assign lifetime to the variable
    home.lifetime = 1200;

    //adjust the depth
    home.depth = santa.depth - 1;
  
    //house.debug = false;
    //adding house to the group
    housesGroup.add(home);
  }
}


function throwBall(){

  if(frameCount % 150 === 0){
    snow = createSprite(50,50,40,40);
    snow.x = 1380;
    snow.y = Math.round(random(20, 660));
    snow.addImage(snowballImg);
    snow.scale = 0.4;
    snow.velocityX = -9;
    snow.velocityY = 5;

 // the depth.
snow.depth = santa.depth;

//adding it tp a group.
snowGroup.add(snow);

snow.debug = false;
snow.setCollider("circle", 10, 34, 150);

  }

}// throwball bracket






























































//1.add sledge gift collecting interaction.✅
//2. add gift collecting gif as effect.✅
//3. can add the olaf reindeer collecting feature. 🆗
//4. look at make your own game 1 and get obstacles.their interaction. 🌓✅
//try testing it - show it to viv,his friends, online friends or family - later!
// the gameStates will be added in make your own game - 4 with sound effects - and a good game poster! - not important
// you can also read instructions for make your own game - 4 ideas.✅
// advice - try testing the game fully in make your own game - 4. look for pending bugs and fix them around in sa
// to check the velocity - to increase of gifts  houses or not(not make it too easy) in make your own game 4.ok