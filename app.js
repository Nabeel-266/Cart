import {
    db,
    collection,
    getDocs,
    storage,
    ref,
    getDownloadURL
} from './Firebase-Configuration/Firebase_Config.js';


const cart = document.querySelector('.cart');

cart.addEventListener("click", () => {
    window.location.href = "./Cart/cart.html"
})


const cardsArea = document.querySelector(".cardsArea");
const cartCounter = document.getElementById("cartCounter");
let cartCounterVal = 0;
cartCounter.innerText = cartCounterVal;

async function getAllProducts() {
    try {
        const querySnapshot = await getDocs(collection(db, "Products"));
        querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());

            const productID = doc.id;
            const { title, description, price, image } = doc.data();

            // For Every Single Product
            const singleProduct = document.createElement("div");
            singleProduct.setAttribute("class", "card");
            singleProduct.setAttribute("style", "width: 30rem");

            let singleProductContent =
                `<img src="${image}" class="card-img-top img-fluid" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text m-0">${description}</p>
                    <p class="card-text">${price} Only</p>
                    <div class="btnArea">
                        <span class="quantityValue">
                            <button class="decrementBtn" onclick="decreaseProductQuantity('${productID}')">
                                <i class="fa-solid fa-minus"></i>
                            </button>
                            <p class="quantityCounter m-0" id="${productID}">1</p>
                            <button class="incrementBtn" onclick="increaseProductQuantity('${productID}')">
                                <i class="fa-solid fa-plus"></i>
                            </button>
                        </span>
                        <button class="btn btn-primary addToCartBtn" onclick="addToCartProduct('${productID}')">Add To Cart</button>
                    </div>
                </div>`;

            singleProduct.innerHTML = singleProductContent;
            cardsArea.appendChild(singleProduct);

            const quantityValue = document.querySelector('.quantityValue');
            const decrementBtn = document.querySelector('.decrementBtn');
            const incrementBtn = document.querySelector('.incrementBtn');
            const quantityCounter = document.querySelectorAll('.quantityCounter');
            const addToCartBtn = document.querySelector('.addToCartBtn');

            let cartCounterVal = 0;
            function increaseProductQuantity(prdId) {
                // console.log(prdId)
                for (const element of quantityCounter) {
                    if (element.id === prdId) {
                        const productQty = +element.innerText + 1;
                        if (productQty <= 5) {
                            element.innerText++;
                        }
                        else {
                            alert("Dear Costumer!\nYou can only add 5 of this product to your cart in one order");
                        }
                    }
                }
            };

            function decreaseProductQuantity(prdId) {
                // console.log(prdId)
                for (const element of quantityCounter) {
                    if (element.id === prdId) {
                        const productQty = +element.innerText - 1;
                        if (productQty >= 1) {
                            element.innerText--;
                        }
                    }
                }
            };

            function addToCartProduct(prdId) {
                // console.log(prdId)
                for (const element of quantityCounter) {
                    if (element.id === prdId) {
                        const productQty = +element.innerText;
                        cartCounterVal += productQty;
                        cartCounter.innerText = cartCounterVal;
                    }
                }
            };

            window.increaseProductQuantity = increaseProductQuantity;
            window.decreaseProductQuantity = decreaseProductQuantity;
            window.addToCartProduct = addToCartProduct;
        });
    }
    catch (error) {
        console.error("Error in getAllProducts()", error)
    }
}

getAllProducts();


// function getImages() {

//     // Get a reference to the image you want to retrieve
//     const imageRef = ref(storage, 'Product-Images/product-1.jpg');

//     // Get the download URL for the image
//     getDownloadURL(imageRef)
//         .then((url) => {
//             console.log('Image URL:', url);
//             // Now you can use the URL in your console or application
//         })
//         .catch((error) => {
//             console.error('Error getting download URL:', error);
//         });


// }
// getImages()



































// let cartCounterVal = 0;
// cartCounter.innerText = cartCounterVal;

// const quantityValueArr = Array.from(quantityValue);

// quantityValue.forEach((item, index) => {
//     let counter = 0;

//     incrementBtn[index].addEventListener('click', () => {
//         counter++;
//         quantityCounter[index].innerText = counter;
//     })

//     decrementBtn[index].addEventListener('click', () => {
//         if (counter <= 0) {
//             counter = 0;
//         }
//         else {
//             counter--;
//             quantityCounter[index].innerText = counter;
//         }
//     })

//     addToCartBtn[index].addEventListener('click', () => {
//         cartCounter.innerText = cartCounterVal += counter;
//         quantityCounter[index].innerText = 0
//         counter = 0;
//     })
// });