
// Linkeos con querySelector

const logo = document.querySelector("div.conLogo img")
const cont = document.querySelector("main div.conMain")
const inputSearch = document.querySelector("input#busqueda")
const buttonSalida = document.querySelector("button.btnPedido")

/*
Seccion de fetch llamado a la funcion getGondola
Luego de la respuesta del "servidor" con el sucesivo manejo del array, con un then me aseguro de cargar los templates y posteriormente escuchar los botones y generar el toast.
*/
const URLMAIN = "JS/gondola.json"  // URL correspondiente al .json local desde index.html
const mockapi = "https://64495f30e7eb3378ca47a505.mockapi.io/fruta" // URL del backend generado por mockapi

getGondola(mockapi).then(() => cargarFrutas(gondola)).then(() => {
                                                        eventosBotones()
                                                        generaToast()
                                                        })

//le agrego funcionalidad al boton del index en el logo y un mousemove para que cambie el cursor
logo.addEventListener("click", ()=> {
    location.href = "index.html"
})
logo.addEventListener("mousemove",()=>{
    logo.className = "conLogoHover"
})

// Funcion que carga en el HTML interno del div "conMain" en el main todas las frutas del arreglo "gondola", presentadas en cards.
function cargarFrutas(array){
    cont.innerHTML = ""
    array.length > 0 && array.forEach( fruta => cont.innerHTML += templateCard(fruta))
}

/*
Funcion que carga el template modificado para ingresar la cantidad a comprar, luego de clickeado el boton "Comprar"
*/
function cargarFrutasCompra(fruta){
    cont.innerHTML = templateCardCompra(fruta)   
}


//Agrego el evento search al input.
inputSearch.addEventListener("search", () => {
    let buscar = gondola.filter((fruta) => fruta.nombre.includes(capitalize(inputSearch.value.trim())))

    buscar.length > 0 && cargarFrutas(buscar)

    eventosBotones() // Agrego funcionalidad a los botones luego de un evento search
})




/*
La siguiente funcion va a escuchar todos los botones "Comprar" y manejar las cards en base a este boton:
- Asigno todos los botones a un array "botones"
- Recorro el array
- Agrego el evento click a cada boton y envio el objeto event
- recupero la fruta clickeada en base al id del objeto event
- Ejecuto la funcion cargarFrutasCompra, referida al objeto fruta clickeada para mostrar la card con el input number (en este caso se va a mostrar siempre una sola card).
- Ejecuto la funcion eventosBotonesAddCancel (*ver siguiente funcion) que le da funcionalidad a los dos botones de la nueva card.
- Paralelamente al recorrer el array de botones tambien se agrega el evento mousemove para que aparezca un titulo antes de apretar
*/
function eventosBotones(){
    const botones = document.querySelectorAll("button.btnFruta")

    for (boton of botones){

        // Escuchado de click en "comprar" -> guardamos el objeto a comrpar, cargamos el template de compra avanzada, y escuchamos los botones
        boton.addEventListener("click", (e)=>{
            let fruta = recuperaFruta(parseInt(e.target.id))
            cargarFrutasCompra(fruta)
            eventosBotonesAddCancel()
        })


        // Escuchado de mousemove, para aplicar un cartelito
        boton.addEventListener("mousemove", (e)=>{

            let fruta = recuperaFruta(parseInt(e.target.id))
            e.target.title=`Agregar ${fruta.nombre} al pedido`
        })
    
    }
}

/*
Funcion de botones addCancel
Le agrego funcion a los botones "Agregar" y "Cancelar":
No sabia como diferenciar los botones por su contenido, para ello la solucion que encontre fue asignarlos genericamente con un querySelectorAll
y luego a traves de la propiedad "e.target.innerText" del objeto event, diferenciarlos.
- recupero el pedido de local storage
- Genero array de botones(en este caso son solo 2)
- Recorro array, escucho evento "click" y comparo con un if el contenido del texto interno del nodo
- si es agregar: 
    - tomo el inputnumber y lo valido para que siempre sea un numero y sea positivo, de no ser asi disparo un alert de error
    - al pasar la validacion llamo a la funcion "compraFruta(target.id, value)" y guardo el arreglo en local storage
    - ejecuto un location.href para redirigir al index.
    - previo al paso anterior guardo las claves necesarias en localStorage para que se muestre el toast correspondiente al redireccionar
- si es cancelar: simplemente refiero a index.html para que se vuelvan a cargar las frutas.
*/
function eventosBotonesAddCancel(){
    recuperoPedido()
    const buttonAddCancel = document.querySelectorAll("button.btnFruta")
    for (boton of buttonAddCancel){

        boton.addEventListener("click",(e) => {
            
            if(e.target.innerText == "Agregar"){
                const inputNumber = document.querySelector("input.inputNumber")
                if(!isNaN(parseInt(inputNumber.value)) && parseFloat(inputNumber.value) > 0){
                    compraFruta(parseInt(e.target.id), parseFloat(inputNumber.value))
                    guardoPedido()
                    localStorage.setItem("Toast", "agregar")
                    localStorage.setItem("Codigo", parseInt(e.target.id))
                    localStorage.setItem("Cantidad", parseFloat(inputNumber.value) )
                    location.href = "../index.html"
                }else{
                    console.warn("No esta agregando una cantidad numerica positiva.")
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Debe agregar una cantidad positiva de fruta',
                        confirmButtonColor: '#790068',
                        footer: '<a href="../index.html">Click aquí para elegir otra fruta</a>'
                    })
                }
            }

            if(e.target.innerText == "Cancelar"){
                location.href = "index.html"
            }
            
        })
    }
}

// Cargo el pedido que se encuentre en localStorage siempre que se cargue el inedx.html
recuperoPedido()



//agrego evento al boton para abrir salida.html
buttonSalida.addEventListener("click", ()=>{ location.href = "./pages/salida.html"})
// buttonSalida.addEventListener("mousemove", ()=> buttonSalida.className = "btnPedido conLogoHover")

