function updateCartItemCount() {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var itemCount = cartItems.reduce(function (total, item) {
        return total + Number(item.quantity); // Ensure quantity is treated as a number
    }, 0);
    document.getElementById('cartItemCount').textContent = itemCount;
}

document.addEventListener('DOMContentLoaded', function () {
    updateCartItemCount();
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var cartContainer = document.getElementById('cartContainer');
    cartItems.forEach(function (item) {
        var cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.dataset.productId = item.productId;
        cartItem.innerHTML = `
        <span class="cart-deleteicon" onclick="deleteCartItem('${item.productId}')">&times;</span>
        <img src="${item.imgSrc}" alt="Product Image">
        <h3>${item.name}</h3>
        <p>${item.price}</p>
        <div class="cart-quantity-controls">
            <button class="quantity-btn" onclick="decreaseQuantity('${item.productId}')">-</button>
            <span class="cart-quantity">${item.quantity}</span>
            <button class="quantity-btn" onclick="increaseQuantity('${item.productId}')">+</button>
        </div>
    `;
        cartContainer.appendChild(cartItem);
    });
    updateCartSubtotal();
    updateCartItemCount();
});

function addItemToCart(item) {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var existingItem = cartItems.find(function (cartItem) {
        return cartItem.productId === item.productId;
    });
    if (existingItem) {
        existingItem.quantity = Number(existingItem.quantity) + 1; // Ensure quantity is treated as a number
    } else {
        item.quantity = 1;
        cartItems.push(item);
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartItemCount();
}

function deleteCartItem(productId) {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var updatedCartItems = cartItems.filter(function (item) {
        return item.productId !== productId;
    });
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    updateCartItemCount();
    location.reload();
}

function increaseQuantity(productId) {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var updatedCartItems = cartItems.map(function (item) {
        if (item.productId === productId) {
            item.quantity = Number(item.quantity) + 1; // Ensure quantity is treated as a number
        }
        return item;
    });
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    updateCartItemCount();
    location.reload();
}

function decreaseQuantity(productId) {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var updatedCartItems = cartItems.map(function (item) {
        if (item.productId === productId && item.quantity > 1) {
            item.quantity = Number(item.quantity) - 1; // Ensure quantity is treated as a number
        }
        return item;
    });
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    updateCartItemCount();
    location.reload();
}