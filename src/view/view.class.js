const divMessagesUI = document.getElementById('messages');

class View{
    renderNewProduct(product) {
        const tbody = document.getElementById('almacen').getElementsByTagName('tbody')[0]
        const tr = document.createElement('tr')
        tr.id = "product"+product.id
        tr.innerHTML = ` <td class="id"> ${product.id} </td> 
                         <td class="name"> ${product.name} </td> 
                         <td class="units"> ${product.units} </td> 
                         <td class="price"> ${product.price} </td> 
                         <td class="import"> ${product.productImport().toFixed(2)} €</td>
                         <td>
                            <button class="btn btn-secondary delete" >
                            <span class="material-icons">delete</span>
                            </button>
                         
                            <button class="btn btn-secondary up">
                            <span class="material-icons">arrow_drop_up</span>
                            </button>
                         
                            <button class="btn btn-secondary down">
                            <span class="material-icons">arrow_drop_down</span>
                            </button>
                         
                            <button class="btn btn-secondary edit">
                            <span class="material-icons">edit</span>
                            </button>
                         </td>`
        tbody.appendChild(tr)
        if (product.units == 0) {
            document.getElementById("product"+product.id).querySelector('.down').setAttribute("disabled","disabled");
        }
    }

    renderFillForm(product){
        document.getElementById('newprod-id').value = product.id
        document.getElementById('newprod-name').value = product.name
        document.getElementById('newprod-price').value = product.price
        document.getElementById('newprod-units').value = product.units
    }

    renderEditProduct(product) {
        let tr = document.getElementById("product"+product.id)
        tr.getElementsByClassName("name")[0].textContent = `${product.name}`
        tr.getElementsByClassName("price")[0].textContent = `${product.price}`
        tr.getElementsByClassName("units")[0].textContent = `${product.units}`
        tr.getElementsByClassName("import")[0].textContent = `${product.productImport().toFixed(2)}`
        if (product.units == 0) {
            tr.querySelector('.down').setAttribute("disabled","disabled");
        } else {
            tr.querySelector('.down').removeAttribute("disabled");
        }
                
    }

    renderDelProduct(id) {
        const cant = document.getElementById('almacen').getElementsByTagName('tbody')[0].childElementCount
        const div = document.getElementById('almacen').getElementsByTagName('tbody')[0]
        for (let index = 0; index < cant; index++) {
            let product = div.children[index]
            if (product.firstElementChild.textContent == id) {
                div.removeChild(product)
            }
            
        }
    }

    renderStoreImport(total) {
        const tfoot = document.getElementById('total')
        tfoot.textContent = total + '€'
    }

    renderErrorMessage(message) {
        const newMessageDiv = document.createElement('div')
        newMessageDiv.className = "col-sm-12 alert alert-danger alert-dismissible fade show"
        newMessageDiv.innerHTML = `
            <span><strong>ATENCIÓN: </strong>${message}</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" onclick="this.parentElement.remove()"></button>`
        
        divMessagesUI.appendChild(newMessageDiv)
    }
}

module.exports = View;
