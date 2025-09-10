// ==== Funções de utilitário para o contato ====
function normalizeLogin(value) {
    const v = String(value || '').trim();
    if (!v) return '';
    if (v.includes('@')) return v.toLowerCase();
    return v.replace(/\D/g, '');
}

function maskPhoneBR(digits) {
    const d = digits.replace(/\D/g, '').slice(0, 11);
    if (d.length <= 2) return `(${d}`;
    if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

// ===============================================

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dataForm');
    const alturaInput = document.getElementById('altura');
    const pesoInput = document.getElementById('peso');
    // Alterado para o novo ID do input
    const resultadoImcInput = document.getElementById('resultado-imc-input');
    const contatoInput = document.getElementById('contato');

    // === Lógica de máscara de contato integrada ===
    function applyContatoMask() {
        let val = contatoInput.value || '';
        val = val.trim();

        if (!val) {
            contatoInput.value = '';
            return;
        }

        if (val.includes('@')) {
            contatoInput.setAttribute('inputmode', 'email');
            contatoInput.maxLength = 254;
            contatoInput.value = val;
            return;
        }

        if (/^[\d()\s\-]*$/.test(val)) {
            const digits = val.replace(/\D/g, '');
            contatoInput.setAttribute('inputmode', 'tel');
            contatoInput.maxLength = 16;
            contatoInput.value = maskPhoneBR(digits);
        } else {
            contatoInput.setAttribute('inputmode', 'email');
            contatoInput.maxLength = 254;
            contatoInput.value = val;
        }
    }

    if (contatoInput) {
        applyContatoMask();
        contatoInput.addEventListener('input', applyContatoMask);
        contatoInput.addEventListener('blur', applyContatoMask);
        contatoInput.addEventListener('paste', () => setTimeout(applyContatoMask, 0));
    }
    // ===============================================

    const calcularEExibirIMC = () => {
        const altura = parseFloat(alturaInput.value);
        const pesoKg = parseFloat(pesoInput.value);

        if (altura > 0 && pesoKg > 0) {
            const imc = pesoKg / (altura * altura);
            // Alterado para o .value do input
            resultadoImcInput.value = `Seu IMC é: ${imc.toFixed(2)}`;
        } else {
            // Limpa o valor do input se os campos não estiverem preenchidos
            resultadoImcInput.value = '';
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
        const contatoNormalizado = normalizeLogin(contato);

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
        console.log('Contato Normalizado:', contatoNormalizado);
        
        alert('Dados confirmados com sucesso!\n\nIMC Calculado: ' + imc.toFixed(2));
    });
});