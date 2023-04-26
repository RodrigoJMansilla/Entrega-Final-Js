
const contSalida = document.querySelector("div.contSalida")
const logo = document.querySelector("div.conLogo img")
const btnvolver = document.querySelector("button.btnPedido.volver")

//le agrego funcionalidad al boton del index en el logo y un mousemove
logo.addEventListener("click", ()=> {
    location.href = "../index.html"
})
logo.addEventListener("mousemove",()=>{
    logo.className = "conLogoHover"
})

btnvolver.addEventListener("click", ()=> {
    location.href = "../index.html"
})



//Funcion que carga la vista del array pedidoFrutas
function cargarCompras(array){
    contSalida.innerHTML = "" 

    if(array.length > 0){

        array.forEach((compra)=>{
            contSalida.innerHTML += templateDivSalida(compra)
        })
    }

    cargarTotal()
}

recuperoPedido()
cargarCompras(pedidoFrutas)


//Funcion que hace la carga del template Total
function cargarTotal(){
    contSalida.innerHTML += templateDivTotal()
}



/*Funcion eventoBotonX:
Le da funcionalidad al boton "X" rojo:
- tomo los botones dentro de un array de nodos
- itero el array y escucho el click , pasando el obj event, para tomar el id del boton
- ejecuto la funcion eliminarFruta que quita el objeto compra del array pedidoFrutas, correspondiente a la fruta a eliminar
*/
function eventoBotonX(){
    const botones = document.querySelectorAll("button.buttonFruta")

    for(boton of botones){
        
        boton.addEventListener("click", (e)=>{
            let fruta = recuperaFruta(parseInt(e.target.id))

            eliminarFruta(fruta)
        })
    }

}

//activo los botones X llamando a la funcion.
eventoBotonX()

/*
Funcion que elimina una compra del arreglo pedidoFrutas, en base a un objeto fruta:
- pide como parametro un objeto fruta
- toma el index del objeto compra correspondiente al objeto fruta por su id, en el array pedidosFruta
- con este index y el metodo splice, eliminamos la fruta del arrego y ejecutamos "guardoPedido()" para guardarlo nuevamente en storage
- filamente ejecuto eventoBotonX, para volver a activar los botones resultantes

*/
function eliminarFruta(fruta){

    let index = pedidoFrutas.findIndex((compra) => {
        return compra.codigo === fruta.id
    })

    pedidoFrutas.splice(index, 1)
    cargarCompras(pedidoFrutas)
    guardoPedido()
    eventoBotonX()
    botonComprar()

}



/*
Funcion para darle funcionalidad al boton Comprar:
- linkeo el boton y el combo
- escucho el evento click sobre el boton:
- me fijo el valor del combo para hacer los calculos de cuotas
- segun el valor de la confirmacion ejecuto la funcion de cierre y doy por finalizada la etapa de compra limpiando el carrito.
*/

function botonComprar(){
    const combo = document.querySelector("select.selCombo")
    const butComprar = document.querySelector("button.btnPedido.inputSub")
    let total = totalPedido()
    let rta = false

    butComprar.addEventListener("click", ()=> {
        if(pedidoFrutas.length > 0){
            if(combo.value == "opcion1"){
                Swal.fire({
                    icon: 'success',
                    title: 'Gracias por su compra!',
                    text: `Se ha realizado su pedido por un total de $${total}`,
                    confirmButtonColor: '#790068',
                }).then(()=>{
                    cierre()
                })
                
            }

            if(combo.value == "opcion2"){
                total = total * 1.2
                let cuota = total / 3
                Swal.fire({
                    icon: 'success',
                    title: 'Gracias por su compra!',
                    text: `Se ha realizado su pedido por un total de 3 cuotas de $${cuota.toFixed(2)}`,
                    confirmButtonColor: '#790068',
                }).then(()=>{
                    cierre()
                })
                
            }

            if(combo.value == "opcion3"){
                total = total * 1.45
                let cuota = total / 6
                Swal.fire({
                    icon: 'success',
                    title: 'Gracias por su compra!',
                    text: `Se ha realizado su pedido por un total de 6 cuotas de $${cuota.toFixed(2)}`,
                    confirmButtonColor: '#790068',
                }).then(()=>{
                    cierre()
                })
            }

        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Su pedido no contiene ninguna fruta.',
                confirmButtonColor: '#790068',
                footer: '<a href="../index.html">Click aquí para iniciar su compra</a>'
              })
            console.warn("El pedido esta vacio.")
        }
    })
}

botonComprar()



/*
Funcion que actualiza el stock, una vez que se finaliza la compra.
- Pide un array   (pedidoFrutas)
- itera el array:
- recupera la fruta en cuestion en un objeto auxiliar "frutaGondola"
- modifica la propiedad stock del objeto auxiliar fruta, en base a la cantidad almacenada en el array pedidoFrutas
- copia la propiedad stock del objeto auxiliar, en el objeto equivalente dentro del array Gondola

Esta funcion por el momento no utiliza Storage, por lo que el impacto no se puede visualizar en el index. (ya que vuelve a sus valores por defecto)
*/
function actualizarStock(arrayVenta){
    let frutaGondola
    arrayVenta.forEach((fruta)=>{
        frutaGondola = recuperaFruta(fruta.codigo)
        frutaGondola.stockKg = frutaGondola.stockKg - fruta.cantidadKg
        gondola[frutaGondola.id-1].stockKg = frutaGondola.stockKg
    })
}





//Pequeña funcion de cierre con un alert y la limpieza del array en el storage
function cierre(){
    // alert("Se le enviará un Correo con todos los datos de su compra y codigo de seguimiento.\n Gracias por elegirnos!")
    actualizarStock(pedidoFrutas)
    localStorage.removeItem("pedidoFrutas")
    recuperoPedido()
    cargarCompras(pedidoFrutas) 
    location.href = "../index.html"   
}



