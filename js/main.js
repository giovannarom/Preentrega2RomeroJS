// Definición de variables
let kgeqconducir;
let conducirtext;
let inicio;
const huellacarbono=[];
const categorias = ["Transporte", "Comida", "Mascotas"];


// Uso de objetos funcion constructora
class Persona{
  constructor(nombre, edad, pais){
    this.nombre=nombre;  
    this.edad=edad;
    this.pais=pais;
  }
    saludar(){
      inicio = confirm("¡Hola "+this.nombre+"! Bienvenida a Carbon Tracker, en este simulador podrás calcular tu huella ecológica");
    }
}

// Definición de funciones

// Impresion de resultados
function impresionresultados(mensaje){
    console.log(mensaje);
    alert(mensaje);
}

// Calcular huella de carbono de km recorridos
function conducir() {
  let kilometros = Number(prompt("Ingresa el número de kilómetros que recorres en un día para ir al trabajo o escuela"));
  console.log("Primero calcularemos la huella de carbono del transporte");

  while (isNaN(kilometros)) {
    alert("Ingrese una cantidad válida");
    kilometros = Number(prompt("Ingresa el número de kilómetros que recorres en un día para ir al trabajo o escuela"));
  }

  // Un auto de gasolina promedio genera 192 g de CO2 por km
  // Fórmula kg de CO2 anuales --> km * 0.192 kg * 7 días * 52 semanas 
  kgeqconducir = kilometros * 0.192 * 7 * 52;
  conducirtext = " 🚗 En un año, por ir al trabajo o escuela generas " + kgeqconducir.toFixed(3) + " kg de CO2";
  
  impresionresultados(conducirtext);
  return kgeqconducir;
}

// Calcular huella de carbono de alimentos
function comida() {
  console.log("Ahora calcularemos la huella de carbono de tu comida favorita");
  let opalimentos = prompt("Ingresa el número que corresponde a tu alimento favorito: 1-Salmón, 2-Carne Asada, 3-Pizza");
  let kgeqcomida = 0; // Inicializamos la variable para evitar errores
  let flg = false; // Variable para controlar si se seleccionó una opción válida

  switch (opalimentos) {
    // Calculo huella de carbono considerando que se comen 25 unidades anualmente
    case "1":
      // 1 kg de salmón genera 10.4 kg de CO2
      kgeqcomida = 10.4 * 25;
      flg = true;
      break;

    case "2":
      // 1 kg de carne genera 21.7 kg de CO2
      kgeqcomida = 21.7 * 25;
      flg = true;
      break;
    case "3":
      // Una caja de pizza genera 263 gr de CO2
      kgeqcomida = 0.263 * 25;
      flg = true;
      break;
    default:
      console.log("Opción no válida");
      alert("Opción no válida, inicia de nuevo");
  }

  if (flg) {
    let comidatext = "🥗 Suponiendo que en un año comes 25 unidades de tu alimento favorito, generas " + kgeqcomida + " kg de CO2";
    impresionresultados(comidatext);
    return kgeqcomida;
  }
}

// Huella de carbono alimento de mascotas
function mascotas() {
  var numanimales = Number(prompt('¿Cuántas mascotas (perros/gatos) tienes?'));
  while (isNaN(numanimales)) {
    alert("Ingrese una cantidad válida");
    numanimales = Number(prompt("¿Cuántas mascotas (perros/gatos) tienes?"));
  }
  let kgco2mascotas = 0;
  for (let i = 1; i <= numanimales; i++) {
    let opmascotas = prompt("Ingresa 1 si la mascota #" + String(i) + " es un perro, y 2 si es un gato");

    while (isNaN(opmascotas)) {
      alert("Ingrese una clase válida");
      opmascotas = prompt("Ingresa 1 si la mascota #" + String(i) + " es un perro, y 2 si es un gato");
    }

    if (opmascotas == 1) {
      kgco2mascotas += 770;
    } else if (opmascotas == 2) {
      kgco2mascotas += 310;
    } else {
      alert("No válido, inicia de nuevo");
    }
  }
  let mascotatext = "🐈 La alimentacion de tus mascotas genera " +kgco2mascotas+ " kg de CO2";
  impresionresultados(mascotatext);
  return kgco2mascotas;
}

// Funcion encontrando el mayor valor
function comparar(a, b) {
    return huellacarbono[categorias.indexOf(a)] - huellacarbono[categorias.indexOf(b)];
}

function launchprograma(){
  // Definicion del perfil de usuario con objetos
  let datosSeparados = prompt("Ingresa tu nombre, edad y país separados por espacios").split(" ");
  const usuario=new Persona(datosSeparados[0],datosSeparados[1],datosSeparados[2]);
  usuario.saludar();
  if (inicio) {
    // Guardando cantidad de cada categoria en arreglo
    huellacarbono.push(conducir());
    huellacarbono.push(comida());
    huellacarbono.push(mascotas());
  
    // Suma arreglo
    let kgco2acum = huellacarbono.reduce(function (acumulador, numero) {
      return acumulador + numero;
    }, 0);
    let totaltext = "🌏 Tu transporte, alimentos y mascotas acumulan " + kgco2acum.toFixed(3) + " kilogramos de CO2 equivalente";
    impresionresultados(totaltext);
    let resultadoElement = document.getElementById('resultado');
    resultadoElement.textContent = totaltext;
  
    // Mayor impacto ambiental
    categorias.sort(comparar);
    huellacarbono.sort((a, b) => a - b);
    let textcategoria="Tu categoría con mayor impacto ambiental es: "+categorias[categorias.length - 1];
    impresionresultados(textcategoria);
  
    // Uniendo todo el perfil
    huellacarbono.unshift(usuario);
    console.log(huellacarbono);
  
  } else {
    alert("Hasta la próxima");
  }  
}

// Event listener para el botón
document.getElementById('btn-inicio').addEventListener('click', launchprograma);

