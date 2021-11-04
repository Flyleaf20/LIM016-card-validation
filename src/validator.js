const validator = {
  isValid: function(creditCardNumber) {
    //Primero invertiremos los numeros ingresados
    const newArray= creditCardNumber.split('').reverse().join('');

    //Creamos un ciclo for para que recorra por toda la cadena e identifique a los indices pares y los multiplique *2, y los indices impares los deje tal cual.
    let t='';
    for (let i = 0; i < newArray.length; i++) {
        let c=newArray[i]
        if (i % 2 !== 0)
        c *= 2;
        t = t + c;
    }
    //Se crea otro ciclo for para que recorra toda la cadena y sume los digitos individualmente
    let n=0;
    for ( let i = 0; i < t.length; i++) {
        let c=parseInt(t.charAt(i),10);
        n= n + c
    }
    //  Se crea una condicional para que la suma de los digitos sean diferente a 0 o el residuo de dividirlo/10 sea igual a 0//
    if (n != 0 && n % 10 == 0) {
        return true
    } else {
        return false
    }
  },
  maskify: function (creditCardNumber) {

      let mask = creditCardNumber.slice(0, -4).replace(/./g,'#')+creditCardNumber.slice(-4)
      return mask;

      /*return creditCardNumber.slice(0, -4).replace(/./g, '#') + creditCardNumber.slice(-4);*/

}
};

export default validator;
