document.addEventListener('DOMContentLoaded', function () {
    loadCartItems();
    updateCartSubtotal();
    updateCartItemCount();
});

function loadCartItems() {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var cartContainer = document.getElementById('cartContainer');
    cartContainer.innerHTML = ''; // Clear existing items

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
}

function updateCartSubtotal() {
    var subtotal = 0;
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.forEach(function (item) {
        var price = parseFloat(item.price.replace('$', ''));
        var quantity = parseInt(item.quantity);
        subtotal += price * quantity;
    });
    var tax = subtotal * 0.05; // Assuming 5% tax rate
    var total = subtotal + tax;
    document.getElementById('cartSubtotal').textContent = subtotal.toFixed(2);
    document.getElementById('cartTax').textContent = tax.toFixed(2);
    document.getElementById('cartTotal').textContent = total.toFixed(2);
}

function addItemToCart(item) {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var existingItem = cartItems.find(function (cartItem) {
        return cartItem.productId === item.productId;
    });
    if (existingItem) {
        existingItem.quantity = Number(existingItem.quantity) + 1;
    } else {
        item.quantity = 1;
        cartItems.push(item);
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    loadCartItems();
    updateCartSubtotal();
    updateCartItemCount();
}

function deleteCartItem(productId) {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var updatedCartItems = cartItems.filter(function (item) {
        return item.productId !== productId;
    });
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    loadCartItems();
    updateCartSubtotal();
    updateCartItemCount();
}

function increaseQuantity(productId) {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var updatedCartItems = cartItems.map(function (item) {
        if (item.productId === productId) {
            item.quantity = Number(item.quantity) + 1;
        }
        return item;
    });
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    loadCartItems();
    updateCartSubtotal();
    updateCartItemCount();
}

function decreaseQuantity(productId) {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var updatedCartItems = cartItems.map(function (item) {
        if (item.productId === productId && item.quantity > 1) {
            item.quantity = Number(item.quantity) - 1;
        }
        return item;
    });
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    loadCartItems();
    updateCartSubtotal();
    updateCartItemCount();
}

function updateCartItemCount() {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var itemCount = cartItems.reduce(function (total, item) {
        return total + Number(item.quantity);
    }, 0);
    document.getElementById('cartItemCount').textContent = itemCount;
}

function placeOrder() {
    // Clear cart items from localStorage and update the cart
    localStorage.removeItem('cartItems');
    loadCartItems();
    updateCartSubtotal();
    updateCartItemCount();
    alert('Order placed successfully!');
}

function validateForm() {
    // Get form elements
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var address = document.getElementById('address').value.trim();
    var city = document.getElementById('city').value.trim();
    var state = document.getElementById('state').value.trim();
    var zip = document.getElementById('zip').value.trim();
    var country = document.getElementById('country').value.trim();
    var sameAddress = document.getElementById('sameaddress').checked;

    // Regular expression for email validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate fields
    if (name === '') {
        alert('Full Name is required');
        return false;
    }
    if (email === '' || !emailRegex.test(email)) {
        alert('Valid Email is required');
        return false;
    }
    if (address === '') {
        alert('Address is required');
        return false;
    }
    if (city === '') {
        alert('City is required');
        return false;
    }
    if (state === '') {
        alert('State is required');
        return false;
    }
    if (zip === '') {
        alert('Postal Code is required');
        return false;
    }
    if (country === '') {
        alert('Country is required');
        return false;
    }

    // If all validations pass
    document.getElementById('confirmationOverlay').style.display = 'flex';
    placeOrder(); // Clear the cart when the order is placed
    return true;
}