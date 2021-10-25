const View = require('../view/view.class')
const Store = require('../model/store.class')

class Controller {
    constructor() {
        this.store = new Store(1)
        this.view = new View()
    }

    init() {
        this.storeView.init();			// inicializa la vista, si es necesario
    }

    addProductToStore(formData) {
        // Cambiamos los datos en el modelo
        const newProd = this.store.addProduct(formData);
        const total = this.store.totalImport().toFixed(2);	// dice al modelo que añada el producto
        if (newProd) {
            this.view.renderNewProduct(newProd);
            const id = newProd.id;
            const tr = document.getElementById("product"+id);
            tr.querySelector('.delete').addEventListener('click', () => {
                this.deleteProductFromStore(id)
            })
            tr.querySelector('.up').addEventListener('click', () => {
                this.changeProductStock({ id:id,units:1 })
            })
            tr.querySelector('.down').addEventListener('click', () => {
                this.changeProductStock({id:id, units:-1})
            })
            tr.querySelector('.edit').addEventListener('click', () => {
                document.getElementById('new-prod').classList.remove("hide")
                this.view.renderFillForm(newProd)
            })
            this.view.renderStoreImport(total);
            		// si lo ha hecho le dice a la vista que lo pinte
        } else {
            this.view.renderErrorMessage('error', 'Error al añadir el producto');
        }
        // Si todo ha ido bien mostramos los datos en
        // la página y si no mostramos el error
    }

    deleteProductFromStore(prodId) {
        try{ 
            if (Number.isInteger(Number(prodId)) && Number(prodId) > 0){
                const product =  this.store.findProduct(Number(prodId))
                if(!product){
                    throw `No existe el producto con id ${prodId}`
                }
                let respuesta = prompt(`Quieres borrar el producto con id ${prodId} ? [S/N]`) 
                if(respuesta == 's' || respuesta == 'S'){
                    if(product.units <= 0){
                        this.store.delProduct(prodId)
                        this.view.renderDelProduct(prodId)
                    }else{
                        respuesta = prompt(`El producto con id ${prodId} tiene ${product.units} units quieres borarlo igualmente ? [S/N]`) 
                        if(respuesta == 's' || respuesta == 'S'){
                            let units =  -product.units
                            this.store.changeProductUnits({ id:product.id, units:units })
                            this.store.delProduct(product.id)
                            this.view.renderDelProduct(product.id)
                            let total = this.store.totalImport()
                            this.view.renderStoreImport(total)
                        }
                    }  
                }
            }
        }catch(Error){
            this.view.renderErrorMessage(Error)
        }
    }

    changeProductInStore(formData) {
        const prod = this.store.changeProduct(formData)
        const total = this.store.totalImport().toFixed(2);
        if (prod) {
            this.view.renderEditProduct(prod)
            this.view.renderStoreImport(total);		// si lo ha hecho le dice a la vista que lo pinte
        }
    }

    changeProductStock(formData) {
        const newProd = this.store.changeProductUnits(formData);	// dice al modelo que añada el producto
        if (newProd) {
            this.view.renderEditProduct(newProd);
            const total = this.store.totalImport().toFixed(2);
            this.view.renderStoreImport(total);		// si lo ha hecho le dice a la vista que lo pinte
        } else {
            this.view.renderErrorMessage('error', 'Error al añadir el producto');
        }
    }
}

module.exports = Controller
