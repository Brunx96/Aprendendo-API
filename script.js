function consultaCEP(cep) {
   
    cep = cep.replace(/\D/g, ''); // expressão regular -> regex
 
    if(cep != "") {

        const padraoCep = /^[0-9]{8}$/; // regex

        if (padraoCep.test(cep)) { 
            
            document.querySelector('#bairro').setAttribute('readonly', '')
 
       
        const requisicao = new Request(`https://viacep.com.br/ws/${cep}/json`, {
            "method": "GET",
            "headers": {
                "Content-type": "appication/json"
            }
        });
       
       
        fetch(requisicao)
        .then(resposta => resposta.json())
        .then(resposta => {

        if (!(resposta.erro)) 

            document.querySelector('#logradouro').value = resposta.logradouro;
            document.querySelector('#bairro').value = resposta.bairro;
            document.querySelector('#cidade').value = resposta.localidade;
            document.querySelector('#uf').value = resposta.uf;
        })
       
    }else{ // caso o cep esteja fora do padrão
        
        limpaForm();
        window.alert(`Cep não localizado`);

        document.querySelector('#bairro').removeAttribute('readonly');
        document.querySelector('#cidade').removeAttribute('readonly');
        document.querySelector('#uf').removeAttribute('readonly');

        document.querySelector('#logadouro').focus();
    }

    }else{ // caso o cep esteja vazio
        
        limpaForm();
        window.alert(`Digite um CEP!`);
    }
} // fecha a função

function limpaForm() {
    document.querySelectorAll('input:not(#cep)').forEach(input => {
        input.value = '';
    })
}