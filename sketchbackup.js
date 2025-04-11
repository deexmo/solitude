/////////// Beginning ///////////


// let player;
// let worldSize = { width: 2000, height: 2000 };

// // Attack stuff
// let attackSprite = null;
// let attackDuration = 15;
// let attackTimer = 0;
// let lastDirection = "down";

// function setup() {
//   createCanvas(700, 500);
//   player = new Player(worldSize.width / 2, worldSize.height / 2);

//   for (let i = 0; i < 40; i++) {
//     createSprite(random(0, worldSize.width),random(0, worldSize.height), 30, 30);
//   }
// }

// function draw() {
//   background(100, 100, 100);

//   camera.position.x = player.sprite.position.x;
//   camera.position.y = player.sprite.position.y;

//   player.move();
  
//   drawSprites();

//   if (attackSprite) {
//     drawSprite(attackSprite);
//     attackTimer--;
//     if (attackTimer <= 0) {
//       attackSprite.remove();
//       attackSprite = null;
//     }
//   }
// }

// class Player {
//   constructor(x, y) {
//     this.sprite = createSprite(x, y, 40, 40);
//     this.sprite.shapeColor = color(0, 0, 255);
//     this.speed = 3.5;
//   }

//   move() {
//     let moved = false;
//     let newX = this.sprite.position.x;
//     let newY = this.sprite.position.y;

//     // A
//     if (keyIsDown(65)) {
//       newX = newX - this.speed;
//       moved = true;
//       lastDirection = "left";
//     }
//     // D
//     if (keyIsDown(68)) {
//       newX = newX + this.speed;
//       moved = true;
//       lastDirection = "right";
//     }
//     // W
//     if (keyIsDown(87)) {
//       newY = newY - this.speed;
//       moved = true;
//       lastDirection = "up";
//     }
//     // S
//     if (keyIsDown(83)) {
//       newY = newY + this.speed;
//       moved = true;
//       lastDirection = "down";
//     }

//     // lets player move
//     this.sprite.position.x = newX;
//     this.sprite.position.y = newY;
//   }

//   attack() {
//     if (attackSprite) return;

//     let attackSize = 60;
//     attackSprite = createSprite(this.sprite.position.x, this.sprite.position.y, 40, 40);
//     attackSprite.shapeColor = color(255, 255, 0);

//     if (lastDirection === "left") {
//       attackSprite.position.x -= attackSize;
//       attackSprite.width = attackSize;
//       attackSprite.height = 40;
//     } else if (lastDirection === "right") {
//       attackSprite.position.x += attackSize;
//       attackSprite.width = attackSize;
//       attackSprite.height = 40;
//     } else if (lastDirection === "up") {
//       attackSprite.position.y -= attackSize;
//       attackSprite.width = 40;
//       attackSprite.height = attackSize;
//     } else if (lastDirection === "down") {
//       attackSprite.position.y += attackSize;
//       attackSprite.width = 40;
//       attackSprite.height = attackSize;
//     }

//     attackTimer = attackDuration;
//   }
// }

// function mousePressed() {
//   player.attack();
// }








/////////// Before Adding Graphics ///////////

// let player;
// let worldSize = { width: 2560, height: 2560 };
// let objects = [];
// let enemies = [];
// let bgImage;
// let rock;
// // enemy
// let enemySpawnTimer = 0;
// let enemySpawnInterval = 180;
// // player
// let attackSprite = null;
// let attackDuration = 15;
// let attackTimer = 0;
// let lastDirection = "down";


// function preload() {
//   bgImage = loadImage("assets/Map.png");
//   rock = loadImage("assets/rock.png");
// }

// function setup() {
//   createCanvas(1000, 680);
//   player = new Player(worldSize.width / 2, worldSize.height / 2);

//   for (let i = 0; i < 30; i++) {
//     let obj = createSprite(
//       random(20, worldSize.width - 20),
//       random(20, worldSize.height - 20),
//       random(30, 60),
//       random(30, 60)
//     );
//     obj.shapeColor = color(random(50, 150), random(100, 200), random(50, 150));
//     objects.push(obj);
//   }
// }

// function draw() {
//     background(169);

