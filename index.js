function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('end').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('uf').value=("");
}

function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById('end').value=(conteudo.logradouro);
    document.getElementById('bairro').value=(conteudo.bairro);
    document.getElementById('cidade').value=(conteudo.localidade);
    document.getElementById('uf').value=(conteudo.uf);
} //end if.
else {
    //CEP não Encontrado.
    limpa_formulário_cep();
    alert("CEP não encontrado.");
}
}

function pesquisacep(valor) {

//Nova variável "cep" somente com dígitos.
var cep = valor.replace(/\D/g, '');

//Verifica se campo cep possui valor informado.
if (cep != "") {

    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if(validacep.test(cep)) {

        //Preenche os campos com "..." enquanto consulta webservice.
        document.getElementById('end').value="...";
        document.getElementById('bairro').value="...";
        document.getElementById('cidade').value="...";
        document.getElementById('uf').value="...";

        //Cria um elemento javascript.
        var script = document.createElement('script');

        //Sincroniza com o callback.
        script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

        //Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);

    } //end if.
    else {
        //cep é inválido.
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
    }
} //end if.
else {
    //cep sem valor, limpa formulário.
    limpa_formulário_cep();
}
};

function mascara(i,t){
   
    var v = i.value;
    
    if(isNaN(v[v.length-1])){ // impede entrar outro caractere que não seja número
       i.value = v.substring(0, v.length-1);
       return;
    }
    
    if(t == "cpf"){
        i.setAttribute("maxlength", "14");
        if (v.length == 3 || v.length == 7) i.value += ".";
        if (v.length == 11) i.value += "-";
     }

     if(t == "rg"){
        i.setAttribute("maxlength", "12");
        if (v.length == 2 || v.length == 6) i.value += ".";
        if (v.length == 10) i.value += "-";
     }

     if(t == "cep"){
        i.setAttribute("maxlength", "9");
        if (v.length == 5) i.value += "-";
     }

     if(t === "tel"){
        if (v.length === 1) i.value = "(" + i.value;
        if (v.length === 3) i.value += ") ";
        if(v[5] == 9){
           i.setAttribute("maxlength", "15");
           if (v.length === 10) i.value += "-";
        }else{
           i.setAttribute("maxlength", "14");
           if (v.length === 9) i.value += "-";
        }
      }

      if(t === "cel"){
        if (v.length === 1) i.value = "(" + i.value;
        if (v.length === 3) i.value += ") ";
        if(v[5] == 9){
           i.setAttribute("maxlength", "16");
           if (v.length === 10) i.value += "-";
        }else{
           i.setAttribute("maxlength", "15");
           if (v.length === 9) i.value += "-";
        }
      }
 
 }
function limpa_formario_data(){
	document.getElementById('dNasci').value=("");

 const inputNasc = document.getElementById("dNasci");

document.querySelector("form").addEventListener("submit", function(){
  //obter array com [ano,mes,dia] através de split("-") e convertendo em numero com Map
  let nasc = inputNasc.value.split("-").map(Number);
  //construir data 18 anos a seguir a data dada pelo usuario
  let depois18Anos = new Date(nasc[0] + 18, nasc[1] - 1, nasc[2]);
  let agora = new Date();
  
  if (depois18Anos <= agora){
    limpa_formario_data();
  }
  else {
    alert("Favor preencher com uam data válida");
  }
});
}

