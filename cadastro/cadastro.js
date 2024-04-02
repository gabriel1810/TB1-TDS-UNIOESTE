let estados = []

// Guardando uma referencia aos campos do fomulario
const selectEstado = document.querySelector("#selectEstado");
const selectCidade = document.querySelector("#selectCidade");
const btnPesquisaCEP = document.querySelector("#btnPesquisarCEP");
const campoCEP = document.querySelector("#cep");

// Carrega o select de estados com os dados proveninetes de getAllEstados()
async function carregaSelectEstados(){

    // Como o javascript é assincrono, deve-se deixar explicito que 
    // queremos aguardar o final da execucao de uma funcao com "await"
    estados = await getAllEstados()

    console.log(estados)
    // Para cada estado da lista de estados, cria um elemento <option>
    // com um id e nome, após isso faca append nos filhos do #selectEstado
    for( let i = 0; i < estados.length; i++){
        let opt = document.createElement("option")
        opt.innerText = estados[i].nome
        opt.value = estados[i].id
        selectEstado.appendChild(opt)
    }
}

// Monitora o selectEstado, cada vez que seu valor se alterar, chama a função 
// para adicionar as cidades do estado escolhido no select das cidades
selectEstado.addEventListener("change", function(){
    const estadoSelecionado = selectEstado.value;
    mudaCidadesDoSelect(estadoSelecionado);
})

// Chama a rotina de pesquisa de cep ao clicar no botão btnPesquisaCEP
btnPesquisaCEP.addEventListener("click", rotinaPesquisaCEP)

// Monitora todo o texto digitado no campo campoCEP, caso seja 13 (enter), chama
// a pesquisa de CEP
campoCEP.addEventListener("keyup", (e) => {e.keyCode == 13?rotinaPesquisaCEP():undefined})


// Rotina de atualizar as informações de endereço do formulario baseado no CEP
// digitado pelo usuario. Primeiro, faz uma requisicao a API viacep, para pegar
// as informacoes sobre aquele cep, apos isso, muda os campos a partir dos dados retornados
async function rotinaPesquisaCEP(){
    const cep = document.querySelector("#cep").value;

    // Nessa caso nao precisa de "await", pois ja estamos falando .then(), isso
    // faz com que o codigo dentro dos parenteses seja executado somente apos o termino
    // da chamada
    pesquisaCEP(cep).then(  async (response) => {
        document.querySelector("#selectEstado").value = await getIDPelaSigla(response.uf);
        await mudaCidadesDoSelect(document.querySelector("#selectEstado").value)
        document.querySelector("#selectCidade").value = response.localidade;
        document.querySelector("#logradouroEndereço").value = response.logradouro + " " + response.bairro
        document.querySelector("#numResidencia").value = ""
    })
}


// Vasculha a lista de estados procurando pelo ID de pesquisa do estado
// com base em sua sigla UF
async function getIDPelaSigla(uf){
    for(let i = 0; i < estados.length; i++){
        if(estados[i].sigla == uf)
            return estados[i].id
    }
    return null
}


// Recebe um ID do um estado, a partir dele, faz uma requisicao para
// obter todas as cidades pertencentes a aquele estado e cria os elementos
async function mudaCidadesDoSelect(id){
    let cidades = await getCidadesDoEstado(id);
    console.log(cidades)

    // Arrow function para remover todos os elementos que tem a classe 'cidade'
    document.querySelectorAll('.cidade').forEach(e => e.remove());

    // Cria elemento <option> para cada cidade retornada pela requisicao inicial
    for( let i = 0; i < cidades.length; i++){
        let opt = document.createElement("option")
        opt.innerText = cidades[i].nome
        opt.classList.add("cidade")
        selectCidade.appendChild(opt)
    }

}

// Pesquisa por dados de um CEP na api da viacep
async function pesquisaCEP(cep){
    try{
        let res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        return res.data;
    }
    catch(erro){
        console.log(erro)
    }
}


// Retorna todos os estados brasileiros
async function getAllEstados(){
    let res = await axios.get('https://www.geonames.org/childrenJSON?geonameId=3469034');
    let data = res.data.geonames
    console.log(data)

    // Criando um novo array de estados usando os campos adminCodes1, geonameId e name
    // vindos da requisicao GET, descartando campos inuteis
    const estados = data.map(({adminCodes1, geonameId, name}) => ({
        'sigla':adminCodes1.ISO3166_2,
        'id':geonameId,
        'nome':name }
    ))
    return estados
}

// Retorna todas as cidades de um estado pelo seu ID
async function getCidadesDoEstado(geonameId){
    let res = await axios.get(`https://www.geonames.org/childrenJSON?geonameId=${geonameId}`);
    let data = res.data.geonames

    // Constroi um array so com os nomes das cidades, os outros campos nao sao necessarios
    const cidades = data.map(({name}) => ({'nome':name }))
    return cidades;
}


document.getElementById("btnEnviarForm").addEventListener("click", function(event){
    event.preventDefault()
    validaCampos()
  });



function validaCampos(){
    const nomeUsuario = document.querySelector("#nomeUsuario")
    const enderecoEmail = document.querySelector("#emailUsuario")
    const confirmaEnderecoEmail = document.querySelector("#confirmaEmailUsuario")
    const senha = document.querySelector("#senhaUsuario")
    const confirmaSenha = document.querySelector("#confirmaSenhaUsuario")
    const nomePessoa = document.querySelector("#nomePessoa")
    const sobrenomePessoa = document.querySelector("#sobrenomePessoa")
    const dataNascimento = document.querySelector("#dataNascimento")
    let msg = ""

    if(!nomeUsuario.value || nomeUsuario.value.length < 2){
        msg += "O nome de usuário é obrigatório\n"
    }
    if(!enderecoEmail.value || enderecoEmail.value.length < 2){
        msg += "O email é obrigatório\n"
    }
    if(!confirmaEnderecoEmail.value || confirmaEnderecoEmail.value.length < 2){
        msg += "A confirmação de email é obrigatória\n"
    }
    if(enderecoEmail.value !=  confirmaEnderecoEmail.value){
        msg += "Os emails não correspondem\n"
    }
    if(!senha.value || senha.value.length < 8 || senha.value.length > 20){
        msg += "Senha inválida\n"
    }
    if(senha.value != confirmaSenha.value){
        msg += "As senhas não correspondem\n"
    }
    if(!nomePessoa.value || nomePessoa.value.length < 2){
        msg += "O seu nome é obrigatório\n"
    }
    if(!sobrenomePessoa.value || sobrenomePessoa.value.length < 2){
        msg += "O sobrenome é obrigatório\n"
    }
    if(!dataNascimento.value){
        msg += "A data de nascimento é obrigatória\n"
    }

    if(msg.length > 0){
        alert(msg)
    }
    else{
        let pessoa = {
            nomeUsuario: nomeUsuario.value,
            enderecoEmail: enderecoEmail.value,
            nome: nomePessoa.value,
            sobrenome: sobrenomePessoa.value,
            dataNascimento: dataNascimento.value
        }
        alert(JSON.stringify(pessoa));
    }

}
