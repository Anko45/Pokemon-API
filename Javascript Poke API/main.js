const btnAtras = document.querySelector('#btnAtras');
const btnAdelante = document.querySelector('#btnAdelante');
const busqueda = document.getElementById('busqueda');

function enviar(){
  obtenerPokemon(busqueda.value);
}

numeros = 1;
maximo = 21;

async function obtenerDatos(numeros, maximo){
  try {
    for (let i = numeros; i < maximo; i++) {
      const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const datos = await respuesta.json();

      const resultadoDiv = document.getElementById('resultado');
      
      resultadoDiv.innerHTML += `
        <button onclick="obtenerPokemon(${i})">
          <a href="#contenedor">
            <div>
                <img src="${datos.sprites.front_default}">
                <h3>${datos.name}</h3>
            </div>
          </a>
        </button>
        `
    }
  } catch (error) {
    console.error('Ocurrió un error:', error);
  }
}

obtenerDatos(1,21);

btnAtras.addEventListener('click', () => {
  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.innerHTML = ``;
  if (numeros == 1) {
    obtenerDatos(1,21)
  } else {
    obtenerDatos(numeros - 20, maximo - 20)
    numeros = numeros - 20;
    maximo = maximo - 20;
  }
});

btnAdelante.addEventListener('click', () => {
  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.innerHTML = ``;
  obtenerDatos(numeros + 20, maximo + 20)
  numeros = numeros + 20;
  maximo = maximo + 20;
});

async function obtenerPokemon(nombre){
  console.log(nombre);
    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
        const datos = await respuesta.json();

        const ContenedorDiv = document.getElementById('contenedor');

        let altura = datos.height * 10;
        let peso = datos.weight * 0.1;
        peso = Math.round(peso);
        
        let tipos = datos.types.map((type) => `${type.type.name}`);
        tipos = tipos.join(" / ");
        
        let habilidades = datos.abilities.map((abi) => `${abi.ability.name}`);
        habilidades = habilidades.join(" / ");

        ContenedorDiv.innerHTML = `
            <div>
                <img src="${datos.sprites.front_default}" alt="imagen">
                <h2>${datos.name}</h2>
                <section id="info">
                  <h3>Su altura es:<br>${altura} cm</h3>
                  <h3>Su peso es:<br>${peso} kg</h3>
                  <h3>Su tipo es:<br>${tipos}</h3>
                  <h3>Su habilidad es:<br>${habilidades}</h3>
                </section>
            </div>
            `;
    } catch (error) {
      console.error('Ocurrió un error:', error);
    }
}


