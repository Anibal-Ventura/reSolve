
export async function getPropTable(Atomic) {
  const res = await fetch("./TabelaPeriodicaCompleta.json");
  let data = await res.json();

  const chemicalElement = data.filter(elemento => elemento.numeroAtomico === Atomic);
  return chemicalElement;
}

const orbitais = [
    { nome: "1s", capacidade: 2 },
    { nome: "2s", capacidade: 2 },
    { nome: "2p", capacidade: 6 },
    { nome: "3s", capacidade: 2 },
    { nome: "3p", capacidade: 6 },
    { nome: "4s", capacidade: 2 },
    { nome: "3d", capacidade: 10 },
    { nome: "4p", capacidade: 6 },
    { nome: "5s", capacidade: 2 },
    { nome: "4d", capacidade: 10 },
    { nome: "5p", capacidade: 6 },
    { nome: "6s", capacidade: 2 },
    { nome: "4f", capacidade: 14 },
    { nome: "5d", capacidade: 10 },
    { nome: "6p", capacidade: 6 },
    { nome: "7s", capacidade: 2 },
    { nome: "5f", capacidade: 14 },
    { nome: "6d", capacidade: 10 },
    { nome: "7p", capacidade: 6 }
];
function distribuicaoEletronica(numeroAtomico) {
      let eletroesRestantes = numeroAtomico;
      let distribuicao = [];
      for (let i of orbitais) {
        if (eletroesRestantes === 0)
          break;
        let eletroesSubnivel = Math.min(eletroesRestantes, i.capacidade)
        eletroesRestantes -= eletroesSubnivel
        distribuicao.push(`${i.nome}<sup>${eletroesSubnivel}</sup>`);
      }
      return distribuicao.join(" ");
    }

    export const mostrarPassos = (element, value) => {
      Object.assign(element, {innerHTML:`<p>Z=${value}: `+ distribuicaoEletronica(value)})+`</p>`;
    
    }
    