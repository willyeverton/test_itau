
function btnProcessOnClick() {
  var cpf = document.getElementById("cpf").value.replace(/[^0-9]/g, "");

  if (!validateCPF(cpf)) {
    return document.getElementById("content-body").innerHTML = '<div class="alert">Invalid CPF!</div>';
  }

  var xhttp = new XMLHttpRequest();

  xhttp.open("GET", 'https://challenge-november-temporary.vercel.app/users/' + cpf + '/cards', true);
  xhttp.setRequestHeader('Authorization', 'Bearer 87asd98a7sd87');
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      process(xhttp);

    }
  };
}

function process(xhttp) {
  var cartoes = JSON.parse(xhttp.responseText).data.cartoes;

  cartoes.sort(function (a, b) {
    return parseFloat(a.tipo)[0] - parseFloat(b.tipo)[0];
  });

  var result = '';
  cartoes.forEach(cartao => {
    result += '<div class="card">';
    result += '<div class="numero">' + cartao.numero + '</div>';
    result += '<div class="limite">' + cartao.limite + '</div>';
    result += '<div class="tipo">' + cartao.tipo + '</div>';
    result += '<div class="nome">' + cartao.nome + '</div>';
    result += '<div class="bandeira">' + cartao.bandeira + '</div>';
    result += '</div>';
  });

  document.getElementById("content-body").innerHTML = result;
}

function validateCPF(strCpf) {

  var soma;
  var resto;
  soma = 0;
  if (strCpf == "00000000000") {
    return false;
  }

  for (i = 1; i <= 9; i++) {
    soma = soma + parseInt(strCpf.substring(i - 1, i)) * (11 - i);
  }

  resto = soma % 11;

  if (resto == 10 || resto == 11 || resto < 2) {
    resto = 0;
  } else {
    resto = 11 - resto;
  }

  if (resto != parseInt(strCpf.substring(9, 10))) {
    return false;
  }

  soma = 0;

  for (i = 1; i <= 10; i++) {
    soma = soma + parseInt(strCpf.substring(i - 1, i)) * (12 - i);
  }
  resto = soma % 11;

  if (resto == 10 || resto == 11 || resto < 2) {
    resto = 0;
  } else {
    resto = 11 - resto;
  }

  if (resto != parseInt(strCpf.substring(10, 11))) {
    return false;
  }

  return true;
}