//   player.move();

//   // Clamp camera to the bounds of the world
//   let halfWidth = width / 2;
//   let halfHeight = height / 2;

//   camera.position.x = constrain(player.sprite.position.x, halfWidth, worldSize.width - halfWidth);
//   camera.position.y = constrain(player.sprite.position.y, halfHeight, worldSize.height - halfHeight);

//   enemySpawnTimer++;
//   if (enemySpawnTimer >= enemySpawnInterval) {
//     spawnEnemy();
//     enemySpawnTimer = 0;
//   }

//   for (let enemy of enemies) {
//     enemy.moveTowardPlayer(player);
//     drawSprite(enemy.sprite);
//   }

//   for (let obj of objects) {
//     drawSprite(obj);
//   }

//   if (attackSprite) {
//     drawSprite(attackSprite);
//     attackTimer--;
//     if (attackTimer <= 0) {
//       attackSprite.remove();
//       attackSprite = null;
//     }
//   }

//   drawSprite(player.sprite);
//   drawSprites();
// }

// class Player {
//   constructor(x, y) {
//     this.sprite = createSprite(x, y, 40, 40);
//     this.sprite.shapeColor = color(0, 0, 255);
//     this.speed = 4;
//     this.attacking = false;
//   }

//   move() {
//     if (this.attacking) return;

//     let newX = this.sprite.position.x;
//     let newY = this.sprite.position.y;

//     if (keyIsDown(65)) {
//       newX -= this.speed;
//       lastDirection = "left";
//     }
//     if (keyIsDown(68)) {
//       newX += this.speed;
//       lastDirection = "right";
//     }
//     if (keyIsDown(87)) {
//       newY -= this.speed;
//       lastDirection = "up";
//     }
//     if (keyIsDown(83)) {
//       newY += this.speed;
//       lastDirection = "down";
//     }

//     if (this.canMoveTo(newX, newY)) {
//       this.sprite.position.x = newX;
//       this.sprite.position.y = newY;
//     }
//   }

//   canMoveTo(x, y) {
//     if (x < 20 || x > worldSize.width - 20 || y < 20 || y > worldSize.height - 20) {
//       return false;
//     }

//     for (let obj of objects) {
//       if (
//         x > obj.position.x - obj.width &&
//         x < obj.position.x + obj.width &&
//         y > obj.position.y - obj.height &&
//         y < obj.position.y + obj.height 
//       ) {
//         return false;
//       }
//     }
//     return true;
//   }

//   attack() {
//     if (attackSprite || this.attacking) return;

//     this.attacking = true;

//     let attackSize = 60;
//     attackSprite = createSprite(this.sprite.position.x, this.sprite.position.y, 40, 40);
//     attackSprite.visible = false;

//     if (lastDirection === "left") {
//       attackSprite.position.x -= attackSize;
//       attackSprite.width = attackSize;
//       attackSprite.height = 40;
//     } else if (lastDirection === "right") {
//       attackSprite.position.x += attackSize;
//       attackSprite.width = attackSize;
//       attackSprite.height = 40;
//     } else if (lastDirection === "up") {
//       attackSprite.position.y -= attackSize;
//       attackSprite.width = 40;
//       attackSprite.height = attackSize;
//     } else if (lastDirection === "down") {
//       attackSprite.position.y += attackSize;
//       attackSprite.width = 40;
//       attackSprite.height = attackSize;
//     }

//     attackTimer = attackDuration;

//     for (let i = enemies.length - 1; i >= 0; i--) {
//       if (attackSprite.overlap(enemies[i].sprite)) {
//         enemies[i].sprite.remove();
//         enemies.splice(i, 1);
//       }
//     }

//     setTimeout(() => {
//       this.attacking = false;
//     }, attackDuration * 16);
//   }
// }

// class Enemy {
//   constructor(x, y) {
//     this.sprite = createSprite(x, y, 30, 30);
//     this.sprite.shapeColor = color(255, 0, 0);
//     this.speed = 2;
//   }

