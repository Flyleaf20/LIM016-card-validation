import validator from './validator.js';

const formulario = document.getElementById('formulario-tarjeta');
const numTarjeta = document.querySelector('#tarjeta .numero');
const nombreCliente  = document.querySelector('#tarjeta .nombre');
const mesSelect= document.querySelector('#tarjeta .mes');
const yearSelect= document.querySelector('#tarjeta .year');

const logoMarca = document.getElementById('logo-marca');
const btnVal= document.getElementById("boton_Pagar");


let meslabel= document.getElementById('meslabel');
let ccvlabel=document.getElementById('ccvlabel');
let nombreLabel=document.getElementById('nombreLabel');
let valida_invalida=document.getElementById('valida_invalida');

let overlay = document.getElementById("overlay");
let popup = document.getElementById("popup");
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//VALIDAR LA TARJETA Y DATOS
btnVal.addEventListener('click',(e)=>{
	e.preventDefault();
	const cardNumero= document.getElementById('inputNumero').value
  const nombreTitular = document.getElementById('inputNombres').value
  const mes= document.getElementById('selectMes').value
  const year=document.getElementById('selectYear').value
	const ccv=document.getElementById('inputccv').value
	const validaInvalida = document.getElementById('valida_invalida');


	if (cardNumero == null || cardNumero == 0){
		alert('Se debe ingresar datos')
	}else{
		validator.isValid(cardNumero)
	}
	if(validator.isValid(cardNumero) == true){
		validaInvalida.textContent = "Tarjeta Válida"
	}else{
	validaInvalida.textContent = "Tarjeta Invalida"
	}

	if(nombreTitular == null || nombreTitular == ''){
	nombreLabel.textContent = "Ingresar Nombre del Titular"
	}else{
	nombreLabel.textContent = "Dato Completado"
	}

	if(mes == 'Mes' || year == 'Año' ){
	meslabel.textContent = "Ingresar el Mes y Año correctamente"
	}else{
		meslabel.textContent = "Dato Completado"
	}

	if(ccv == null || ccv.length <=2 || ccv == ''){
	ccvlabel.textContent = "Ingresar CCV"
	}else{
		ccvlabel.textContent = "Dato Completado"
	}

if (meslabel.textContent == "Dato Completado" && ccvlabel.textContent == "Dato Completado" &&  nombreLabel.textContent == "Dato Completado" && valida_invalida.textContent=="Tarjeta Válida"){
overlay.classList.add('active');
popup.classList.add('active');
}



})
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const btnAceptar = document.getElementById('btn-aceptar-popup');
btnAceptar.addEventListener('click', function(){
	overlay.classList.remove('active');
	popup.classList.remove('active');
	formulario.reset();
	valida_invalida.textContent='';
	meslabel.textContent='';
	ccvlabel.textContent='';
	nombreLabel.textContent='';
	numTarjeta.textContent='#### #### #### ####';
	nombreCliente.textContent='**********************';
  mesSelect.textContent='MM';
	yearSelect.textContent='AA';
})


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Al escribir no acepta espacios y Se muestre en la tarjeta

