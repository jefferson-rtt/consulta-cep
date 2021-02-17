var submitButton = document.querySelector('#app form button')
var zipCodeField = document.querySelector('#app form input')
var content = document.querySelector('#app main')

submitButton.addEventListener('click', run)

function run (event){
    event.preventDefault()

    var zipCode = zipCodeField.value

    // remover espacos indesejados
    zipCode = zipCode.replace(' ', '')
    zipCode = zipCode.replace('.', '')
    zipCode = zipCode.trim()

    // requisição
    axios.get('https://viacep.com.br/ws/'+ zipCode +'/json/')
    .then(function(response){
        if(response.data.erro){
            throw new Error ('CEP Inválido')
        }

        content.innerHTML = ''
        createLine(response.data.logradouro)
        createLine(response.data.localidade + " / " + response.data.uf)


    })
    .catch(function(error){
        content.innerHTML = ''
        createLine('Ops, algo deu errado!')
        // alert('Verifique o CEP digitado')
    })

}


function createLine(text){
    var line = document.createElement('p')
    var text = document.createTextNode(text)

    line.appendChild(text)
    content.appendChild(line)
}