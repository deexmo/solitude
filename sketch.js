// player
let player;
let lastDirection = "down";
let playerSprites = {};
// player attack
let attackSprite = null;
let attackDuration = 15;
let attackTimer = 0;

// world
let worldSize = { width: 2560, height: 2560 };
let objects = [];
let enemies = [];
let bgImage;
let rock;

// enemies
let enemySpawnTimer = 0;
let enemySpawnInterval = 120;
let bigEnemySpawnTimer = 0;
let bigEnemySpawnInterval = 240;
let biggerEnemySpawnTimer = 0;
let biggerEnemySpawnInterval = 720;

// kill counter
let kills = 0;

// screen shake
let shakeIntensity = 8;
let shakeDuration = 0;

let gameState = 0;

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
  // prevent blurriness on player sprite (scaled up)
  noSmooth();

  // spawn player in middle of world
  player = new Player(worldSize.width / 2, worldSize.height / 2);

  // creates and stores rocks
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

  if (gameState === 0) {
    background(0); // black background
    textSize(32);
    fill(255);
    textAlign(CENTER, CENTER);
    text("Press SPACE to Start", width / 2, height / 2);
  } else if (gameState === 1) {
    // background
    image(bgImage, 0, 0, worldSize.width, worldSize.height);

    // store original camera position before screen shake
    let originalCameraX = camera.position.x;
    let originalCameraY = camera.position.y;

    // if screen shake is active, apply random shaking to the camera position
    if (shakeDuration > 0) {
      camera.position.x = originalCameraX + random(-shakeIntensity, shakeIntensity);
      camera.position.y = originalCameraY + random(-shakeIntensity, shakeIntensity);
      shakeDuration--;  // Decrease shake duration
    } else {
      // when shake is done, reset the camera to follow the player
      let halfWidth = width / 2;
      let halfHeight = height / 2;

      // clamp the camera position within the world bounds
      camera.position.x = constrain(player.sprite.position.x, halfWidth, worldSize.width - halfWidth);
      camera.position.y = constrain(player.sprite.position.y, halfHeight, worldSize.height - halfHeight);
    }

    // function for player movement
    player.move();

    drawSprite(player.sprite);
    drawSprites();
    drawKillCounter();

    enemySpawnTimer++;
    if (enemySpawnTimer >= enemySpawnInterval) {
      spawnEnemy();
      enemySpawnTimer = 0;
    }
    bigEnemySpawnTimer++;
    if (bigEnemySpawnTimer >= bigEnemySpawnInterval) {
      spawnBigEnemy();
      bigEnemySpawnTimer = 0;
    }
    biggerEnemySpawnTimer++;
    if (biggerEnemySpawnTimer >= biggerEnemySpawnInterval) {
      spawnBiggerEnemy();
      biggerEnemySpawnTimer = 0;
    }

    // enemy moves toward player
    for (let enemy of enemies) {
      enemy.moveTowardPlayer(player);
      drawSprite(enemy.sprite);
    }

    // draws the rocks
    for (let obj of objects) {
      drawSprite(obj);
    }

    if (attackSprite) {
      drawSprite(attackSprite)      // if attackiong, draw hit box
      attackTimer--;                // attack timer
      if (attackTimer <= 0) {       // once timer hits zero,
        attackSprite.remove();      // remove the attack sprite
        attackSprite = null;
      }
    }
  }
}

function keyPressed() {
  if (key === ' ' && gameState === 0) { // Check if the spacebar is pressed and we're on the start screen
    gameState = 1; // Change to game screen
  }
}

class Player {
  constructor(x, y) {
    this.sprite = createSprite(x, y, 40, 40);
    this.sprite.shapeColor = color(0, 0, 255);
    // increases sprite size
    this.sprite.scale = 3;
    this.verticalSpeed = 5;
    this.horizontalSpeed = 6;
    this.attacking = false;

    // establish player animations
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

    // frame delay for specific animations (idling and attacking)
    // higher number = slower animation
    this.sprite.animations["idleDown"].frameDelay = 10;
    this.sprite.animations["attackDown"].frameDelay = 5;

    this.sprite.animations["idleUp"].frameDelay = 10;
    this.sprite.animations["attackUp"].frameDelay = 5;

    this.sprite.animations["idleLeft"].frameDelay = 10;
    this.sprite.animations["attackLeft"].frameDelay = 5;

    this.sprite.animations["idleRight"].frameDelay = 10;
    this.sprite.animations["attackRight"].frameDelay = 5;
  }

  move() {
    if (this.attacking) return;
    let newX = this.sprite.position.x;
    let newY = this.sprite.position.y;

    // moves player left and right
    if (keyIsDown(65)) {  // A key
      newX = newX - this.horizontalSpeed
      lastDirection = "left";
    }
    if (keyIsDown(68)) {  // D key
      newX = newX + this.horizontalSpeed;
      lastDirection = "right";
    }
    // moves player up and down
    if (keyIsDown(87)) {  // W key
      newY = newY - this.verticalSpeed;
      lastDirection = "up";
    }
    if (keyIsDown(83)) {  // S key
      newY = newY + this.verticalSpeed;
      lastDirection = "down";
    }

    // allows player to move through map
    if (this.canMoveTo(newX, newY)) {
      this.sprite.position.x = newX;
      this.sprite.position.y = newY;
    }

    // updates the animation based on last direction
    this.updateAnimation();
  }

  canMoveTo(x, y) {
    // keeps player within world
    if (x < 40 || x > worldSize.width - 40 || y < 63 || y > worldSize.height - 40) {
      return false;
    }
    // prevents player from running through rocks
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
    if (this.attacking || attackSprite)
      return;
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

        kills++;
        shakeDuration = 5;
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
      // after  attack, switch back to the idle in last direction faced
      this.updateAnimation();
    }, attackDuration * 20);
  }
}

class Enemy {
  constructor(x, y) {
    this.sprite = createSprite(x, y, 30, 30);
    this.sprite.shapeColor = color(255, 0, 0);
    this.speed = 3;
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

class BigEnemy {
  constructor(x, y) {
    this.sprite = createSprite(x, y, 60, 80);
    this.sprite.shapeColor = color(0, 255, 0);
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

class BiggerEnemy {
  constructor(x, y) {
    this.sprite = createSprite(x, y, 80, 100);
    this.sprite.shapeColor = color(0, 0, 255);
    this.speed = 5;
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
  let spawnX = random(20, worldSize.width - 20);
  let spawnY = random(20, worldSize.height - 20);

  let enemy = new Enemy(spawnX, spawnY);
  enemies.push(enemy);
}

function spawnBigEnemy() {
  let spawnX = random(20, worldSize.width - 20);
  let spawnY = random(20, worldSize.height - 20);

  let bigEnemy = new BigEnemy(spawnX, spawnY);
  enemies.push(bigEnemy);
}

function spawnBiggerEnemy() {
  let spawnX = random(20, worldSize.width - 20);
  let spawnY = random(20, worldSize.height - 20);

  let biggerEnemy = new BiggerEnemy(spawnX, spawnY);
  enemies.push(biggerEnemy);
}

function drawKillCounter() {
  let x = camera.position.x - width / 2 + width - 20;
  let y = camera.position.y - height / 2 + 20;

  fill(255, 0, 0);
  textSize(24);
  textAlign(RIGHT, TOP);
  text("Kills: " + kills, x, y);
}

function mousePressed() {
  player.attack();
}