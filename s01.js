const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load',()=> {
    formulario.addEventListener('submit', buscarClima);
} );


function buscarClima(e){
    e.preventDefault();
    //Comprobar CONSOLA
    console.log('BUscando clima FUNSIONA!');

    //VALIDAR
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;
    //Comprobar Consola
    console.log(ciudad);
    console.log(pais);

    //Validar campos vacios
    if(ciudad === '' || pais === ''){

        //Incluir una funcion de ERROR pasar Argumento
        mostrarError('Ambos deben estan completos')
        return;
    }//F

    //Consultar la API SEGUNDA PARTE

    consultarAPI(ciudad, pais)


};//FN
    
    
        function mostrarError(mensaje){ //FUncion Reutilzable
        //Compronar Consola
        console.log(mensaje);

        //Evitar repeticion de mensaje con una clase especifica
        const alerta = document.querySelector('.bg-red-100');

        
        if(!alerta){

            //Crear el mensaje/contener cons sus clases
            const alerta = document.createElement('div');

            alerta.classList.add('mx-auto', 'bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 
            'rounded', 'max-w-md', 'mt-6', 'text-center');

            //Pasar Argumento con TEMPLATE STRING
        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span> 
        `;
            //Agregaarlo al HTML
        container.appendChild(alerta);

        }
        //Elminar desaparecer el mensaje
        setTimeout(() =>{
            alerta.remove()
        },3000);
        
    };//FN


    
    



function consultarAPI(ciudad, pais){

    const apiID = 'ea181daff7be54e87caa58499295e990'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiID}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            console.log(datos);

            limpiarHTML();
            if(datos.cod === "404"){
                mostrarError('Ciudad NO ENCONTRADA');
            }

            mostrarClima(datos);
        });


        

};//Consultar API


function mostrarClima(datos){
    const { name, main:{ temp, temp_Max, temp_Min}} = datos;

    const centigrados = kelvinCebtigrados(temp);
    const max = kelvinCebtigrados(temp_Max);
    const min = kelvinCebtigrados(temp_Min);


    //SCRIPTING
    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `CLima de ${name}`;
    nombreCiudad.classList.add('text-xl', 'text-black');

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `MAX: ${max} &#8451;`;
    tempMaxima.classList.add('text-xl');

    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `min: ${min} &#8451;`;
    tempMinima.classList.add('text-xl');
     
     


    //IMprimir Datos en el HTML
    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('front-bold', 'text-6xl', 'mt-5');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-black');

    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);

    resultado.appendChild(resultadoDiv);
}


const kelvinCebtigrados = grados => parseInt(grados - 273.15);

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}
