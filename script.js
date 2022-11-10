const nome = prompt('Qual é o seu nome?')


function carregarSite() {
    const pedidos_anteriores = axios.get("https://mock-api.driven.com.br/api/v4/shirts-api/shirts")
    pedidos_anteriores.then(carregarCamisas)
    pedidos_anteriores.catch(Erro)

    function carregarCamisas(resposta) {
        const pedidos_camisas = document.querySelector('footer div')
        pedidos_camisas.innerHTML = ``
        for (i = 0; i < 10; i++) {
            pedidos_camisas.innerHTML += `<figure onclick='encomendaIdentica(this)'>
                                            <img src="${resposta.data[i].image}" />
                                            <figcaption><b>Criador: </b><span>${resposta.data[i].owner}</span></figcaption>
                                            <div class="dados">${resposta.data[i].material}</div>
                                            <div class="dados">${resposta.data[i].neck}</div>
                                            <div class="dados">${resposta.data[i].model}</div>
                                        </figure>`
        }

    }

    function Erro(erro) {
        alert('Deu ruim.')
    }
}


setInterval(carregarSite,500)


function encomendaIdentica(camisa) {
    const image = camisa.children[0].getAttribute('src')
    const owner = nome
    const material = camisa.children[2].innerHTML
    const neck = camisa.children[3].innerHTML
    const model = camisa.children[4].innerHTML
    const author = nome

    const encomenda_identica = {"model": model, "neck": neck, "material": material, "image": image, "owner": owner, "author": author}

    if (confirm("Deseja fazer uma encomenda idêntica à camisa selecionada?") === true ) {
        const enviar_pedido = axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts", encomenda_identica)
        enviar_pedido.then(pedidoRealizado)
        enviar_pedido.catch(falhaPedido)

        function pedidoRealizado(resposta) {
            alert("Encomenda realizada.")
        }

        function falhaPedido(erro) {
            alert("Ops, não conseguimos processar sua encomenda.")
        }
    }

    else {
        alert('Não ok!')
    }
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
        botao.children[1].classList.add('ativado')
    }
}


setInterval (ativarBotao, 1000)


function confirmarPedido() {
    let selecionados = document.querySelectorAll('.selecionado')
    let model, neck, material;
    let botao = document.querySelector('.finalizar-pedido > button')

    if (botao.classList.contains('ativado') === true) {

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
        const owner = nome
        const author = nome

        const dados = {"model": model, "neck": neck, "material": material, "image": image, "owner": owner, "author": author}

        const enviar_pedido = axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts", dados)
        enviar_pedido.then(pedidoRealizado)
        enviar_pedido.catch(falhaPedido)

        function pedidoRealizado(resposta) {
            alert("Encomenda realizada.")
        }

        function falhaPedido(erro) {
            alert("Ops, não conseguimos processar sua encomenda.")
        }
    }
}