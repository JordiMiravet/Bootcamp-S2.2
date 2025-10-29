// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
// --------------------------------------------------
// product.sjon Handler

let products = [];
async function loadProducts() {
    try{
        const response = await fetch("src/products.json");
        if(!response.ok) throw new Error("Error al cargar los productos")
        products = await response.json();
    } catch (error){
        console.error(error);
    }
}

// --------------------------------------------------
const cart = [];
const total = 0;

// --------------------------------------------------
// Exercise 1

const buy = (id) => {
    const product = products.find( item => item.id === Number(id));
    const productInCart = cart.find( item => item.id === Number(id));

    if(productInCart){
        productInCart.quantity += 1;
    }else{
        const productAdd = {...product, quantity: 1}
        cart.push(productAdd)
    } 
}

// --------------------------------------------------
// Exercise 2

const cleanCart = () =>  {
    cart.length = 0;
}

// --------------------------------------------------
// Exercise 3

const calculateTotal = () =>  {
    let total = 0;

    cart.forEach(item => total += item.price * item.quantity )
    return total;
}

// --------------------------------------------------
// Exercise 4

const applyPromotionsCart = () =>  {
    cart.forEach( item => {

        if (item.offer && item.quantity >= item.offer.number) {

            const discount = item.offer.percent;
            const discountedPrice = item.price * (1 - discount / 100);

            item.subtotalWithDiscount = discountedPrice * item.quantity;
        } else {
            delete item.subtotalWithDiscount;
        }
    });
}

// --------------------------------------------------
// Exercise 5
 
function getElements(){
    const cartBox = document.getElementById("cart_list");
    const totalPriceElement = document.getElementById("total_price");

    return { cartBox, totalPriceElement };
}

const createCartElement = (item) => {
    const priceWithDiscount = item.subtotalWithDiscount || (item.price * item.quantity);

    const row = document.createElement("tr");
    row.innerHTML=`
        <th scope="row">${item.name}</th>
        <td>$${item.price}</td>
        <td>${item.quantity}</td>
        <td>$${Number.isInteger(priceWithDiscount) ? priceWithDiscount : priceWithDiscount.toFixed(2)}</td>
        <td><button class="remove-item btn btn-sm bg-danger text-white fw-bold" data-product-id="${item.id}">-</button></td>
        <td><button class="add-item btn btn-sm bg-primary text-white fw-bold" data-product-id="${item.id}">+</button></td>
    `;
    return { row, priceWithDiscount };
}

const printCart = () => {
    const { cartBox, totalPriceElement } = getElements();
    cartBox.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        const { row, priceWithDiscount } = createCartElement(item);
        cartBox.appendChild(row);

        total += priceWithDiscount;
    });

    totalPriceElement.textContent = Number.isInteger(total) ? total : total.toFixed(2);
}

// --------------------------------------------------
// Exercise 7

const removeFromCart = (id) => {
    const indexItem = cart.findIndex(item => item.id === id);
    if(indexItem === -1) return;

    const item = cart[indexItem];
    item.quantity > 1
        ? item.quantity -= 1
        : cart.splice(indexItem, 1);
};

const addFromCart = (id) => {
    const itemInCart = cart.find( item => item.id === id);

    if(!itemInCart) return;
    if(itemInCart.quantity) return itemInCart.quantity += 1;
}


const open_modal = () =>  {
    printCart();
}

// --------------------------------------------------
// Exercise Extra 
// * Me estaba dando toc que no subiera el contador del cart en el botton del navbar xD así que le he añadido la logica

const countProduct = () => {
    const countProduct = document.getElementById("count_product");
    const cleanCartButton = document.getElementById("clean-cart");
    let counting = 0;
    const cartNumber = cart.forEach(item => {
        item.quantity > 1
            ? counting += item.quantity
            : counting += 1
    })
    countProduct.innerText = counting

    counting === 0 
        ? cleanCartButton.disabled = true 
        : cleanCartButton.disabled = false
}

// ---------------------------------------------------------------------------------------------------- //
// Eventos 
document.addEventListener("DOMContentLoaded", async () => {
    await loadProducts();

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            const productId = button.getAttribute("data-product-id");

            buy(productId);
            calculateTotal();
            applyPromotionsCart();
            printCart();
            countProduct();
        });
    });



    document.getElementById("clean-cart").addEventListener("click", () => {
        cleanCart();
        printCart();
        countProduct();
        
    })

    document.getElementById("cart_list").addEventListener("click", (e) => {
        const itemId = Number(e.target.getAttribute("data-product-id"));

        if(e.target.classList.contains("remove-item")){
            removeFromCart(itemId);
            applyPromotionsCart();
            printCart();
            countProduct();
        }

        // Exercise Extra
        // * Ya que estaba no me costaba nada añadir un boton de add junto al de deleted y así he reafirmado la logica en mi cabeza

        if(e.target.classList.contains("add-item")){
            addFromCart(itemId);
            applyPromotionsCart();
            printCart();
            countProduct();
        }
    });
});