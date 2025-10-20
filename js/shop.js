// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
const products = [
    {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]

// => Reminder, it's extremely important that you debug your code. 
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster. 
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.

const cart = [];

const total = 0;

// Exercise 1
const buy = (id) => {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cart array

    const product = products.find( item => item.id === Number(id));
    const productInCart = cart.find( item => item.id === Number(id));

    if(productInCart){
        productInCart.quantity += 1;
    }else{
        const productAdd = {...product, quantity: 1}
        cart.push(productAdd)
    } 
    // console.log(cart)
}

// Exercise 2
const cleanCart = () =>  {
    cart.length = 0;
}

// Exercise 3
const calculateTotal = () =>  {
    // Calculate total price of the cart using the "cartList" array

    let cartList = 0;
    for(let i = 0; i < cart.length; i++){
        cartList += cart[i].price * cart[i].quantity;
    }
    return cartList = 0;
    // console.log(cartList)
}

// Exercise 4
const applyPromotionsCart = () =>  {
    // Apply promotions to each item in the array "cart"

    cart.forEach( item => {

        if (item.offer && item.quantity >= item.offer.number) {

            const discount = item.offer.percent;
            const discountedPrice = item.price * (1 - discount / 100);

            item.subtotalWithDiscount = discountedPrice * item.quantity;
        }
        // console.log(item.subtotalWithDiscount)
    });
}

// Exercise 5
const printCart = () => {
    // Fill the shopping cart modal manipulating the shopping cart dom

    const cartBox = document.getElementById("cart_list");
    const totalPriceElement = document.getElementById("total_price");
    cartBox.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        const priceWithDiscount = item.subtotalWithDiscount || (item.price * item.quantity);

        const row = document.createElement("tr");
        row.innerHTML=`
            <th scope="row">${item.name}</th>
            <td>$${item.price}</td>
            <td>${item.quantity}</td>
            <td>$${Number.isInteger(priceWithDiscount) ? priceWithDiscount : priceWithDiscount.toFixed(2)}</td>
        `;
        cartBox.appendChild(row);

        total += priceWithDiscount;
    });

    totalPriceElement.textContent = Number.isInteger(total) ? total : total.toFixed(2);

}

// ** Nivell II **

// Exercise 7
const removeFromCart = (id) => {

}

const open_modal = () =>  {
    printCart();
}

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        const productId = button.getAttribute("data-product-id");
        buy(productId);
        calculateTotal();
        applyPromotionsCart();
        printCart();
    });
});
document.getElementById("clean-cart").addEventListener("click", () => {
    cleanCart();
    printCart();
})