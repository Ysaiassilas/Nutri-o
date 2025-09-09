document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dataForm');
    const alturaInput = document.getElementById('altura');
    const pesoInput = document.getElementById('peso');
    const resultadoImcDiv = document.getElementById('resultado-imc');
    const contatoInput = document.getElementById('contato');

    let contatoMaskInstance = null;
    let isMaskApplied = false;

    // A ordem é importante! A máscara mais longa deve vir primeiro.
    const telefoneMaskOptions = [
      { mask: '(00)0 0000-0000' }, // Máscara para 9 dígitos (ex: (99)9 9999-0000)
      { mask: '(00) 0000-0000' }  // Máscara para 8 dígitos (ex: (99) 9999-0000)
    ];
    const emailMask = { mask: /^\S*@?\S*$/ };

    // Função para aplicar a máscara correta
    const aplicarMascara = () => {
        const valorAtual = contatoInput.value.trim();
        const primeiroCaractere = valorAtual.charAt(0);
        const isNumero = !isNaN(parseInt(primeiroCaractere));
        
        if (isMaskApplied && (isNumero === (contatoInput.type === 'tel'))) {
            return;
        }

        if (contatoMaskInstance) {
            contatoMaskInstance.destroy();
            isMaskApplied = false;
        }

        if (isNumero) {
            contatoInput.placeholder = 'Telefone (Ex: (99)9 9999-0000)';
            contatoInput.type = 'tel';
            contatoMaskInstance = IMask(contatoInput, {
                mask: telefoneMaskOptions
            });
        } else {
            contatoInput.placeholder = 'E-mail (Ex: seuemail@dominio.com)';
            contatoInput.type = 'email';
            contatoMaskInstance = IMask(contatoInput, emailMask);
        }
        isMaskApplied = true;
    };

    contatoInput.addEventListener('input', () => {
        if (contatoInput.value.length > 0) {
            aplicarMascara();
        } else {
            if (contatoMaskInstance) {
                contatoMaskInstance.destroy();
                isMaskApplied = false;
                contatoInput.placeholder = 'Telefone ou E-mail';
                contatoInput.type = 'text';
            }
        }
    });

    const calcularEExibirIMC = () => {
        const altura = parseFloat(alturaInput.value);
        const pesoKg = parseFloat(pesoInput.value);

        if (altura > 0 && pesoKg > 0) {
            const imc = pesoKg / (altura * altura);
            resultadoImcDiv.textContent = `Seu IMC é: ${imc.toFixed(2)}`;
        } else {
            resultadoImcDiv.textContent = '';
        }
    };

    alturaInput.addEventListener('input', calcularEExibirIMC);
    pesoInput.addEventListener('input', calcularEExibirIMC);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const idade = parseInt(document.getElementById('idade').value);
        const sexo = document.getElementById('sexo').value;
        const altura = parseFloat(alturaInput.value);
        const pesoKg = parseFloat(document.getElementById('peso').value);
        const contato = contatoInput.value;

        if (altura > 3.99) {
            alert('A altura máxima permitida é de 3.99 metros.');
            return;
        }

        if (!nome || !idade || !sexo || !altura || !pesoKg || !contato) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const imc = pesoKg / (altura * altura);

        console.log('Dados submetidos:');
        console.log('Nome:', nome);
        console.log('Idade:', idade);
        console.log('Sexo:', sexo);
        console.log('Altura:', altura + ' metros');
        console.log('Peso:', pesoKg + ' kg');
        console.log('IMC Calculado:', imc.toFixed(2));
        console.log('Contato:', contato);
        
        alert('Dados confirmados com sucesso!\n\nIMC Calculado: ' + imc.toFixed(2));
    });
});