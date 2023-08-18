import {
    app,
    db,
    storage,
    collection,
    addDoc,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "../Firebase-Configuration/Firebase_Config.js";


const cart = document.querySelector('.cart');

cart.addEventListener("click", () => {
    window.location.href = "../Cart/cart.html"
})


const productTitle = document.querySelector('#productTitle');
const productPrice = document.querySelector('#productPrice');
const productImage = document.querySelector('#productImage');
const productDescription = document.querySelector('#productDescription');
const createBtn = document.querySelector('#createBtn');

createBtn.addEventListener('click', productCreation);
async function productCreation() {
    if (productTitle.value && productPrice.value && productImage.value && productDescription.value) {

        const file = productImage.files[0];

        // Create the file metadata
        /** @type {any} */
        const metadata = {
            contentType: "image/jpeg",
        };

        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(storage, "Product-Images/" + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                }
            },
            (error) => {
                switch (error.code) {
                    case "storage/unauthorized":
                        // User doesn't have permission to access the object
                        console.log("User doesn't have permission to access the object");
                        break;
                    case "storage/canceled":
                        // User canceled the upload
                        console.log("User canceled the upload");
                        break;

                    case "storage/unknown":
                        // Unknown error occurred, inspect error.serverResponse
                        console.log("Unknown error occurred, inspect error.serverResponse");
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    console.log("File available at", downloadURL);

                    try {
                        const productDetails = {
                            title: productTitle.value,
                            price: `Rs ${productPrice.value}`,
                            image: downloadURL,
                            description: productDescription.value,
                        }
                        const docRef = await addDoc(collection(db, "Products"), productDetails);
                        console.log("Document written with ID: ", docRef.id);
                    }
                    catch (e) {
                        console.error("Error adding document: ", e);
                    }
                });
            }
        )
    }
    else {
        alert("Please fill up all fields")
    }
}
