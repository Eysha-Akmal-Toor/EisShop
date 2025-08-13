function toggleFilter() {
    const filterIcon = document.querySelector('.material-icons');
    const filterMenu = document.getElementById('filterMenu');

    // Get the position of the filter icon
    const iconRect = filterIcon.getBoundingClientRect();

    // Set the position of the filter menu relative to the filter icon
    filterMenu.style.top = `${iconRect.bottom}px`;
    filterMenu.style.left = `${iconRect.left}px`;

    filterMenu.classList.toggle('active');
}

function updatePriceDisplay() {
    const priceRange = document.getElementById('priceRange');
    const minHandle = document.getElementById('minHandle');
    const maxHandle = document.getElementById('maxHandle');
    const minPriceDisplay = document.getElementById('minPriceDisplay');
    const maxPriceDisplay = document.getElementById('maxPriceDisplay');
    const range = priceRange.getBoundingClientRect();

    const minPosition = parseFloat(minHandle.style.left) || 0;
    const maxPosition = parseFloat(maxHandle.style.left) || range.width;
    const minPrice = Math.round((minPosition / range.width) * 20);
    const maxPrice = Math.round((maxPosition / range.width) * 20);

    minPriceDisplay.textContent = `$${minPrice}`;
    maxPriceDisplay.textContent = `$${maxPrice}`;

    const sliderRange = document.querySelector(".slider-range");
    sliderRange.style.left = minPosition + "px";
    sliderRange.style.width = (maxPosition - minPosition) + "px";
}

