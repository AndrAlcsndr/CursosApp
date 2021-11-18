function validateData(){
  let iniDate = document.getElementById('validationServer02').value;
  let finDate = document.getElementById ('validationServer03').value;
  var data1 = new Date (iniDate);
  var data2 = new Date (finDate);
  var hoje = new Date ();
  var data_atual = new Date(hoje.getFullYear()+'-'+(hoje.getMonth()+1)+'-'+(hoje.getDate()+1));

   if (data1.getTime()==data2.getTime()){
     alert ("Datas sobrepostas. Digite uma data válida");
     let button = document.querySelector ('#submit');
     document.querySelector ("#validationServer02").className.value = 'is-invalid';
     button.disabled = true;

   }
   else if (data1.getTime()>data2.getTime()) {
     alert ("Data inválida!");
     let button = document.querySelector ('#submit');
     document.querySelector ("#validationServer02").className.value = 'is-invalid';
     button.disabled = true;

   }else if (data1.getTime()<data_atual.getTime()) {
    alert ("Você não pode adicionar um curso anterior a data atual: "+data_atual);
    let button = document.querySelector ('#submit');
    document.querySelector ("#validationServer02").className.value = 'is-invalid';
    button.disabled = true;

  }
   console.log (data_atual);

}
