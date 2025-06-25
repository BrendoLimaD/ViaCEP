document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cadastro");
  const campos = ["nome", "email", "cep", "logradouro", "bairro", "cidade", "estado"];

  campos.forEach(campo => {
    const valorSalvo = localStorage.getItem(campo);
    if (valorSalvo) {
      document.getElementById(campo).value = valorSalvo;
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cadastro");
  const campos = ["nome", "email", "cep", "logradouro", "bairro", "cidade", "estado"];

  campos.forEach(campo => {
    const valorSalvo = localStorage.getItem(campo);
    if (valorSalvo) {
      document.getElementById(campo).value = valorSalvo;
    }
  });

  const cepInput = document.getElementById("cep");
  cepInput.addEventListener("blur", (evento) => {
    const cepInformado = evento.target.value.replace(/\D/g, "");

    if (cepInformado.length !== 8) return;

    fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
      .then(response => response.json())
      .then(data => {
        if (!data.erro) {
          document.getElementById("logradouro").value = data.logradouro || '';
          document.getElementById("bairro").value = data.bairro || '';
          document.getElementById("cidade").value = data.localidade || '';
          document.getElementById("estado").value = data.uf || '';
        } else {
          alert("CEP não encontrado.");
        }
      })
      .catch(error => {
        alert("Erro ao buscar o CEP.");
        console.error(error);
      });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    campos.forEach(campo => {
      const valor = document.getElementById(campo).value;
      localStorage.setItem(campo, valor);
    });
    alert("Dados salvos com sucesso!");
  });
});