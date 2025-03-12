const moment = require('moment');

const main = () =>{
    const dada = moment();

    const dataNascimento = moment('30/06/1995', 'DD/MM/YYYY');
    console.log(dataNascimento);

    if(!dataNascimento.isValid()){
        console.log('Data invalida');
        process.exit(1);
    }

    const ano = dataNascimento.diff(dataNascimento, 'years');
    const mes = dataNascimento.diff(dataNascimento, 'months');
    const dia = dataNascimento.diff(dataNascimento, 'days');

    console.log('Idade')
}

main()