const redline = require('readline')
const rl = redline.createInterface({
    input:process.stdin,
    output: process.stdout
})

// rl.question('você está gostando de NODEJS? ',resposta =>{
//     console.log(`Sua resposta foi ${resposta} !!!`)
//     rl.close()
// })

rl.question('Qua a jogada? Pedra, Papel ou Tesoura? ', resposta =>{
    const opcoes = {
        pedra:1,
        papel:2,
        tesoura:3
    };

    const escolhaUsuario = opcoes[resposta]
    const escolhaComputador = Math.round(Math.random() * 2 ) + 1

    if((escolhaUsuario === 1 && escolhaComputador === 3) ||
       (escolhaUsuario === 2 && escolhaComputador === 1) ||
       (escolhaUsuario === 3 && escolhaComputador === 2) ){
        console.log("Você Ganhou");
    } else if( escolhaUsuario ===  escolhaComputador){
        console.log("Vocês Empataram!")
    } else {
        console.log("Você perdeu")
    }

    rl.close();
})