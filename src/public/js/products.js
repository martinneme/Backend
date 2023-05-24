    let isCartExist = localStorage.getItem('cartId') || null;

const badge = document.getElementById('quantityBadge')


window.addEventListener('load', async () => {
    let counter = 0 ;
    isCartExist = localStorage.getItem('cartId') || null;
    if (isCartExist) {
        const cart = await getCart(isCartExist)
        if (cart) {
            cart.products.forEach(element => {
                counter += parseInt(element.quantity);
            });
            badge.textContent = counter;
        } else {
            localStorage.removeItem('cartId');
        }

    }
})


function navigateTo(page) {
    window.location.href = '/products?page=' + page;
}

function goToCart() {
    if (isCartExist) {
        if (parseInt(badge.textContent) > 0) {
            window.location.href = '/carts/' + isCartExist;
        }
    } else {
        alert("Cart is empty")
    }

}

function reduce(element) {
    const quantity = element.parentNode.querySelector('#quantityValue');
    const currentValue = parseInt(quantity.textContent);
    if (currentValue > 1) {
        quantity.textContent = currentValue - 1;
    }
}

function increment(element) {
    const quantity = element.parentNode.querySelector('#quantityValue');
    quantity.textContent = parseInt(quantity.textContent) + 1;
}

async function addToCart(element) {
    
    const product = element.closest(".product");
    const quantityValue = product.querySelector("#quantityValue");
    const pid = product.querySelector("#idProd").textContent;
    const quantity = parseInt(quantityValue.textContent);

    isCartExist = localStorage.getItem('cartId') || null;

    if (isCartExist === null) {

        const newCart = await CreateCart();
        localStorage.setItem('cartId', newCart.payload);
        badge.textContent = parseInt(badge.textContent) + quantity;
       await AddToCartDB(newCart.payload, pid,quantity);
isCartExist=newCart.payload;

    } else {
        const updateQuantity = await updateQuantityProd(isCartExist, pid, quantity);
        if (updateQuantity.status === 'failed') {
             await AddToCartDB(isCartExist, pid,quantity);
       
        } 
     badge.textContent = parseInt(badge.textContent) + quantity;

    }


}


const getCart = async (id) => {
    const rs = await fetch(`/carts/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const response = await rs.json();

    return response

}


const updateQuantityProd = async (cid, pid, quantity) => {
    const rs = await fetch(`/carts/${cid}/products/${pid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "quantity": quantity
        })
    });
    const response = await rs.json();

    return response

}




const CreateCart = async () => {
    const rs = await fetch('/carts/', {
        method: 'POST'
    });
    const response = await rs.json();
    return response
}

const AddToCartDB = async (cid, pid,quantity) => {
    const rs = await fetch(`/carts/${cid}/products/${pid}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "quantity": quantity
        })
    });
    const response = await rs.json();
    return response
}   


// const enableButtonAddToCart = (element) => {
//     let product = element.parentNode.getElementById('#product');
//     let addToCart = product.querySelector("#addToCart");
//     let cartButtons = product.querySelector("#cartButtons")

//     addToCart.removeAttribute("style");
//     cartButtons.removeAttribute("style");

// }