formulario.inputNumero.addEventListener('keyup',(e)=> { //cuando el usaurio presiona la tecla y al soltar la tecla se ejcecuta este evento
let valorNum= e.target.value; //donde se recibe el evento en este caso la caja de texto de los números de la tarjeta de crédito
formulario.inputNumero.value= valorNum //permite pasar una expresión regular es un pequeño fractor de códigos
.replace(/\s/g,'') //  espacio en blanco el símbolo '' representa el espacio en blanco
  //.replace(/([0-9]{4})/g,'$1 ') formula para que se agrupe de 4 en 4
.trim(); // elimina los caracteres blancos iniciales y finales de la cadena
numTarjeta.textContent= valorNum;

	if( valorNum == ''){
		numTarjeta.textContent ="#### #### #### ####";
		logoMarca.innerHTML = '';
	}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Se muestra el logo de la tarjeta si comienza con 4 es VISA y con 5 es MasterCard
	if(valorNum[0] == 4){  //el simbolo [0] cuenta la posición
		logoMarca.innerHTML = '';
    const imagen = document.createElement('img');
		imagen.src= 'Imagenes/Visa.jpg';
		logoMarca.appendChild(imagen);
	}else if (valorNum[0] == 5) {
		logoMarca.innerHTML = '';
    const imagen = document.createElement('img');
		imagen.src= 'Imagenes/MasterCard.png';
		logoMarca.appendChild(imagen);

	}
      let resultNum= document.getElementById('h4');
      const maskNumbers=validator.maskify(valorNum);
      numTarjeta.innerHTML=maskNumbers;
			resultNum.innerHTML = maskNumbers;

});
//++++++++++++++++++++++++++++++++++++++++++++++++++++
//VALIDAR Nombres
formulario.inputNombres.addEventListener('keyup', (e) => { //keyup solo se utiliza en caja de textos
	let valorNom=e.target.value;
	let resultNom = document.getElementById('resultNom');
	formulario.inputNombres.value=valorNom.replace(/[0-9]/g, '');
	nombreCliente.textContent= valorNom;
	resultNom.innerHTML = valorNom;

	if( valorNom == ''){
		nombreCliente.textContent ="**********************";
	}
});
//++++++++++++++++++++++++++++++++++++++++++++++++++++
//VALIDAR MES Y AÑo
formulario.selectMes.addEventListener('change', (e) => { //ejecutar el código cada que hay un cambio en el select
mesSelect.textContent= e.target.value;
});
formulario.selectYear.addEventListener('change', (e) => { //ejecutar el código cada que hay un cambio en el select
yearSelect.textContent= e.target.value;
});
//++++++++++++++++++++++++++++++++++++++++++++++++++++
//VALIDAR SOLO NÚMEROS
let soloNum=document.getElementById('inputNumero')

soloNum.addEventListener('keypress', function(e){
	if(!soloNumeros(event)){
	e.preventDefault();
	}
});

let ccv=document.getElementById('inputccv')

ccv.addEventListener('keypress', function(e){
if(!soloNumeros(event)){
	e.preventDefault();
}
});

function soloNumeros(e){
    let key = e.keyCode ||  e.while;
    if( key >= 48 && key <= 57){
			return true;
		}else{
			alert("Ingresar solo Números");
	}}

//+++++++++++++++++++++++++++++++++++++++++++++++++++

//añadir elementos al select
//MESES
for(let i=1; i <= 12; i++){
let opciones = document.createElement('option');
opciones.value = i;
opciones.innerText = i;
formulario.selectMes.appendChild(opciones);
}
//AÑOS
const yearActual= new Date().getFullYear(); //fecha actual del sistema getFullYear es obtener el año completo es un método por eso se coloca parentesis
for(let i = yearActual; i <= yearActual + 8; i++){
	let opciones = document.createElement('option');
	opciones.value = i;
	opciones.innerText = i;
	formulario.selectYear.appendChild(opciones);
}
//++++++++++++++++++++++++++++++++++++++++++++++++++
//Ocultar
const imagenTitulo = document.getElementById('imagenTitulo');
const formularioDatos = document.getElementById('formularioDatos')
const formulario_Principal = document.getElementById('formulario_Principal')
const formularioTarjeta = document.getElementById('formularioTarjeta')
const suscripcion = document.getElementById('suscripcion')

imagenTitulo.addEventListener('click', function(){
	formularioDatos.style.display= 'block';
	imagenTitulo.style.display='none';
})

suscripcion.addEventListener('click', function(){
	formularioDatos.style.display= 'none';
	formulario_Principal.style.display='block';
	formularioTarjeta.style.display='block';
})



//++++++++++++++++++++++++++++++++++++++++++++++++++



//console.log(validator);
