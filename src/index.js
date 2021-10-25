'use strict'

const Controller = require("./controller/controller.class")

// Aquí importaremos la clase del controlador e instanciaremos uno
let myController = new Controller
// A continuación crearemos una función manejadora para cada formulario
window.addEventListener('load', () => {

document.getElementById('Nuevo').addEventListener('click', function() {
  document.getElementById('prods').classList.add("hide")
  document.getElementById('new-prod').classList.remove("hide")
});

document.getElementById('Listar').addEventListener('click', function() {
  document.getElementById('prods').classList.remove("hide")
  document.getElementById('new-prod').classList.add("hide")
});

  // función manejadora del formulario 'new-prod'
  document.getElementById('new-prod').addEventListener('reset', (event) => {
    event.preventDefault()

    const id = Number(document.getElementById('newprod-id').value)
    const prod = myController.store.findProduct(id);
    myController.view.renderFillForm(prod);

  })

  document.getElementById('new-prod').addEventListener('submit', (event) => {
    event.preventDefault()

    // Aquí el código para obtener los datos del formulario
    const id = document.getElementById('newprod-id').value
    const name = document.getElementById('newprod-name').value
    const price = document.getElementById('newprod-price').value
    const units = Number(document.getElementById('newprod-units').value)

    // Aquí llamamos a la función del controlador que añade productos (addProductToStore)
    // pasándole como parámetro esos datos
    if (id == "") {
      myController.addProductToStore({ name, price, units })   
    } else {
      document.getElementById('new-prod').classList.add("hide")
      myController.changeProductInStore({ id, name, price, units })

    } 
    // Sintaxis de ES2015 que equivale a 
    //
    // myController.addProductToStore(
    //   { 
    //     name: name,
    //     price: price 
    //   }
    // ) 
  })

  document.getElementById('del-prod').addEventListener('submit', (event) => {
    event.preventDefault()

    // Aquí el código para obtener los datos del formulario
    const id = document.getElementById('del-id').value
    myController.deleteProductFromStore(id)   
    // Aquí llamamos a la función del controlador que borra productos
    // (addProductToStore) pasándole como parámetro esos datos

  })

  document.getElementById('stock-prod').addEventListener('submit', (event) => {
    event.preventDefault()

    // Aquí el código para obtener los datos del formulario
    const id = document.getElementById('stockprod-id').value
    const units = Number(document.getElementById('stockprod-units').value)
    // Aquí llamamos a la función del controlador que borra productos
    // (changeProductStock) pasándole como parámetro esos datos
    myController.changeProductStock({ id, units })
  })

})
