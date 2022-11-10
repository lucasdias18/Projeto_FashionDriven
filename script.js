const nome = prompt('Qual é o seu nome?')

function carregarSite() {
    const pedidos_anteriores = axios.get("https://mock-api.driven.com.br/api/v4/shirts-api/shirts")
    pedidos_anteriores.then(carregarCamisas)
    pedidos_anteriores.catch(Erro)

    function carregarCamisas(resposta) {
        // console.log(resposta)
        const pedidos_camisas = document.querySelector('footer div')
        pedidos_camisas.innerHTML = ``
        for (i = 0; i < 10; i++) {
            pedidos_camisas.innerHTML += `<figure onclick='encomendaIdentica(this)'>
                                            <img src="${resposta.data[i].image}" />
                                            <figcaption><b>Criador: </b>${resposta.data[i].owner}</figcaption>
                                        </figure>`
        }
    }

    function Erro(erro) {
        alert('Deu ruim.')
    }
}

setInterval(carregarSite,1000)

function encomendaIdentica(camisa) {
    // confirm("Deseja fazer uma encomenda idêntica à camisa selecionada?")

    if (confirm("Deseja fazer uma encomenda idêntica à camisa selecionada?") === true ) {
        alert('Ok!')
    }

    else {
        alert('Não ok!')
    }
}

 function Erro(erro) {
    console.log("Status code: " + erro.response.status);
    console.log("Mensagem de erro: " + erro.response.data);
  }

function selecionarModelo(modelo) {
    let elementos = document.querySelectorAll('.modelo');
    for (i=0; i < elementos.length; i++) {
        elementos[i].classList.remove('selecionado');
    }
    modelo.classList.add('selecionado')
}

function selecionarGola(gola) {
    let elementos = document.querySelectorAll('.gola');
    for (i=0; i < elementos.length; i++) {
        elementos[i].classList.remove('selecionado');
    }
    gola.classList.add('selecionado')
}

function selecionarTecido(tecido) {
    let elementos = document.querySelectorAll('.tecido');
    for (i=0; i < elementos.length; i++) {
        elementos[i].classList.remove('selecionado');
    }
    tecido.classList.add('selecionado')
}

function ativarBotao() {
    let link = document.querySelector('input').value
    let selecionados = document.querySelectorAll('.selecionado')

    if (selecionados.length === 3 && link !== "") {
        const botao = document.querySelector('.finalizar-pedido')
        botao.children[1].innerHTML = `<button class='ativado' onclick="confirmarPedido()">Confirmar pedido</button>`
    }
}

setInterval (ativarBotao, 1000)


function confirmarPedido() {
    let selecionados = document.querySelectorAll('.selecionado')

    let model, neck, material;

    if (selecionados[0].parentNode.children[1] === 'T-Shirt') {
        model = 't-shirt'
    }

    else if (selecionados[0].parentNode.children[1] === 'Camiseta') {
        model = 'top-tank'
    }

    else {
        model = 'long'
    }

    if (selecionados[1].parentNode.children[1] === 'Gola V') {
        neck = 'v-neck'
    }

    else if (selecionados[1].parentNode.children[1] === 'Gola Redonda') {
        neck = 'round'
    }

    else {
        neck = 'polo'
    }

    if (selecionados[2].parentNode.children[1] === 'Seda') {
        material = 'silk'
    }

    else if (selecionados[2].parentNode.children[1] === 'Algodão') {
        material = 'cotton'
    }

    else {
        material = 'polyester'
    }

    const image = document.querySelector('input').value
    console.log(typeof(image))
    const owner = nome
    console.log(typeof(owner))
    const author = nome

    const dados = {"model": model, "neck": neck, "material": material, "image": image, "owner": owner, "author": author}
    console.log(dados)

    const enviar_pedido = axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts", dados)
    enviar_pedido.then(pedidoRealizado)
    enviar_pedido.catch(falhaPedido)

    function pedidoRealizado(resposta) {
        const statusResposta = resposta.status;
	    console.log(statusResposta);
    }

    function falhaPedido(erro) {
        console.log("Status code: " + erro.response.status);
        console.log("Mensagem de erro: " + erro.response.data);
        alert("Ops, não conseguimos processar sua encomenda")
    }
    
}