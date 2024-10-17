// const time_holder=document.querySelector(".navbar-brand")
// console.log(time_holder);

// let index = 0

// const add=document.querySelector(".add")
// add.addEventListener("click",()=>{
//     index = index + 1
//     time_holder.innerHTML=index
 
// })

function updateTime() {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit',day: '2-digit',month: '2-digit',year:'2-digit' };
    document.getElementById('current-time').innerText = now.toLocaleTimeString([], options);
}

setInterval(updateTime, 1000); 
updateTime(); 

document.addEventListener("DOMContentLoaded", () => {
    displayCart()
    const productList = document.getElementById("productList");
    
    // fetch event
    fetch("http://localhost:8000/products")
    .then((response) => response.json())
    .then((products) => {
        products.forEach(product => {
            productList.innerHTML += `
              <div class="col">
                <div class="cont">
                  <div class="product-card">
                    <div class="product-card__image">
                      <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-card__info">
                      <h2 class="product-card__title">${product.name}</h2>
                      <p class="product-card__description">${product.description}</p>
                      <div class="product-card__price-row">
                        <span class="product-card__price">$${product.price}</span>
                        <button class="product-card__btn" onClick='AddToCart(${JSON.stringify(product).replace(/'/g, "\\'")})'>Add to Cart</button>
                        <button class="product-card__btn btn-danger" onClick='deleteProduct(${product.id})'>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `;
        });
         
    });
  
  
   
  
   
    // Function to delete a film
    function deleteFilm(filmId) {
      fetch(`http://localhost:3000/films/${filmId}`, {
        method: "DELETE",
      })
        .then(() => {
          // Remove the film from the list 
          const filmItem = document.querySelector(`[data-id='${product}']`);
          if (filmItem) {
            filmList.removeChild(filmItem);
          }
        });
    }
  
    productList.addEventListener("click", (event) => {
      if (event.target.classList.contains("delete-button")) {
        const filmId = event.target.parentElement.dataset.id;
        deleteFilm(filmId);
      }
    });
  });

  const AddToCart = (product) => {
    console.log(product);

    // Retrieve the existing cart from localStorage
    const existingCart = localStorage.getItem("cart");
    let cart = [];

    // If there is an existing cart, parse it; otherwise, initialize as empty
    if (existingCart) {
        try {
            cart = JSON.parse(existingCart);
            // Check if the parsed cart is an array
            if (!Array.isArray(cart)) {
                cart = [];
            }
        } catch (error) {
            console.error("Error parsing cart from localStorage:", error);
            cart = [];
        }
    }

    // Check if the product already exists in the cart
    const existingProduct = cart.find(item => item.id === product.id); // Assuming product has an `id`

    if (existingProduct) {
        // If it exists, increase the quantity and update subtotal
        existingProduct.quantity += 1;
        existingProduct.subTotal = existingProduct.quantity * existingProduct.price;
    } else {
        // If it does not exist, add it to the cart with quantity and subtotal
        const newProduct = {
            ...product,
            quantity: 1,
            subTotal: product.price // Initial subtotal is the price
        };
        cart.push(newProduct);
    }

    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    console.log(`${product.name} has been added to the cart.`);
};

function displayCart() {
    // Retrieve the existing cart from localStorage
    const existingCart = localStorage.getItem("cart");
    let cart = [];

    // If there is an existing cart, parse it; otherwise, initialize as empty
    if (existingCart) {
        try {
            cart = JSON.parse(existingCart);
            // Check if the parsed cart is an array
            if (!Array.isArray(cart)) {
                cart = [];
            }
        } catch (error) {
            console.error("Error parsing cart from localStorage:", error);
            cart = [];
        }
    }

    // Get the table body and total display elements
    const cartTableBody = document.querySelector(".cart-table tbody");
    const netTotalDisplay = document.getElementById("net-total");
    cartTableBody.innerHTML = ""; // Clear current cart display

    // If cart is empty, show a message
    if (cart.length === 0) {
        cartTableBody.innerHTML = "<tr><td colspan='3'>Your cart is empty.</td></tr>";
        netTotalDisplay.textContent = "$0.00";
        return;
    }

    // Display each item in the cart
    let total = 0;
    cart.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>Quantity: ${item.quantity} (Subtotal: $${item.subTotal.toFixed(2)})</td>
        `;
        cartTableBody.appendChild(row);
        total += item.subTotal; // Calculate total
    });

    // Update net total display
    netTotalDisplay.textContent = `$${total.toFixed(2)}`;
}

// Function to handle form submission
document.querySelector('#exampleModal form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Gather the input values
    const productName = document.getElementById('product').value;
    const description = document.getElementById('description').value;
    const price = parseFloat(document.getElementById('price').value); // Ensure price is a number
    const image = document.getElementById('image').value;

    // Create the product object
    const newProduct = {
        name: productName,
        description: description,
        price: price,
        image: image,
    };

    // Post the data to the server
    fetch('http://localhost:8000/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Product added successfully:', data);
        // Optionally, reset the form and close the modal
        document.querySelector('#exampleModal form').reset();
        // Close the modal (you might need to trigger Bootstrap modal close)
        const modalElement = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
        modalElement.hide();
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
});

function deleteProduct(productId) {
    // Confirm deletion
    if (confirm("Are you sure you want to delete this product?")) {
        // Remove the product from the displayed list
        const productElements = document.querySelectorAll('.product-card');
        productElements.forEach(productElement => {
            const titleElement = productElement.querySelector('.product-card__title');
            if (titleElement && titleElement.textContent === productId) {
                productElement.remove(); // Remove the product card from the DOM
            }
        });

        // Optionally, remove the product from localStorage if you're storing products there
        fetch(`http://localhost:8000/products/${productId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(`Product with ID ${productId} deleted successfully.`);
        })
        .catch(error => {
            console.error('There was a problem with the delete operation:', error);
        });
    }
}

