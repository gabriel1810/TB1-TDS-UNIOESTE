let noticias = [
    {
        header: 'SUCESSO ABSOLUTO',
        titulo: 'PlayStation 2 vendeu 160 milhões de unidades, revelou Jim Ryan',
        data: '30/03/2024',
        img: '../imagens/imgPlay.jpg'
    },
    {
        header: 'SÓ NA CAPOEIRA',
        titulo: 'Tekken 8: Eddy Gordo ganha novo trailer e data de lançamento',
        data: '29/03/2024',
        img: '../imagens/eddy-gordo-tekken.jpg'
    },
    {
        header: 'TESTES',
        titulo: 'Age of Empire Mobile recebe beta para Android',
        data: '28/03/2024',
        img: '../imagens/age-of-empires-mobile.jpg'
    },
    {
        header: 'VAI DEMORAR UM POUCO',
        titulo: 'Nova saga de The Witcher ainda está em pré-produção',
        data: '27/03/2024',
        img: '../imagens/Nova-saga-de-The-Witcher.jpg'
    },
    {
        header: 'NOVO CAPÍTULO PARA O MMO',
        titulo: 'Guild Wars 3 já está em desenvolvimento, confirma NCSoft',
        data: '26/03/2024',
        img: '../imagens/Guild-Wars-3.jpg'
    },
]


const btnLoginNav = document.querySelector("#btnLoginNavbar");
btnLoginNav.addEventListener("click", function(){
    const formLogin = document.querySelector("#formularioLogin");
    if(formLogin.classList.value.includes("show"))
        formLogin.classList.remove("show")
    else
        formLogin.classList.add("show")
})

const linkCriarConta = document.querySelector(".linkNaoPossuiConta");
linkCriarConta.addEventListener("click", function(){
    window.location.href = "../cadastro/cadastro.html"
})


carregaListaNoticiasIniciais('colunaNoticiasIniciais');

async function carregaListaNoticiasIniciais(id){
    for(let i = 0; i < noticias.length; i++){
        let noticia = noticias[i];
        let divItemNoticia = `
        <div class="itemNoticia mt-4">
        <div class="imgNoticia">
          <img src="${noticia.img}" class="img-fluid">
        </div>
        <div class="textoNoticia col-8">
          <div>
            <h6 class="headingTxtNoticia">${noticia.header}</h6>
          </div>
          <div>
            <h5 class="tituloNoticia">${noticia.titulo}</h5>
          </div>
          <div class="divDataNoticia">
            <h6>${noticia.data}</h6>
          </div>
        </div>
      </div>
        `
        document.getElementById(id).innerHTML += divItemNoticia
    }
}