//   moveTowardPlayer(player) {
//     let angle = atan2(
//       player.sprite.position.y - this.sprite.position.y,
//       player.sprite.position.x - this.sprite.position.x
//     );
//     this.sprite.velocity.x = cos(angle) * this.speed;
//     this.sprite.velocity.y = sin(angle) * this.speed;
//   }
// }

// function spawnEnemy() {
//   let spawnX, spawnY;
//   do {
//     spawnX = random(20, worldSize.width - 20);
//     spawnY = random(20, worldSize.height - 20);
//   } while (dist(spawnX, spawnY, player.sprite.position.x, player.sprite.position.y) < 200);

//   let enemy = new Enemy(spawnX, spawnY);
//   enemies.push(enemy);
// }

// function mousePressed() {
//   player.attack();
// }














///////// Lerp Camera ///////////


let player;
let worldSize = { width: 2560, height: 2560 };
let objects = [];
let enemies = [];
let bgImage;
let rock;

// Enemy
let enemySpawnTimer = 0;
let enemySpawnInterval = 180;

// Player
let attackSprite = null;
let attackDuration = 15;
let attackTimer = 0;
let lastDirection = "down";
let playerSprites = {};

let shakeIntensity = 10;  // The intensity of the shake
let shakeDuration = 0;   

let originalCameraX, originalCameraY;  // Variables to store the original camera position


function preload() {
  bgImage = loadImage("assets/Map.png");
  rock = loadImage("assets/rock.png");

  // Load the sprite sheets and set up animations
  playerSprites.idleDown = loadSpriteSheet("assets/playeridledown.png", 96, 74, 8); // 8 frames
  playerSprites.runDown = loadSpriteSheet("assets/playerrundown.png", 96, 74, 8);
  playerSprites.attackDown = loadSpriteSheet("assets/playerattackdown.png", 96, 74, 5);

  playerSprites.idleUp = loadSpriteSheet("assets/playeridleup.png", 96, 74, 8);
  playerSprites.runUp = loadSpriteSheet("assets/playerrunup.png", 96, 74, 8);
  playerSprites.attackUp = loadSpriteSheet("assets/playerattackup.png", 96, 74, 5);

  playerSprites.idleLeft = loadSpriteSheet("assets/playeridleleft.png", 96, 74, 4);
  playerSprites.runLeft = loadSpriteSheet("assets/playerrunleft.png", 96, 74, 4);
  playerSprites.attackLeft = loadSpriteSheet("assets/playerattackleft.png", 96, 74, 5);

  playerSprites.idleRight = loadSpriteSheet("assets/playeridleright.png", 96, 74, 4);
  playerSprites.runRight = loadSpriteSheet("assets/playerrunright.png", 96, 74, 4);
  playerSprites.attackRight = loadSpriteSheet("assets/playerattackright.png", 96, 74, 5);
}

function setup() {
  createCanvas(1000, 680);
  noSmooth(); // Disable smoothing to prevent blurriness on scaled images

  player = new Player(worldSize.width / 2, worldSize.height / 2);
  
  for (let i = 0; i < 15; i++) {
    let obj = createSprite(
      random(20, worldSize.width - 20),
      random(20, worldSize.height - 20), 64, 64
    );
    obj.addImage(rock);
    obj.scale = 1.2;
    objects.push(obj);
  }
}

function draw() {
  // Store the original camera position before shake
  originalCameraX = camera.position.x;
  originalCameraY = camera.position.y;

  // Apply screen shake effect if necessary
  if (shakeDuration > 0) {
    camera.position.x += random(-shakeIntensity, shakeIntensity);
    camera.position.y += random(-shakeIntensity, shakeIntensity);
    shakeDuration--; // Decrease shake duration
  }

  // Clamp camera to the bounds of the world after shake effect
  let halfWidth = width / 2;
  let halfHeight = height / 2;
  camera.position.x = constrain(camera.position.x, halfWidth, worldSize.width - halfWidth);
  camera.position.y = constrain(camera.position.y, halfHeight, worldSize.height - halfHeight);

  // Ensure the camera always follows the player (or adjust as needed)
  camera.position.x = lerp(camera.position.x, player.sprite.position.x, 0.1);  // Smooth transition to player position
  camera.position.y = lerp(camera.position.y, player.sprite.position.y, 0.1);

  // Background follows camera
  image(bgImage, 0, 0, worldSize.width, worldSize.height);
  player.move();

  enemySpawnTimer++;
  if (enemySpawnTimer >= enemySpawnInterval) {
    spawnEnemy();
    enemySpawnTimer = 0;
  }

  for (let enemy of enemies) {
    enemy.moveTowardPlayer(player);
    drawSprite(enemy.sprite);
  }

  for (let obj of objects) {
    drawSprite(obj);
  }

  if (attackSprite) {
    drawSprite(attackSprite);
    attackTimer--;
    if (attackTimer <= 0) {
      attackSprite.remove();
      attackSprite = null;
    }
  }

  drawSprite(player.sprite);
  drawSprites();
}