function filterProducts() {
    const minPriceDisplay = parseFloat(document.getElementById('minPriceDisplay').textContent.slice(1));
    const maxPriceDisplay = parseFloat(document.getElementById('maxPriceDisplay').textContent.slice(1));
    const products = document.querySelectorAll('.product2');

    products.forEach(product => {
        const price = parseFloat(product.getAttribute('data-price'));
        const category = product.getAttribute('data-category');
        const selectedCategories = Array.from(document.querySelectorAll('.filter-menu input[type="checkbox"]:checked')).map(cb => cb.value);

        if ((selectedCategories.length === 0 || selectedCategories.includes(category)) && price >= minPriceDisplay && price <= maxPriceDisplay) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}


document.addEventListener("DOMContentLoaded", () => {
    const priceRange = document.getElementById("priceRange");
    const minHandle = document.getElementById("minHandle");
    const maxHandle = document.getElementById("maxHandle");

    let draggingMin = false;
    let draggingMax = false;

    minHandle.addEventListener("mousedown", (event) => {
        event.preventDefault();
        draggingMin = true;
    });

    maxHandle.addEventListener("mousedown", (event) => {
        event.preventDefault();
        draggingMax = true;
    });

    document.addEventListener("mousemove", (event) => {
        event.preventDefault();
        if (draggingMin) {
            moveHandle(event, minHandle, maxHandle);
        } else if (draggingMax) {
            moveHandle(event, maxHandle, minHandle);
        }
    });

    document.addEventListener("mouseup", () => {
        draggingMin = false;
        draggingMax = false;
    });

    function moveHandle(event, handle, otherHandle) {
        const range = priceRange.getBoundingClientRect();
        let position = event.clientX - range.left;
        position = Math.min(range.width, Math.max(0, position));

        if (handle === minHandle && position > parseFloat(otherHandle.style.left)) {
            position = parseFloat(otherHandle.style.left);
        } else if (handle === maxHandle && position < parseFloat(otherHandle.style.left)) {
            position = parseFloat(otherHandle.style.left);
        }

        handle.style.left = position + "px";
        updatePriceDisplay();
    }
});
function filterProducts() {
    const minPriceDisplay = parseFloat(document.getElementById('minPriceDisplay').textContent.slice(1));
    const maxPriceDisplay = parseFloat(document.getElementById('maxPriceDisplay').textContent.slice(1));
    const products = document.querySelectorAll('.product2');
    const productCountElement = document.getElementById('productCount');
    const productsContainer = document.querySelector('.products2');
    const isListView = productsContainer.classList.contains('list-view');

    let count = 0;

    products.forEach(product => {
        const price = parseFloat(product.getAttribute('data-price'));
        const category = product.getAttribute('data-category');
        const selectedCategories = Array.from(document.querySelectorAll('.filter-menu input[type="checkbox"]:checked')).map(cb => cb.value);

        if ((selectedCategories.length === 0 || selectedCategories.includes(category)) && price >= minPriceDisplay && price <= maxPriceDisplay) {
            product.style.display = isListView ? 'flex' : 'block';
            count++;
        } else {
            product.style.display = 'none';
        }
    });

    // Update the product count display
    if (count === 0) {
        productCountElement.textContent = `No products found`;
    } else {
        productCountElement.textContent = `Showing 1 - ${count} of ${products.length} products`;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const products = document.querySelectorAll('.product2');
    const productCountElement = document.getElementById('productCount');

    productCountElement.textContent = `Showing 1 - ${products.length} of ${products.length} products`;

    // JavaScript for handling view mode switching
    document.addEventListener("DOMContentLoaded", () => {
        const listViewIcon = document.querySelector('.material-icons:nth-child(4)');
        const gridViewIcon = document.querySelector('.material-icons:nth-child(5)');
        const productsContainer = document.querySelector('.products2');

        listViewIcon.addEventListener('click', () => {
            productsContainer.classList.add('list-view');
            productsContainer.classList.remove('grid-view');
        });

        gridViewIcon.addEventListener('click', () => {
            productsContainer.classList.remove('list-view');
            productsContainer.classList.add('grid-view');
        });
    });
});
function updateProductCount() {
    const minPriceDisplay = parseFloat(document.getElementById('minPriceDisplay').textContent.slice(1));
    const maxPriceDisplay = parseFloat(document.getElementById('maxPriceDisplay').textContent.slice(1));
    const products = document.querySelectorAll('.product2');
    const productCountElement = document.getElementById('productCount');

    let count = 0;

    products.forEach(product => {
        const price = parseFloat(product.getAttribute('data-price'));
        const category = product.getAttribute('data-category');
        const selectedCategories = Array.from(document.querySelectorAll('.filter-menu input[type="checkbox"]:checked')).map(cb => cb.value);

        if ((selectedCategories.length === 0 || selectedCategories.includes(category)) && price >= minPriceDisplay && price <= maxPriceDisplay) {
            product.style.display = 'block';
            count++;
        } else {
            product.style.display = 'none';
        }
    });

    // Update the product count display
    if (count === 0) {
        productCountElement.textContent = `No products found`;
    } else {
        productCountElement.textContent = `Showing 1 - ${count} of ${products.length} products`;
    }
}
function toggleGridView() {
    const productsContainer = document.querySelector('.products2');
    productsContainer.classList.remove('list-view');
    productsContainer.classList.add('grid-view');
}

function toggleListView() {
    const productsContainer = document.querySelector('.products2');
    productsContainer.classList.remove('grid-view');
    productsContainer.classList.add('list-view');
}
/*sidebar js*/
function updateSubtotal() {
    var subtotal = 0;
    var sidebarItems = document.querySelectorAll('.sidebar-details');
    sidebarItems.forEach(function (item) {
        var price = parseFloat(item.querySelector('p').textContent.replace('$', ''));
        var quantity = parseInt(item.querySelector('.sidebar-quantity').textContent);
        subtotal += price * quantity;
    });
    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
}

function openSidebar(imgSrc, name, price, productId) {
    document.getElementById("mySidebar").style.width = "300px";
    document.getElementById("overlay").style.display = "block";

    var existingItem = document.querySelector(`.sidebar-details[data-product-id="${productId}"]`);
    if (existingItem) {
        var quantityElement = existingItem.querySelector('.sidebar-quantity');
        var quantity = parseInt(quantityElement.textContent);
        quantityElement.textContent = quantity + 1;
    } else {
        var sidebarItem = document.createElement('div');
        sidebarItem.classList.add('sidebar-details');
        sidebarItem.dataset.productId = productId;
        sidebarItem.innerHTML = `
        <span class="sidebar-deleteicon" onclick="deleteSidebarItem('${productId}')">&times;</span>
        <img src="${imgSrc}" alt="Product Image">
        <h3>${name}</h3>
        <p>${price}</p>
        <span class="sidebar-quantity">1</span>
    `;
        document.querySelector('.sidebar').appendChild(sidebarItem);
    }
    updateSubtotal();
    updateLocalStorage();
}
function deleteSidebarItem(productId) {
    var sidebarDetails = document.querySelector(`.sidebar-details[data-product-id="${productId}"]`);
    if (sidebarDetails) {
        var quantityElement = sidebarDetails.querySelector('.sidebar-quantity');
        var quantity = parseInt(quantityElement.textContent);
        if (quantity > 1) {
            quantityElement.textContent = quantity - 1;
        } else {
            sidebarDetails.parentNode.removeChild(sidebarDetails);
        }
    }
    updateSubtotal();
    updateLocalStorage();

    if (!document.querySelector('.sidebar-details')) {
        closeSidebar();
    }
}

function closeSidebar() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("overlay").style.display = "none";
}

function updateLocalStorage() {
    var sidebarItems = document.querySelectorAll('.sidebar-details');
    var cartItems = [];
    sidebarItems.forEach(function (item) {
        var productId = item.dataset.productId;
        var imgSrc = item.querySelector('img').src;
        var name = item.querySelector('h3').textContent;
        var price = item.querySelector('p').textContent;
        var quantity = item.querySelector('.sidebar-quantity').textContent;
        cartItems.push({ productId, imgSrc, name, price, quantity });
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}


function viewCart() {
    window.location.href = 'Cart.html';
}