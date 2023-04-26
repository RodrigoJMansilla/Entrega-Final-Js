




//funcion que recupera una fruta de gondola segun su id. Generalmente se usa enviando un codigo de los objetos instanciados de comprarFruta, para entender que fruta de la gondola es la que esta comprando el usuario en su pedido.
function recuperaFruta(codigo){
    encontrado = gondola.find((fruta)=>{return fruta.id === codigo})
    return encontrado
}


/*Funcion que guarda el array "pedidoFrutas" que contiene la informacion de las frutas a comprar
- Valido que haya algo en el array "pedidoFrutas"
- Guardo bajo la clave "pedidoFrutas" el array en localStorage
*/
function guardoPedido(){
    
    localStorage.setItem("pedidoFrutas", JSON.stringify(pedidoFrutas))
    console.table(pedidoFrutas)
    console.log("Se guardo Este arreglo en local storage")

}



/*
Funcion que recupera el array "pedidoFrutas"
- Como voy a hacer un push al array, primero lo reseteo por que yo quiero que este sincronizado con el array que esta en local storage
- verifico que haya algo bajo la clave "pedidoFrutas"
- recupero el arreglo "pedidoFrutas" en un arreglo auxiliar.
- itero el arreglo auxiliar y voy pusheando hacia mi arreglo "pedidoFrutas" el contenido de la clave en local storage.
- Se incluye un paso intermedio en dodne recorro el arreglo auxiliar y voy instanciando nuevas "comprarFrutas" segun las propiedades del objeto del arreglo auxiliar. 
ESTO SE HACE POR QUE AL RECUPERAR DE LOCAL STORAGE con JSON.parse(), SE PIERDE LA CLASE DEL OBJETO Y POR CONSIGUIENTE SUS METODOS.
*/

function recuperoPedido(){
    pedidoFrutas = []
    if(localStorage.getItem("pedidoFrutas")){
        const arrayAux = JSON.parse(localStorage.getItem("pedidoFrutas"))

        arrayAux.forEach((compra)=>{
            let instanciaCompra = new comprarFrutas (compra.codigo, compra.cantidadKg)

            pedidoFrutas.push(instanciaCompra)
        })
        console.table(pedidoFrutas)
        console.log("se recupero este arreglo en pedidoFrutas[]")
    }
}



//Funcion que devuelve el string enviado con su mayuscula
function capitalize(string){
    return string.charAt(0).toUpperCase() + string.slice(1)
}


/* 
Funcion de comprar adaptada, recibe el codigo y la cantidad, requeridos por la clase comprarFrutas. Estos van a provenir del id del boton agregar apretado correspondiente a una fruta, y la cantidad del inputNumber.
- se genera una instancia de comprarFrutas con estos datos.
- Se define una band = 0
- se itera el arreglo pedidoFrutas para verificar el caso en el que la fruta ya haya sido agregada previamente, para ellos se hace un if y se compara el codigo de la instancia nueva, con el codigo de todas las frutas en el arrego.
    *si hay coincidencia, se cambia band a 1, para tomar el estado de SI, y pregunta al usuario si se desea agregar esto al pedido anterior o no. En este caso no se envia una nueva instancia de comprarFruta al arreglo, sino que se modifican las propiedades de la ya existente
    *si no hay coincidencia, quiere decir que entonces es una fruta que no habia sido agregada previamente, y se ejecuta el metodo de la clase "confirmarAgregado" que envia la instancia al arreglo pedidoFrutas. 

*/
function compraFruta(codigo, cantidad){
    
    instancia = new comprarFrutas (codigo, cantidad)

    let band1 = 0

    for(fruta of pedidoFrutas){
        if(fruta.codigo === instancia.codigo){
            band1 = 1
            fruta.cantidadKg = parseFloat(fruta.cantidadKg) + parseFloat(instancia.cantidadKg)
        }
    }

    if(band1 == 0){
        instancia.confirmarAgregado(instancia)
        console.table(pedidoFrutas)
    }
}

/*
Funcion que itera el arreglo pedidoFrutas y calcula el costo total del pedido
*/
function totalPedido(){
    let total = 0
    pedidoFrutas.forEach((compra) => {
        total += parseFloat(compra.consultarPrecio())
    })

    return total
}



/*
Funcion generadora de toasts.
La siguiente funcion es llamada por main.
Su objetivo es que luego de agregado un producto y el usuario ser redireccionado a index.html, se muestre un toast con informacion sobre el producto agregado al pedido y su cantidad.

Cuando se clickea el boton "agregar" se guarda en localstorage una key "Toast" con el valor "agregar".
Este fragmento de codigo se fija si esa key existe y de ser asi ejecuta el toast y la resetea con removeItem.

A su vez, antes de hacer el location.href a index cuando se escucha el clickeo del boton "agregar", se alojan el codigo y la cantidad de la fruta agregada a local storage.
Estos dos son rescatados por este codigo y para mostrar el toast y luego tambien reseteados.
*/

function generaToast(){
    let Toast = localStorage.getItem("Toast") || false
    if (Toast == "agregar"){
        Toastify({
            text: `Se han agregado ${parseFloat(localStorage.getItem("Cantidad"))}Kg de ${recuperaFruta(parseInt(localStorage.getItem("Codigo"))).nombre}`,
            duration: 3000,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            style: {
            background: "#007911",
            },
            onClick: function(){} // Callback after click
        }).showToast();
        localStorage.removeItem("Toast")
        localStorage.removeItem("Codigo")
        localStorage.removeItem("Cantidad")
    }
}