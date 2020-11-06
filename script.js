$(document).ready(function(){
    $('#buscar').keyup(function(){ // -->ESTO ES JAVASCRIPT USANDO JQUERY

        //CUANDO EL USUARIO EMPIECE A ESCRIBIR ALGO EN EL CAMPO BUSCAR SE DISPARA: 
        // $(this).val(); QUIERE DECIR EL VALOR DE LA CAJA DE TEXTO BUSCAR

        // LO VOY A GUARDAR EN UNA VARIABLE
        var palabraClave = $(this).val();

        //VIENDO SI LA PALABRA CLAVE O SEA EL VALRO EN LA CAJA DE TEXTO BUSCAR ESTA VACIA
        if(palabraClave == ""){
            console.log('Debe insertar un valor para buscar');
        }
        
        //CON ESTE PEDAZO DE CODIGO YO HAGO LA PETICION A LA API DE PAISES PARA TRAER LOS PAISES 
        //QUE COMIENCE CON EL NOMBRE QUE VENGA EN LA CAJA DE TEXTO BUSCAR

        var buscarPais = $.ajax({ // --> ESTO AJAX
            type: 'GET',
            url: 'https://restcountries.eu/rest/v2/name/'+ palabraClave,
            dataType: 'JSON'
        });

        //ESTO SIGNIFICA QUE CUANDO SE TERMINE LA BUSQUEDA EN LA API DE PAISES VOY A HACER ALGO
        buscarPais.done(function(data){
            // MUESTRO LOS PAISES EN CONSOLA
            console.log(data); // --> AQUI DEBEN DIBUAJAR LOS CUADROS CON LAS BANDERAS Y LA INFORMACION

            // -- OJO DEBO RECORRER EL RESULTADO data --
    
            // AQUI ESTOY DIBUJANDO EN LOS ELEMENTOS QUE TENGAN LA CLASE PRUEBA
            // UN ELEMENTO IMG CON EL VALOR DE LA PROPIEDAD FLAG DE EL OBJETO RESULTANTE DE LA BUSQUEDA
           //** $('.prueba').html(`<img src="${data[0].flag}"></img>`); 

           $('.mostrarpaises').html(`
           <div class="card">   
            <h5 class="card-title"> ${data[0].name}</h5>    
                <img src="${data[0].flag}" alt="${data[0].name}" class="card-img-top" style="height:200px">
             <div class="card-body"> 
                <h5 class="card-title">Capital: ${data[0].capital}</h5>
                <h5 class="card-title">Región: ${data[0].region}</h5>
                <h5 class="card-title">Subregión: ${data[0].subregion}</h5>
                <h5 class="card-title">Población: ${data[0].population}</h5>
             </div>
            </div>
        </div>`);  
        });

        buscarPais.fail(function(xhr, status, error){
            //ESTOY VALIDANDO QUE SI LO QUE ESCRIBI NO ARROJA RESULTADOS DE LA BUSQUEDA
            if(xhr.status == 404){
                // COMO NO ARROJO RESULTADOS, ESCRIBO UN MENSAJE PARA EL USUARIO
                console.log('No hay coincidencias segun la busqueda');
            }
            if(xhr.status == 500){
                //POR SI HAY UN FALLO EN LA API
                console.log('Ocurrio un error inesperado');
            }
        })
    });
});

  ////////////////////////////////////////////////////////////////
// select de regiones
//funcion para cargar los paises 
function Paises()
{
    var select = document.getElementById('region');
    var region = select.options[select.selectedIndex].value;

//url de api
    var url = 'https://restcountries.eu/rest/v2/all';
    fetch(url)
    //recuperando json
        .then(data => data.json())
        .then(data => {
            var countries = data;

            var regional_countries = [];
            countries.forEach(value => {
                if (value.region == region) {
                    regional_countries.push(value);
                   
                }
            });
            if (regional_countries.length > 0) {
                MostrarCountries(regional_countries, region);
            }
        });
}

//funcion para mostrar los paises
function MostrarCountries(countries, region)
{
    //recorrer con foreach
    var html = '';
    countries.forEach(value => {
        html += `
        <div class="card"> 
            <h5 class="card-title"> ${value.name}</h5>      
                <img src="${value.flag}" alt="${value.name}" class="card-img-top" style="height:150px">
             <div class="card-body"> 
                <h5 class="card-title">Capital: ${value.capital}</h5>
                <h5 class="card-title">Región: ${value.region}</h5>
                <h5 class="card-title">Subregión: ${value.subregion}</h5>
                <h5 class="card-title">Población: ${value.population}</h5>
             </div>
            </div>
        </div>
`;
    });
//obtener el contenido en las card
    document.getElementById('pais').innerHTML = html;
}

// add event listeners
document.querySelector('#region')
    .addEventListener('change', Paises);