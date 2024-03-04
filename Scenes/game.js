// variaveis para o jogo
var jogador;
var teclado;
var plataforma, plataforma2;
var moeda;
var pontuacao = 0;
var placar;

//guardando os valores da altura e largura do jogo em uma lista
const canvas = [700, 850];

class Game extends Phaser.Scene {

    constructor() {
        super({
            key: 'Game', 
            physics: {
                arcade: {
                    debug: false,
                    gravity: { y:500 }
                }
            }
        })
    }

    preload() {
        this.load.image('background', 'assets/FundoJogo.png'); //carregando o fundo
        this.load.spritesheet('player', 'assets/GraveRobber_walk.png', { frameWidth: 48, frameHeight: 48 });// carregando o personagem
        //this.load.image('turbo_nave', 'assets/turbo.png');//carregando o fogo
        this.load.image('plataforma', 'assets/plataforma2.png');//carregando a plataforma
        this.load.image('moeda', 'assets/moeda1.png');//carrega a moeda
    }

    create() {
        this.add.image(0, 0, 'background').setSize(1600, 1200).setScale(2); // criando o fundo
        
        this.anims.create({
            key: 'andar',
            frame: this.anims.generateFrameNumbers('player', { star:0, end:5 }),
            framreRate: 10,
            Repeat: -1
        })

        //jogador = this.physics.add.sprite(canvas[0]/2, 0, 'jogador')


        
        jogador = this.physics.add.sprite(canvas[0]/2, 0, 'player'); // criando o jogador e adicionando uma sprite que se afeta pela fisica do jogo
        jogador.setCollideWorldBounds(true); // ativando os limites fisicos das bordas da tela do jogo
    
        teclado = this.input.keyboard.createCursorKeys(); //acessando as telas do teclado
        
        plataforma = this.physics.add.staticImage(canvas[0]/2, canvas[1]/2, 'plataforma').setSize(134.5, 70).setScale(0.5); //adicione a plataforma
        this.physics.add.collider(jogador, plataforma); //declarando que a colisão entre jogador e plataforma devem acontecer

        plataforma2 = this.physics.add.staticImage(canvas[0]/4, canvas[1]/4, 'plataforma').setSize(134.5, 70).setScale(0.5); //adicione a plataforma
        this.physics.add.collider(jogador, plataforma2); //declarando que a colisão entre jogador e plataforma devem acontecer

        //adicionando a moeda
        moeda = this.physics.add.sprite(canvas[0]/4, canvas[1]/4 - 50, 'moeda').setSize(120, 90).setScale(.2);
        moeda.setCollideWorldBounds(true);
        moeda.setBounce(0.7);
        this.physics.add.collider(moeda, plataforma); //colisão entre moeda e plataforma 
        this.physics.add.collider(moeda, plataforma2); //colisão entre moeda e plataforma 

        // adicionando placar 
        placar = this.add.text(50, 50, 'Moedas:' + pontuacao, {fontSize:'45px', fill:'#495613'});

        // quando o jogador encostar na moeda..
        this.physics.add.overlap(jogador, moeda, function(){

            moeda.setVisible(false); // moeda fica invisivel

            var posicaoMoeda_Y = Phaser.Math.RND.between(50, 650); //sorteia numero
            moeda.setPosition(posicaoMoeda_Y, 100); //ajusta a posição da moeda

            pontuacao +=1; // soma pontuação
            placar.setText('Moeda: ' + pontuacao); // atualiza texto do placar

            moeda.setVisible(true); //ativa a visão da "nova moeda"
        });
    }

    update() {

        //movimento para esquerda [ <- ]
        if (teclado.left.isDown) {
            jogador.setVelocityX(-150);
            jogador.setFlip(true)
            
        }

        // movimento para direita [-> ]
        else if (teclado.right.isDown) {
            jogador.setVelocityX(150); 
            jogador.setFlip(false)
            
        }
        
        // sem movimento horizontal [ x = 0]
        else {jogador.setVelocityX(0);}

        //Movimento para cima [ ^ ]
        if (teclado.up.isDown) {
            jogador.setVelocityY(-150); 

        }
    }

}