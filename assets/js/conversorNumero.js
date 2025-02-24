let steps = [];
export function converterSistemas(valor, entrada, saida) {
    const numero = valor.replace(',', '.'); // Substitui vírgula por ponto
    const baseEntrada = parseInt(entrada, 10);
    const baseSaida = parseInt(saida, 10);
    let resultadoDiv;

    try {
    const numeroDecimal = parseInt(numero, baseEntrada);
    if (isNaN(numeroDecimal)) {
        throw new Error(`"${numero}" não é um número válido na base ${baseEntrada}.`);
    }

    let numeroConvertido;
    if (numero.includes('.')) {
        const [parteInteira, parteFracionaria] = numero.split('.');
        const parteDecimal = parseInt(parteInteira, baseEntrada) || 0;

        let parteFracDecimal = 0;
        for (let i = 0; i < parteFracionaria.length; i++) {
        parteFracDecimal += parseInt(parteFracionaria[i], baseEntrada) / Math.pow(baseEntrada, i + 1);
        }

        const numeroCompleto = parteDecimal + parteFracDecimal;

        const parteInteiraSaida = Math.floor(numeroCompleto).toString(baseSaida);
        let parteFracionariaSaida = '';
        let fracao = numeroCompleto - Math.floor(numeroCompleto);

        while (fracao > 0 && parteFracionariaSaida.length < 10) {
        fracao *= baseSaida;
        const digito = Math.floor(fracao);
        parteFracionariaSaida += digito.toString(baseSaida);
        fracao -= digito;
        }

        numeroConvertido = parteFracionariaSaida
        ? `${parteInteiraSaida}.${parteFracionariaSaida}`
        : parteInteiraSaida;
    } else {
        numeroConvertido = parseInt(numero, baseEntrada).toString(baseSaida);
    }

    resultadoDiv = `O número "${numero}" na base ${baseEntrada} é equivalente a "${numeroConvertido}" na base ${baseSaida}.`;
    } catch (error) {
    resultadoDiv = `<span style="color: red;">Erro: ${error.message}</span>`;
    }

    return resultadoDiv;
}



//957483412
