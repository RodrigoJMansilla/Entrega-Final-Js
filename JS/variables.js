
// arrays
//gondola es un array que contiene objetos frutas a vender. Estos objetos tienen nombre, precio/kg, stock en kg e id y ruta con la imagen
let gondola=[]

//pedidoFrutas este array vacio va a ir agregando objetos de la clase comprarFrutas
let pedidoFrutas=[]


/* 
Clase ComprarFrutas
Esta instancia objetos "Frutas" que van a ser compradas.
Tiene dos propiedades:
- codigo (se tiene que corresponder con la propiedad "id" de los objetos literales del array gondola)
- cantidad (number que define la cantidad comprada de dicha fruta)

tiene dos metodos:
- consultarPrecio: recupera el precio/kg de la fruta en la gondola y devuelve el precio de la fruta en el pedido (cantidad * precio) Este metodo se utiliza en el siguiente metodo.
- confirmarAgregado: Este muestra el costo de la cantidad de fruta a comprar y solicita una confirmacion para que la fruta sea agregada al pedido. Una vez confirmado, el metodo envia la instancia de la clase en cuestion (entera) al array que conforma el pedido "pedidoFrutas"

*/

class comprarFrutas {
    constructor(codigo, cantidad){
        this.codigo = parseInt(codigo)
        this.cantidadKg = parseFloat(cantidad)
    }

    consultarPrecio(){

        let coincidencia = gondola.find((fruta)=>{
            return fruta.id === parseInt(this.codigo)
        })

        return parseFloat(parseInt(coincidencia.precio) * this.cantidadKg).toFixed(2)
    }

    confirmarAgregado(instanciaActual){// se pide como parametro una instancia de la propia clase "actual"

        let coincidencia = gondola.find((fruta)=>{
            return fruta.id === parseInt(this.codigo)
        })

        let costo = this.consultarPrecio()

        
        pedidoFrutas.push(instanciaActual) // Ahora lo que se va a enviar es la propia instancia recibida como parametro.
        console.log(`Se agregaron ${this.cantidadKg}Kg de ${coincidencia.nombre} al pedido.`)
        
    }
}

/*
Funcion que recibe la respuesta del servidor con el array. Esta funcion necesito que sea accesible para todos los html. Es por ello que queda definida en este js y se hace un return del fetch() para poder manejar efectivamente la promesa en cada html. Tambien por eso envio la url como parametro, ya que en el caso de usar un .json local la url cambia. (esto no es necesario si usamos un servidor externo en donde la url siempre es la msima)
- se pide el array con fetch
- 1er then se asegura de que el estado de la respuesta sea 200 (exitosa) y luego maneja los datos y hace la conversion
- 2do then carga estos datos en el arreglo gondola que usa el programa
- 3er then llama a la funcion que desarrolla los templates HTML en base al arreglo gondola.
- 4to then escucha los botones "comprar" (que requieren que esten cargados los productos de gondola) y generaToast, en caso de que se haya agregado alguna fruta al pedido (tambien requiere que este cargado el arreglo gondola)
- el catch maneja el error en caso de que no se puedan cargar los elementos de gondola.
*/



function getGondola(URL){
    return  fetch(URL)
            .then(rta => rta.status === 200 && rta.json())
            .then(data => gondola.push(...data))
            .catch(error => {
                //console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudieron cargar los productos, intente nuevamente mas tarde.',
                    confirmButtonColor: '#790068',
                    footer: '<a href="../index.html">Click aquí para intentar de nuevo</a>'
                })
                cont.innerHTML = "NO SE PUEDEN CARGAR LOS PRODUCTOS"
                
            }) 
}