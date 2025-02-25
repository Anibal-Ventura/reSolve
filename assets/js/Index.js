import { mostrarPassos, getPropTable } from "./Quimica.js";
import { converterSistemas } from "./conversorNumero.js";

const buttons = document.querySelectorAll("button");
const programs = document.querySelector("#programa");

programs.addEventListener('click', e => {
  console.log(e.target.id)
  switch(e.target.id) {
    case "ok_quimica":
      const input = document.querySelector("#input_numeroAtomico");
      const form = document.querySelector("#quimica_form").addEventListener("submit", async (e) =>{
        e.preventDefault()
        if(!input.value){
          return alert("o campo não pode estar vázio");
        }
        if(input.value > 118 || isNaN(input.value))
          return alert("Não consigo realizar a operacao!");

        const answerPlace = document.querySelector("#quimica_steps");
        mostrarPassos(answerPlace, input.value);
        const nomeElemento = await getPropTable(Number(input.value))
        const x = document.querySelector("#x").innerHTML=`<sub>${nomeElemento[0].numeroAtomico}</sub>${nomeElemento[0].simbolo}`;
        const grupoPos = document.querySelector("#quimica-grupo-posicao");
        grupoPos.innerHTML = `G:${nomeElemento[0].grupo} P:${nomeElemento[0].posição}`;
        const eN = document.querySelector("#elementName").innerText = nomeElemento[0].nome;
      })
      break;
    case "ok_conversor_num":
      const input2 = document.querySelector("input");
      const form2 = document.querySelector("form").addEventListener("submit", (e) => {
          e.preventDefault();
          const answerPlace2 = document.querySelector("#answerPlace");
          const selectTwo = document.querySelector("#saida_opcao");
          const selectOne = document.querySelector("#entrada_opcao");
        
          answerPlace2.innerHTML = converterSistemas(input2.value, selectOne.value, selectTwo.value);
        });
      break;
    default:
      break;
  }
})

const resolver = {
  "Distribuicao Eletrônica": () => {
    programs.innerHTML=`
    <form id="quimica_form" class="flex flex-col gap-3">
          <label for="input_numeroAtomico" class="text-black ">Numero Atomico</label>
          <div class="flex">
            <input id="input_numeroAtomico" placeholder="Insira o numero atomico"
              class="w-full px-3 py-2 bg-white text-black rounded-l-md">
            <button class="px-5 py-3 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-r-md text-white"
              id="ok_quimica">ok</button>
          </div>
        </form>
        <div class="flex bg-white p-5 rounded" id="quimica_steps">
          Exemplo de saida:1s2 2s2 2p6
        </div>
        <div class="grid grid-cols-3 gap-3">
          <div class="bg-white p-5 rounded text-center">
            <span class="font-bold" id="x">
              <sub>n</sub>X<sup>z</sup></span>
          </div>
          <div class="bg-white p-5 rounded text-center">
            <span class="font-bold" id="elementName">Nome</span>
          </div>
          <div class="bg-white p-5 rounded text-center">
            <span class="font-bold" id="quimica-grupo-posicao">G:x P:y</span>
          </div>

        </div>
    `;
    
  },
  "Conversor entre sistemas de numeração": () => {
    programs.innerHTML=`
     <form class="w-full flex flex-col  gap-3">
          <p>Conversor entre sistemas de numeração</p>
          <input type="text" placeholder="Insira um numero" class="w-full px-5 py-3 bg-slate-100  border-b border-b-black rounded">
          <div class="flex flex-col">
            <label for="entrada_opcao">Entrada</label>
            <select id="entrada_opcao" class="w-full px-5 py-3 bg-slate-100 border-b border-b-black rounded">
              <option value="2">Binário</option>
              <option value="8">Octal</option>
              <option value="10">Decimal</option>
              <option value="16">Hexadecimal</option>
            </select>
          </div>

          <div class="flex flex-col">
            <label for="saida_opcao" >Saida</label>
            <select id="saida_opcao" class="w-full px-5 py-3 bg-slate-100 border-b border-b-black rounded">
              <option value="2">Binário</option>
              <option value="8">Octal</option>
              <option value="10">Decimal</option>
              <option value="16" selected>Hexadecimal</option>
            </select>
          </div>

          <button class="px-5 py-3 bg-gradient-to-b from-indigo-500 to-purple-500 rounded text-white w-full" id="ok_conversor_num">Converter</button>
          <div id="answerPlace" class=" w-full p-4 bg-slate-100"></div>

        </form>`;
  },
  "Outros...": () => alert("Brevemente..."),
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    resolver[button.innerText]();
  });
});
