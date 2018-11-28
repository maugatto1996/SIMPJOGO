var game = new Phaser.Game
(800, 500, Phaser.AUTO, '', { 
preload: preload, 
create: create, 
update: update 
});

var score = 0;
var texto;
var stars;
var sprite;
var teste = true;
var contador = 0;

function preload() {
	
    game.load.image('sky', 'assets/sky.png');
	game.load.image('ground', 'assets/platform.png');		
	game.load.spritesheet('jogador', 'assets/dude.png', 32, 48);
	game.load.image('star', 'assets/star.png');
	game.load.image('cogumelo', 'assets/cogumelo.png');
}

function create() {
		
	game.physics.startSystem(Phaser.Physics.ARCADE);		
    game.add.sprite(0, 0, 'sky');
	
    platforms = game.add.group();
    platforms.enableBody = true;
	
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;
    
			
	
	texto = game.add.text(20, 20, 'Pontos: 0', { fontSize: '18px', fill: '#222' });
	
	player = game.add.sprite(650, game.world.height - 150, 'jogador');
    
	game.physics.arcade.enable(player);
    
	player.body.bounce.y = 0.1;
    player.body.gravity.y = 600;
    player.body.collideWorldBounds = true;
	
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
	
	cursors = game.input.keyboard.createCursorKeys();
	
	if(teste){	
		createStars('star');
	}	
	
}


function update() {	
	
	var hitPlatform = game.physics.arcade.collide(player, platforms);
	game.physics.arcade.collide(stars, platforms);
	game.physics.arcade.overlap(player, stars, countPoints,	null, this);
	
	move(hitPlatform);
	
}

//controla os movimentos do player
function move(hitPlatform){
	
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
		
	if (cursors.up.isDown && player.body.touching.down && hitPlatform)
	{
		player.body.velocity.y = -350;
	}
}

//cria o contador de pontos
function countPoints(player, star){
	
	star.kill();
	score += 10;
	contador += 1;
	
	if(contador >= 5){
		
		contador = 0;
		
		if(teste){
			teste = !teste;
		}else{
			teste = true;
		}
		
		if(!teste){
			createStars('cogumelo');
		}else{
			createStars('star');
		}		
		
	}
	
	texto.text = "Pontos: " + score;
}

//cria os objetos coletáveis
function createStars(sprite){
	
	stars = game.add.group();
    stars.enableBody = true;
	
    for (var i = 1; i < 6; i++)
    {
        var star = stars.create(i * 100, 0, sprite);
        star.body.gravity.y = 300;
        star.body.bounce.y = 0.5 + Math.random() * 0.2;
    }
}
