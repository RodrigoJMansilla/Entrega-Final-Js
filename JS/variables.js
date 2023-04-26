// constantes strings *BORRAR
const msjMenu =     "Bienvenido a UvaScript! ¿En qué lo podemos ayudar?\n" +
                    "Ingrese un número:\n" +
                    "1) Agregar/Modificar frutas a su pedido\n" +
                    "2) Ver las frutas en su pedido y el costo total del mismo\n" +
                    "3) Efectuar la compra y terminar con su atención\n"

const msjFrutas =   "Selecciona que fruta desea agregar al pedido:\n" +
                    "Ingrese un número:\n" +
                    "1) Banana\n" +
                    "2) Manzana\n" +
                    "3) Uvas\n" +
                    "4) Sandía\n" +
                    "5) Limón\n" +
                    "6) Naranja\n"

const msjCuotas =   "Ingrese la cantidad de cuotas en las que desea hacer el pago:\n" +
                    "3) 20% Recargo\n" + 
                    "6) 45% Recargo"

// arrays
//gondola es un array que contiene objetos frutas a vender. Estos objetos tienen nombre, precio/kg, stock en kg e id y ruta con la imagen
let gondola=[   {id: 1, nombre: 'Banana', precio: 500, stockKg: 100, ruta: "./images/banana-resized.png"},
                {id: 2, nombre: 'Manzana', precio: 800, stockKg: 150, ruta: "./images/manzanas-resized.png"},
                {id: 3, nombre: 'Uva', precio: 2100, stockKg: 75, ruta: "./images/uvas-resized.png"},
                {id: 4, nombre: 'Sandía', precio: 200, stockKg: 200, ruta: "./images/sandias-resized.png"},
                {id: 5, nombre: 'Limón', precio: 400, stockKg: 120, ruta: "./images/limones-resized.png" },
                {id: 6, nombre: 'Naranja', precio: 500, stockKg: 140, ruta: "./images/naranjas-resized.png"},
                {id: 7, nombre: 'Frutilla', precio: 2400, stockKg: 80, ruta: "./images/frutillas-resized.jpg"},
                {id: 8, nombre: 'Arandanos', precio: 2200, stockKg: 110, ruta: "./images/arandanos-resized.jpg"},
                {id: 9, nombre: 'Durazno', precio: 750, stockKg: 125, ruta: "./images/durazno-resized.jpg"},
                {id: 10, nombre: 'Mandarina', precio: 650, stockKg: 95, ruta: "./images/mandarinas-resized.jpg"},
                {id: 11, nombre: 'Kiwi', precio: 1900, stockKg: 130, ruta: "./images/kiwi-resized.jpg"},
                {id: 12, nombre: 'Melón', precio: 400, stockKg: 120, ruta: "./images/melones-resized.jpg"}
                ]

//pedidoFrutas este array vacio va a ir agregando objetos de la clase comprarFrutas
let pedidoFrutas=[]

//variables *BORRAR
let iCuotas = 0
let continuar = true
let choice = 0


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

