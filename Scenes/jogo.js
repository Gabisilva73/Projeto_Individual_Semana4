var plataforma;
var moeda;
var placar; 
var pontos = 0; 

class Jogo extends Phaser.Scene {

    // Construtor da cena
    constructor() {
        super({
            key: 'Jogo',
            // Configurações específicas da cena podem ser adicionadas aqui
            physics: {
               arcade: {
                debug: false,
                gravity: { y: 50}
               } 
            } 
        });
    }

    // Inicialização de variáveis e configurações da cena
    init() {
        // 1) FUNDO
        // A imagem do fundo possui 1200 de largura e 400 de altura.
        // Mas somente uma janela de 400x400 é exibida por vez.
        // Essa janela vai se alterando, simulando o movimento do fundo
        // As variáveis possibilitam o controle da janela em exibição
        this.fundo = {
            x_start: 0,
            x: 0,
            y: 8,
            x_end: -400,
            obj: null
        };

        // 4) CONTROLES DA RODADA
        this.gameControls = {
            over: false,
            current_col_scored: false,
            score: 0,
            restartBt: null
        };

        this.plataforma ={
            obj: null
        };
    }


    // Pré-carregamento de recursos
    preload() {
        this.load.image('fundo', 'assets/FundoJogo.png');
        this.load.spritesheet('personagem', 'assets/GraveRobber_walk.png',{ frameWidth: 48, frameHeight: 48 });
        this.load.image('restart', 'assets/restart_bt.png');
        this.load.image('plataforma', 'assets/plataforma2.png');
        this.load.image('moeda', 'assets/moeda1.png');
    }

    // Criação de elementos e configurações iniciais da cena
    create() {
        // 1) Adiciona a imagem de fundo
           this.fundo.obj = this.add.image(this.fundo.x, this.fundo.y, 'fundo').setOrigin(0, 0);

        // 3) Adiciona jogador e suas propriedades físicas
           this.personagem.obj = this.physics.add.sprite(170, 130, 'personagem').setScale(2.0);
           this.personagem.obj.body.setSize(30, 50, true);
           this.personagem.obj.setCollideWorldBounds(true);
        
        //2) adiciona a plataforma, seu tamanho e colisão 
        this.plataforma.obj = this.physics.add.staticImage(300, 300, 'plataforma').setSize(80,50).setScale(0.15);
        this.plataforma.obj = this.physics.add.staticImage(400, 400, 'plataforma').setSize(80,50).setScale(0.15);
        this.plataforma.obj = this.physics.add.staticImage(560, 250, 'plataforma').setSize(80,50).setScale(0.15);
        this.plataforma.obj = this.physics.add.staticImage(200, 190, 'plataforma').setSize(80,50).setScale(0.15);
        this.plataforma.obj = this.physics.add.staticImage(130, 350, 'plataforma').setSize(80,50).setScale(0.15);

        this.physics.add.collider(personagem, plataforma);

        //tentando adicionar a moeda
        this.moeda = this.physics.add.image(100 , 100, 'moeda').setScale(0.2);
        this.physics.add.collider(this.personagem, this.plataforma);
        this.moeda.setCollideWorldBounds(true);

        // 4) Adiciona animação da imagem do jogador
        this.anims.create({
            key: 'personagem',
            frames: this.anims.generateFrameNumbers('personagem', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        // 5) Adiciona a animação do movimento do jogador
        this.personagem.obj.anims.play('personagem');

        // 6) Adiciona os cursores que movimentarão o jogador
        this.cursors = this.input.keyboard.createCursorKeys();
        this.pointer = this.input.activePointer;

        // 8) Mostra o placar
        this.scoreText = this.add.text(15, 15, this.game.name + ': 0', { fontSize: '20px', fill: '#000' });
        this.highScoreText = this.add.text(0, 15, 'high score: ' + this.game.highScore, { fontSize: '20px', fill: '#000', align: 'right' });
        this.highScoreText.x = this.game.config.width - this.highScoreText.width - 15;
        this.gameControls.restartBt = this.add.image(this.game.config.width / 2 - 50, this.game.config.height / 4 * 3,
            'restart').setScale(.2).setOrigin(0, 0).setInteractive().setVisible(false);

    }
    // Atualização lógica do jogo a cada frame
    update() {
       
        // Inclui controle de movimentação do personagem + adição de condicional
        if (this.cursors.left.isDown)
            this.personagem.obj.setX(this.personagem.obj.x - 5);
        else if (this.cursors.right.isDown)
            this.personagem.obj.setX(this.personagem.obj.x + 5);
        else if (this.cursors.up.isDown || this.cursors.space.isDown || this.pointer.isDown)
            this.personagem.obj.setY(this.personagem.obj.y - this.game.config.physics.arcade.gravity.y);
        else if (this.cursors.down.isDown)
            this.personagem.obj.setY(this.personagem.obj.y + this.game.config.physics.arcade.gravity.y);
    }
}
