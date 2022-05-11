'use strict'
const Second_Lvl = 
{
 
    preload: function(){

    },

    create: function(){


        const dd1 = Game.add.sprite(3, 363, 'dinodesert')
        dd1.width = Game.width*1
        dd1.height = Game.height * 0.3
        Game.physics.arcade.enable(dd1)
        dd1.body.immovable = true

        const dd2 = Game.add.sprite(363, 600, 'dinodesert')
        dd2.width = Game.width*1
        dd2.height = Game.height * 0.3
        Game.world.setBounds(0, 0, 800, 600)
        Game.physics.arcade.enable(dd2)
        dd2.body.immovable = true


        const cactus = Game.add.sprite(600, 307, 'cactus')
        cactus.width = 95
        cactus.height = 120
        Game.physics.arcade.enable(cactus)


        Game.stage.backgroundColor = 'FDFDFD'
        dino = Game.add.sprite(Game.width/4, Game.height/5, 'dino')
        dino.scale.setTo(1,1)
        dino.anchor.setTo(0.5)
        Game.camera.follow(dino)

        //game.physics.arcade.collide(dino, dd1)
        //game.physics.arcade.collide(dino, dd2)
    //-----------------DINO------ANIMATION-----------DINO------------------------DINO

        dino.animations.add("running", [0,2,3], 10, true)
        dino.animations.play("running")
        dino.animations.add("jumping", [5], 10, true)

        Game.physics.arcade.enable(dino)
        dino.body.gravity.y = 550
        dino.body.collideWorldBounds = true
    },

    update: function(){


        if(Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).isDown && ((Game.physics.arcade.collide(dino, ground)) || 
        (Game.physics.arcade.collide(dino, ground2))        ||
         (Game.physics.arcade.collide(dino, ground_contin)) || 
        (Game.physics.arcade.collide(dino, black))))
        {
            dino.animations.play("jumping")
            dino.body.velocity.y = -JumpSpeed 
        }

        if(Game.physics.arcade.collide(dino, ground))
        {
            dino.animations.play("running")
        }

        Game.physics.arcade.collide(dino, ground)
    },

}
