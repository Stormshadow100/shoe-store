// Get the cart icon and close button
let cartIcon = document.querySelector('.cart-icon');
let closeCart = document.querySelector('.close');

// Get the body element
let body = document.querySelector('body');

// Check if the elements are found before attaching event listeners
if (cartIcon && closeCart && body) {
    // Toggle the 'showcart' class on body when the cart icon is clicked
    cartIcon.addEventListener('click', () => {
        body.classList.toggle('showcart');
    });

    // Toggle the 'showcart' class on body when the close button is clicked
    closeCart.addEventListener('click', () => {
        body.classList.toggle('showcart');
    });
}


// Fetch and display shoe data
function fetchAndDisplayShoeData() {
    fetch('products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Get all the product elements
            const products = document.querySelectorAll('.prod');

            // Loop through each product element and set product details
            products.forEach(product => {
                const productId = product.dataset.id; // Get the product ID from the data attribute
                const productData = data.find(item => item.id === parseInt(productId));

                if (productData) {
                    const addButton = product.querySelector('.addcart');
                    addButton.addEventListener('click', () => addToCart(productData));
                }
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

//add the selected product to the cart
function addToCart(product) {
    // Implement cart logic
    console.log('Added to cart:', product.name);
   
}

fetchAndDisplayShoeData();
