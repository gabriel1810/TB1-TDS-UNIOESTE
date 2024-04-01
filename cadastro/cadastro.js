

let estados = []



/*console.log(estados)
*/

const selectEstado = document.querySelector("#selectEstado");
const selectCidade = document.querySelector("#selectCidade");

async function carregaSelects(){
    estados = await getAllEstados()
    console.log(estados)
    for( let i = 0; i < estados.length; i++){
        let opt = document.createElement("option")
        opt.innerText = estados[i].name
        opt.value = estados[i].geonameId
        opt.classList.add("estado")
        selectEstado.appendChild(opt)
    }
}


selectEstado.addEventListener("change", function(){
    const estadoSelecionado = selectEstado.value;
    mudaCidadesDoSelect(estadoSelecionado);
})


async function mudaCidadesDoSelect(geonameId){
    let cidade = await getCidadesDoEstado(geonameId);
    console.log(cidade)
    document.querySelectorAll('.cidade').forEach(e => e.remove());

    for( let i = 0; i < cidade.length; i++){
        let opt = document.createElement("option")
        opt.innerText = cidade[i].name
        opt.value = cidade[i].geonameId
        opt.classList.add("cidade")
        selectCidade.appendChild(opt)
    }

}



async function getAllEstados(){
    let data = await axios.get('https://www.geonames.org/childrenJSON?geonameId=3469034');
    return data.data.geonames
}

async function getCidadesDoEstado(geonameId){
    let data = await axios.get(`https://www.geonames.org/childrenJSON?geonameId=${geonameId}`);
    return data.data.geonames
}