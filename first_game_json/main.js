'use strict'
const Game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-canvas', { preload, create, update })
// добавяме достъп до Second_Lvl.js
Game.state.add("2roNivo", Second_Lvl)

let player
let PlayerSpeed = 300
let JumpSpeed = 300
let ground
let ground2
let ground_contin
let treat
let stairs
let cv1
let black
let ex
let explosion
let myText , HPtrue = 3
let dino
let dinodesert
let cactus
let bullet, bullets, bulletCounter = 0, bulletC = 0

function preload() {
    Game.load.image('bg', 'images/istockphoto-1060876798-612x612.jpg')
    Game.load.image('dinodesert', 'images/dinodesert.png')
    Game.load.image('cactus', 'images/onlycactus3.png')
    Game.load.image('treat', 'images/Consumable_slurp.png')
    Game.load.spritesheet('player', 'images/Enemy_06-1.png', 94/3, 128/4)
    Game.load.spritesheet('dino', 'images/dinosaur.png', 533/6, 93)
    Game.load.image('ground', 'images/ground.jpg')
    Game.load.image('ground', 'images/ground.jpg')
    Game.load.spritesheet('ex', 'images/explosion.896x896.7x7.png', 896/7, 896/7)
    Game.load.image('stairs', 'images/mario_pipe.png')
    Game.load.image('cv1', 'images/cave.jpg')
    Game.load.image('black', 'images/black.jpg')
}

function create(){

    cv1 = Game.add.sprite(1000, 700, 'cv1')
    cv1.anchor.setTo(0.2)
    cv1.scale.setTo(4, 4)

    const bg  = Game.add.sprite(0, 0, 'bg')
    bg.width = Game.width*6
    bg.height = Game.height * 1.1
    Game.world.setBounds(0, 0, 800, 600)

    Game.world.setBounds(0, 0, 2900, 1500)

    treat = Game.add.sprite(40, 460, 'treat')
    treat.anchor.setTo(0.4)
    treat.scale.setTo(0.2, 0.2)
    Game.physics.arcade.enable(treat)

    player = Game.add.sprite(Game.width/4, Game.height/1.4, 'player')
    player.scale.setTo(3,3)
    player.anchor.setTo(0.5)
    Game.camera.follow(player)
    
    ground = Game.add.sprite(300, 600, 'ground')
    ground.anchor.setTo(0.2)
    ground.scale.setTo(5.06, 2)
    Game.physics.arcade.enable(ground)
    ground.body.immovable = true

    ground_contin = Game.add.sprite(2820, 600, 'ground')
    ground_contin.anchor.setTo(0.4)
    ground_contin.scale.setTo(5.06, 2)
    Game.physics.arcade.enable(ground_contin)
    ground_contin.body.immovable = true

    black = Game.add.sprite(1, 1420, 'black')
    black.scale.setTo(75, 1)
    Game.physics.arcade.enable(black)
    black.body.immovable = true
    //------------------lesson 2.0 in telerik------------------
    explosion = Game.add.sprite(treat.x , treat.y, 'ex')
    explosion.anchor.setTo(0.4)
    explosion.frame = 48
    explosion.animations.add('fire1', [1, 2, 3, 4,5, 6 ,7, ], 5, true)
    explosion.animations.add('fire2', [], 30, false)
    explosion.scale.setTo(2.4, 2.3)

    stairs = Game.add.sprite(1870, 480, 'stairs')
    stairs.scale.setTo(0.7, 1.1)
    Game.physics.arcade.enable(stairs)

    // Позволяване na физики
    Game.physics.arcade.enable(player)
    // слагане на гравитация na player
    player.body.gravity.y = 550

    // Забраняване на достъпа на player извън играта
    player.body.collideWorldBounds = true
    
    // Добавяне на анимации
    player.animations.add("Up", [9, 10, 11], 15, false)
    player.animations.add("Left", [3, 5, 4], 5, false)
    player.animations.add("Right", [6, 8, 7], 5, false)
    player.animations.add("Down", [0, 1, 2], 15, false)

    //-----------------DINO------ANIMATION-----------DINO------------------------DINO


    //ex.animations.add([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 1, )

    ground2 = Game.add.sprite(Game.width / 2 - 10, 410, 'ground')
    ground2.anchor.setTo(1)
    ground2.scale.setTo(2, 0.1)
    Game.physics.arcade.enable(ground2)
    ground2.body.immovable = true

    Game.stage.backgroundColour = '#ba34cp'

    myText = Game.add.text(Game.width/1.1, Game.height, "HP " + HPtrue, {font: 'bold 20pt Arial' , fill: "#ffffff"})
    //MyTrueText.setText = 'Hp = 3'
    myText.anchor.setTo(1) 
    console.log('myText: ', myText)
    myText.fixedToCamera = true

   // const Button1 = game.add.sprite(600, 200,"power")
//-------------------CAVE CAVE CAVE----------------------------

}

function update()//000000000000000000000000000000000000000000000000
{
     PlayerSpeed = 300   
     
    if(Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).isDown && ((Game.physics.arcade.collide(player, ground)) || 
    (Game.physics.arcade.collide(player, ground2))        ||
    (Game.physics.arcade.collide(player, ground_contin))  || 
    (Game.physics.arcade.collide(player, black))))
    {
        player.body.velocity.y = -JumpSpeed 
       
    }
//---------------------------slowdown--------------------------
    if(Game.physics.arcade.collide(player, ground2))
    {
        PlayerSpeed = 100
    }

    if(Game.physics.arcade.overlap(player, treat))
    {
        explosion.animations.play('fire1')
        explosion.animations.play('fire2')
        HPtrue = 2
        // преминаване към 2рото ниво
        Game.state.start("2roNivo")

        myText.setText("HP " + HPtrue)
        treat.kill()
    }

    
    //---------------------------keybinds-----------------
    if(Game.input.keyboard.addKey(Phaser.Keyboard.A).isDown){
        player.body.velocity.x = -PlayerSpeed
        player.animations.play("Left")
    }
    else if(Game.input.keyboard.addKey(Phaser.Keyboard.D).isDown){
        player.body.velocity.x = PlayerSpeed
        player.animations.play("Right")
    }else{
        player.body.velocity.x = 1
        player.frame = 1
    }
    
    
    
    bullets = Game.add.group();
    bullets.enableBody = true

    

    if(Game.input.keyboard.addKey(Phaser.Keyboard.E).isDown){
        bullet = bullets.create(player.x, player.y, "dino")
        bulletC = 1

        bullets.forEach(function(_BULLET){
        console.log("Hi")
        if(bulletC == 1){
            _BULLET.x += 8
        }
        })

        
    }

    Game.physics.arcade.collide(player, ground)
    Game.physics.arcade.collide(player, ground_contin)
    Game.physics.arcade.collide(player, black)
    Game.physics.arcade.collide(player, ground2)
    Game.physics.arcade.overlap(player, treat)
    
}
