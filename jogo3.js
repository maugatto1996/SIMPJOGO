var game = new Phaser.Game
(800, 600, Phaser.AUTO, '', 
{ 
	preload: preload, 
	create: create, 
	update: update 
});

var player;
var platforms;
var cursors;
var stars;
var score = 0;
var scoreText;
var music;
var level;
var cogumelos;
var tema;
var fim;
var plataforma1;
var plataforma2;
var plataforma3;
var plataforma4;
var ground;
var plataforma5;


function preload() {
    game.load.image('sky', 'assets/spring2.png');
	game.load.image('ground', 'assets/platform.png');
	game.load.image('blocks', 'assets/chao1.png');
	game.load.spritesheet('jogador', 'assets/dude.png', 32, 48);
	game.load.image('star', 'assets/nacho.png');
	game.load.audio('som','assets/mordidaa.mp3');
	
	game.load.image('cogumelo', 'assets/barra.png');	
	game.load.audio('tema', 'assets/som3.mp3');		
	game.load.audio('fim', 'assets/oooh.mp3');
	
}

function create() {
		
	game.physics.startSystem(Phaser.Physics.ARCADE);		
    game.add.sprite(0, 0, 'sky');

	
    platforms = game.add.group();
    platforms.enableBody = true;
    ground = platforms.create(0, game.world.height - 10, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;
    
	plataforma4 = platforms.create(0, 150, 'blocks');
	plataforma4.body.immovable = true;
	
	plataforma1 = platforms.create(0, 250, 'blocks');
	plataforma1.body.immovable = true;
	
	plataforma2 = platforms.create(450, 350, 'blocks');
	plataforma2.body.immovable = true;
	
	plataforma3 = platforms.create(200, 450, 'blocks');
	plataforma3.body.immovable = true;
	
	plataforma5 = platforms.create(100, 520, 'blocks');
	plataforma5.body.immovable = true;
	
	
	
	platforms = platforms.create(0, 100, 'blocks');
	platforms.body.immovable = true;
	
	
	
	createStars('star');
	

	
	music = game.sound.play('som');
	tema = game.sound.play('tema');
	tema.play();
	
	
	player = game.add.sprite(32, game.world.height - 150, 'jogador');
    
	game.physics.arcade.enable(player);
    
	player.body.bounce.y = 0.1;
    player.body.gravity.y = 600;
    player.body.collideWorldBounds = true;
	
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
	
	cursors = game.input.keyboard.createCursorKeys();
	
    scoreText = game.add.text(16, 16, 'Taco: 0', { fontSize: '32px', fill: '#F00' });
	
    cursors = game.input.keyboard.createCursorKeys();
	
	level = game.add.text(650, 16, 'NIVEL 3', { fontSize: '32px', fill: '#000000' });
	
}

function update() {
	
	
	var hitPlatform = game.physics.arcade.collide(player, ground);
	
	var p1 = game.physics.arcade.collide(player, plataforma1);
	var p2 = game.physics.arcade.collide(player, plataforma2);
	var p3 = game.physics.arcade.collide(player, plataforma3);
	var p4 = game.physics.arcade.collide(player, plataforma4);
	var p5 = game.physics.arcade.collide(player, plataforma5);
    game.physics.arcade.collide(player, platforms);
	
    game.physics.arcade.collide(cogumelos, platforms);
	
	
	game.physics.arcade.overlap(
	player, 
	stars, 
	collectStar, 
	null, 
	this);
	
	
	game.physics.arcade.overlap(
	player, 
	cogumelos, 
	killPlayer, 
	null, 
	this);
	
	
    player.body.velocity.x = 0;
	
    if (cursors.left.isDown){		
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    else if (cursors.right.isDown){		
        player.body.velocity.x = 150;
        player.animations.play('right');
	}
    else{
        player.animations.stop();
        player.frame = 4;
    }
	
	
	if (cursors.up.isDown && player.body.touching.down && (hitPlatform || p1 || p2 || p3 || p4 || p5))
		{
			player.body.velocity.y = -350;
		}
		
		game.physics.arcade.collide(stars, plataforma1);
		game.physics.arcade.collide(stars, plataforma2);
		game.physics.arcade.collide(stars, plataforma3);
		game.physics.arcade.collide(stars, ground);
		game.physics.arcade.collide(stars, platforms);
		game.physics.arcade.collide(stars, plataforma5);
		
		if(plataforma1.position.x <= 600){ plataforma1.body.velocity.x = 50;}else{plataforma1.position.x = 0;}
		if(plataforma2.position.x >= 0){ plataforma2.body.velocity.x = -50;}else{plataforma2.position.x = 600;}
		if(plataforma3.position.x <= 600){ plataforma3.body.velocity.x = 50;}else{plataforma3.position.x = 0;}
	    if(plataforma4.position.x >= 0){ plataforma4.body.velocity.x = -50;}else{plataforma4.position.x = 600;}
}

function createStars(sprite){
	
	stars = game.add.group();
	stars.enableBody = true;
	
	for (var i = 1; i < 2; i++)
	{
		var star = stars.create(i * 100, 0, sprite);
		star.body.gravity.y = 300;
		star.body.bounce.y = 0.5 + Math.random() * 0.2;
	}
}

function collectStar (player, star) {
    
	music.play();
	star.kill();
	score += 10;
	
	if(score < 10)
	{
		scoreText.text = 'Placar: ' + score;
		
		
	}else{
		
		window.location.replace("index.html")
	}
	
}

function killPlayer (player, cogumelo) {
    
	fim = game.sound.play('fim');
	tema.stop();
	
	fim.play();
	player.kill();
		
	scoreText.text = 'Oohhhh';	
	
}




	