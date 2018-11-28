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
var star1;
var star2;
var star3;
var star4;
var star5;
var plataforma1;
var plataforma2;
var plataforma3;
var plataforma4;


function preload() {
    game.load.image('sky', 'assets/spring2.png');
	game.load.image('ground', 'assets/platform.png');
	game.load.image('blocks', 'assets/chao1.png');
	game.load.spritesheet('jogador', 'assets/dude.png', 32, 48);
	game.load.image('star', 'assets/duff.png');
	game.load.audio('som','assets/mordidaa.mp3');
	
	game.load.image('cogumelo', 'assets/barra.png');	
	game.load.audio('tema', 'assets/theme.mp3');		
	game.load.audio('fim', 'assets/oooh.mp3');
	
}

function create() {
		
	game.physics.startSystem(Phaser.Physics.ARCADE);		
    game.add.sprite(0, 0, 'sky');

	
    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 10, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;
    
	ledge = platforms.create(0, 150, 'blocks');
    ledge.body.immovable = true;
	
	plataforma1 = platforms.create(0, 250, 'blocks');
	plataforma1.body.immovable = true;
	
	
	
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
	
	
	stars = game.add.group();
    stars.enableBody = true;
	
    for (var i = 0; i < 18; i++)
    {
        var star = stars.create
		(i * 35, 0, 'star');
        star.body.gravity.y = 300;
        star.body.bounce.y = 0.5 + Math.random() * 0.2;
    }
	
	
	
	
	cogumelos = game.add.group();
	cogumelos.enableBody = true;
	
	for (var i = 1; i < 2; i++){
        var cogumelo = cogumelos.create
		(i * 70, 300, 'cogumelo');
        cogumelo.body.gravity.y = 300;
        cogumelo.body.bounce.y = 
		0.5 + Math.random() * 0.2;
    }
	
	
	
    scoreText = game.add.text
	(16, 16, 'Rosquinhas: 0', 
	{ fontSize: '32px', fill: '#F00' }
	);
	
    cursors = game.input.keyboard.createCursorKeys();
	
	level = game.add.text
	(650, 16, 'Nível 2', 
	{ fontSize: '32px', fill: '#FFD851' }
	);
	
	stars = game.add.group();
stars.enableBody = true;

star1 = stars.create(35, 0, 'star');
star1.body.gravity.y = 200;

star2 = stars.create(200, 0, 'star');
star2.body.gravity.y = 200;

star3 = stars.create(300, 0, 'star');
star3.body.gravity.y = 200;

star4 = stars.create(400, 0, 'star');
star4.body.gravity.y = 200;

star5 = stars.create(500, 0, 'star');
star5.body.gravity.y = 200;
	
}

function update() {
	
	if(star1.position.y >=100){
		star1.kill();
		star1 = stars.create(35, 0, 'star');
		star1.body.gravity.y = 200;
	}
		
	if(star2.position.y >=510){
		star2.kill();
		star2 = stars.create(200, 0, 'star');
		star2.body.gravity.y = 200;
	}
		
	if(star3.position.y >=510){
		star3.kill();
		star3 = stars.create(300, 0, 'star');
		star3.body.gravity.y = 200;
	}
		
	if(star4.position.y >=510){
		star4.kill();
		star4 = stars.create(400, 0, 'star');
		star4.body.gravity.y = 200;
	}
	
	if(star5.position.y >=510){
		star5.kill();
		star5 = stars.create(500, 0, 'star');
		star5.body.gravity.y = 200;
	}
	
	
	var hitPlatform = game.physics.arcade.collide
	(player, platforms);
	
	
    game.physics.arcade.collide(stars, platforms);
	game.physics.arcade.collide(star2, plataforma1);
	
    game.physics.arcade.collide
	(cogumelos, platforms);
	
	
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
	
	
	if (cursors.up.isDown 
		&& 
		player.body.touching.down 
		&& 
		hitPlatform)
		{
			player.body.velocity.y = -350;
		}
		
		var p1 = game.physics.arcade.collide(player, plataforma1);
		
		if(plataforma1.position.x <= 600){ plataforma1.body.velocity.x = 50;}else{plataforma1.position.x = 0;}
	
}

function collectStar (player, star) {
    
	music.play();
	star.kill();
	score += 10;
	
	if(score < 180)
	{
		scoreText.text = 'Placar: ' + score;
		
		
	}else{
		
		window.location.replace("level3.html")
	}
	
}

function killPlayer (player, cogumelo) {
    
	fim = game.sound.play('fim');
	tema.stop();
	
	fim.play();
	player.kill();
		
	scoreText.text = 'Oohhhh';	
	
}