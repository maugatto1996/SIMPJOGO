var game = new Phaser.Game (800, 600, Phaser.AUTO, '',
{ preload: preload, create: create, update: update });
 
var star1;
var star2;
var star3;
var star4;
var star5;
var stars;
var platforms;
var pisos;
var ground;
var player;

function preload(){
	game.load.image('sky','assets/spring2.png');
	game.load.image('ground', 'assets/platform.png');
	game.load.image('star', 'assets/duff.png')
	game.load.image('blocks', 'assets/chao1.png')
	game.load.spritesheet('jogador', 'assets/dude.png', 32, 48);
}

function create(){

game.physics.startSystem(Phaser.Physics.ARCADE);
game.add.sprite(0, 0, 'sky');

platforms = game.add.group();
platforms.enableBody = true;

ground = platforms.create(0, game.world.height - 64, 'ground');
ground.scale.setTo(2, 2);
ground.body.immovable = true;

stars = game.add.group();
stars.enableBody = true;

star1 = stars.create(35, 0, 'star');
star1.body.gravity.y = 200;

star2 = stars.create(85, 0, 'star');
star2.body.gravity.y = 200;

star3 = stars.create(135, 0, 'star');
star3.body.gravity.y = 200;

star4 = stars.create(185, 0, 'star');
star4.body.gravity.y = 200;

star5 = stars.create(235, 0, 'star');
star5.body.gravity.y = 200;

    pisos = game.add.group();
	pisos.enableBody = true;
	
	var ledge = pisos.create(10, 100, 'blocks');
	ledge.body.immovable = true;
	
	ledge = pisos.create(150, 450, 'blocks');
	ledge.body.immovable = true;
	

	player = game.add.sprite(32, game.world.height - 500, 'jogador');
	game.physics.arcade.enable(player);
		
	player.body.bounce.y = 0.1;
	player.body.gravity.y = 600;
	player.body.collideWorldBounds = true;
	
	player.animations.add('left', [0, 1, 2 ,3], 10, true);
	player.animations.add('right', [5, 6, 7, 8], 10, true);
	
	cursors = game.input.keyboard.createCursorKeys();
	

}

function update() {
	
	game.physics.arcade.collide(stars, ground);
	game.physics.arcade.collide(stars, pisos);
	game.physics.arcade.collide(player, pisos);
	game.physics.arcade.collide(player, star5);
	
	if(star1.position.y >=510){
		star1.kill();
		star1 = stars.create(35, 0, 'star');
		star1.body.gravity.y = 200;
	}
		
	if(star2.position.y >=510){
		star2.kill();
		star2 = stars.create(85, 0, 'star');
		star2.body.gravity.y = 200;
	}
		
	if(star3.position.y >=510){
		star3.kill();
		star3 = stars.create(135, 0, 'star');
		star3.body.gravity.y = 200;
	}
		
	if(star4.position.y >=510){
		star4.kill();
		star4 = stars.create(185, 0, 'star');
		star4.body.gravity.y = 200;
	}
	
	if(star5.position.y >=510){
		star5.kill();
		star5 = stars.create(235, 0, 'star');
		star5.body.gravity.y = 200;
	}
	
	var hitPlatform = game.physics.arcade.collide(player, platforms);
		player.body.velocity.x = 0;
		
		if (cursors.right.isDown){
			player.body.velocity.x = 350;
			player.animations.play('right');
		}
		else if (cursors.left.isDown){
			player.body.velocity.x = -350;
			player.animations.play('left');
		}
		
		else{
			player.animations.stop();
			player.frame = 4;
		}
		
		if (cursors.up.isDown && player.body.touching.down && (hitPlatform || pisos))
		{
			player.body.velocity.y = -350;
		}
		
		game.physics.arcade.overlap(
	player, 
	star1, 
	collectStar, 
	null, 
	this);
	
	game.physics.arcade.overlap(
	player, 
	star2, 
	collectStar, 
	null, 
	this);
	
	game.physics.arcade.overlap(
	player, 
	star3, 
	collectStar, 
	null, 
	this);
	
	game.physics.arcade.overlap(
	player, 
	star4, 
	collectStar, 
	null, 
	this);
	
	game.physics.arcade.overlap(
	player, 
	star5, 
	collectStar, 
	null, 
	this);
}

function collectStar (player, star5) {
    
	
	star.kill();
	score += 10;
	
	if(score < 10)
	{
		scoreText.text = 'Placar: ' + score;
		
		
	}else{
		
		//window.location.replace("level4.html")
	}
	
}
	

	