class Player {
  constructor(x, y) {
    this.sprite = createSprite(x, y, 40, 40);
    this.sprite.shapeColor = color(0, 0, 255);
    this.sprite.scale = 3;
    this.verticalSpeed = 5; // Speed for up/down movement
    this.horizontalSpeed = 6; // Speed for left/right movement
    this.attacking = false;

    // Initialize player animations
    this.sprite.addAnimation("idleDown", playerSprites.idleDown);
    this.sprite.addAnimation("runDown", playerSprites.runDown);
    this.sprite.addAnimation("attackDown", playerSprites.attackDown);

    this.sprite.addAnimation("idleUp", playerSprites.idleUp);
    this.sprite.addAnimation("runUp", playerSprites.runUp);
    this.sprite.addAnimation("attackUp", playerSprites.attackUp);

    this.sprite.addAnimation("idleLeft", playerSprites.idleLeft);
    this.sprite.addAnimation("runLeft", playerSprites.runLeft);
    this.sprite.addAnimation("attackLeft", playerSprites.attackLeft);

    this.sprite.addAnimation("idleRight", playerSprites.idleRight);
    this.sprite.addAnimation("runRight", playerSprites.runRight);
    this.sprite.addAnimation("attackRight", playerSprites.attackRight);

    // Set frame delay for specific animations (idling and attacking)
    this.sprite.animations["idleDown"].frameDelay = 10; // Adjust speed for idle animation
    this.sprite.animations["attackDown"].frameDelay = 5; // Adjust speed for attack animation

    this.sprite.animations["idleUp"].frameDelay = 10; // Adjust speed for idle animation
    this.sprite.animations["attackUp"].frameDelay = 5; // Adjust speed for attack animation

    this.sprite.animations["idleLeft"].frameDelay = 10; // Adjust speed for idle animation
    this.sprite.animations["attackLeft"].frameDelay = 5; // Adjust speed for attack animation

    this.sprite.animations["idleRight"].frameDelay = 10; // Adjust speed for idle animation
    this.sprite.animations["attackRight"].frameDelay = 5; // Adjust speed for attack animation
  }

  move() {
    if (this.attacking) return;
    let newX = this.sprite.position.x;
    let newY = this.sprite.position.y;

    // Check for horizontal movement (left/right)
    if (keyIsDown(65)) { // 'A' key
      newX -= this.horizontalSpeed; // Use horizontal speed
      lastDirection = "left";
    }
    if (keyIsDown(68)) { // 'D' key
      newX += this.horizontalSpeed; // Use horizontal speed
      lastDirection = "right";
    }

    // Check for vertical movement (up/down)
    if (keyIsDown(87)) { // 'W' key
      newY -= this.verticalSpeed; // Use vertical speed
      lastDirection = "up";
    }
    if (keyIsDown(83)) { // 'S' key
      newY += this.verticalSpeed;
      lastDirection = "down";
    }

    if (this.canMoveTo(newX, newY)) {
      this.sprite.position.x = newX;
      this.sprite.position.y = newY;
    }
    this.updateAnimation();
  }

  canMoveTo(x, y) {
    if (x < 40 || x > worldSize.width - 40 || y < 63 || y > worldSize.height - 40) {
      return false;
    }
    for (let obj of objects) {
      if (
        x > obj.position.x - obj.width &&
        x < obj.position.x + obj.width &&
        y > obj.position.y - obj.height &&
        y < obj.position.y + obj.height 
      ) {
        return false;
      }
    }
    return true;
  }

