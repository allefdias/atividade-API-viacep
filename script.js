document.getElementById('buscar').addEventListener('click', function() {
    const cep = document.getElementById('cep').value.replace(/\D/g, ''); // Remove caracteres não numéricos
    const resultadoDiv = document.getElementById('resultado');

    if (cep.length !== 8) {
        resultadoDiv.textContent = 'Por favor, insira um CEP válido.';
        return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                resultadoDiv.textContent = 'CEP não encontrado.';
            } else {
                resultadoDiv.innerHTML = `
                    <p><strong>Endereço:</strong> ${data.logradouro}</p>
                    <p><strong>Bairro:</strong> ${data.bairro}</p>
                    <p><strong>Cidade:</strong> ${data.localidade}</p>
                    <p><strong>Estado:</strong> ${data.uf}</p>
                `;
            }
        })
        .catch(error => {
            resultadoDiv.textContent = 'Erro ao buscar o endereço.';
            console.error('Erro:', error);
        });
});