  updateAnimation() {
    if (this.attacking) {
      if (lastDirection === "left") {
        this.sprite.changeAnimation("attackLeft");
      } else if (lastDirection === "right") {
        this.sprite.changeAnimation("attackRight");
      } else if (lastDirection === "up") {
        this.sprite.changeAnimation("attackUp");
      } else {
        this.sprite.changeAnimation("attackDown");
      }
    } else if (keyIsDown(65) || keyIsDown(68) || keyIsDown(87) || keyIsDown(83)) {
      // Running
      if (lastDirection === "left") {
        this.sprite.changeAnimation("runLeft");
      } else if (lastDirection === "right") {
        this.sprite.changeAnimation("runRight");
      } else if (lastDirection === "up") {
        this.sprite.changeAnimation("runUp");
      } else {
        this.sprite.changeAnimation("runDown");
      }
    } else {
      // Idle
      if (lastDirection === "left") {
        this.sprite.changeAnimation("idleLeft");
      } else if (lastDirection === "right") {
        this.sprite.changeAnimation("idleRight");
      } else if (lastDirection === "up") {
        this.sprite.changeAnimation("idleUp");
      } else {
        this.sprite.changeAnimation("idleDown");
      }
    }
  }

  attack() {
    if (this.attacking || attackSprite) return;
    this.attacking = true;
    let attackSize = 70;
    attackSprite = createSprite(this.sprite.position.x, this.sprite.position.y, 40, 40);
    attackSprite.visible = false;
    
    // Attack hitbox setup
    if (lastDirection === "left") {
      attackSprite.position.x -= attackSize;
      attackSprite.width = 90;
      attackSprite.height = 70;
    } else if (lastDirection === "right") {
      attackSprite.position.x += attackSize;
      attackSprite.width = 115;
      attackSprite.height = 90;
    } else if (lastDirection === "up") {
      attackSprite.position.y -= attackSize;
      attackSprite.width = 115;
      attackSprite.height = 60;
    } else if (lastDirection === "down") {
      attackSprite.position.y += attackSize;
      attackSprite.width = 100;
      attackSprite.height = 70;
    }
  
    attackTimer = attackDuration;
  
    // Check for collisions with enemies
    for (let i = enemies.length - 1; i >= 0; i--) {
      if (attackSprite.overlap(enemies[i].sprite)) {
        enemies[i].sprite.remove();
        enemies.splice(i, 1);

        // Trigger screen shake when enemy is destroyed
      shakeDuration = 20;  // Adjust duration for how long the shake should last
      }
    }
  
    // Set the attack animation based on direction
    if (lastDirection === "left") {
      this.sprite.changeAnimation("attackLeft");
    } else if (lastDirection === "right") {
      this.sprite.changeAnimation("attackRight");
    } else if (lastDirection === "up") {
      this.sprite.changeAnimation("attackUp");
    } else {
      this.sprite.changeAnimation("attackDown");
    }
  
    // Reset attacking state after the attack duration
    setTimeout(() => {
      this.attacking = false;
      // After the attack, switch back to the idle or run animation based on last direction
      this.updateAnimation();
    }, attackDuration * 16);
  }
}

class Enemy {
  constructor(x, y) {
    this.sprite = createSprite(x, y, 30, 30);
    this.sprite.shapeColor = color(255, 0, 0);
    this.speed = 2;
  }
  moveTowardPlayer(player) {
    let angle = atan2(
      player.sprite.position.y - this.sprite.position.y,
      player.sprite.position.x - this.sprite.position.x
    );
    this.sprite.velocity.x = cos(angle) * this.speed;
    this.sprite.velocity.y = sin(angle) * this.speed;
  }
}

function spawnEnemy() {
  let spawnX, spawnY;
  do {
    spawnX = random(20, worldSize.width - 20);
    spawnY = random(20, worldSize.height - 20);
  } while (dist(spawnX, spawnY, player.sprite.position.x, player.sprite.position.y) < 200);
  let enemy = new Enemy(spawnX, spawnY);
  enemies.push(enemy);
}

function mousePressed() {
  player.attack();
}