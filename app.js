// Mobile menu toggle functionality
// JavaScript for mobile responsiveness
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const mobileCloseButton = document.getElementById("mobile-close-button");
// Toggle mobile menu visibility
mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});
// Close mobile menu when close button is clicked
mobileCloseButton.addEventListener("click", () => {
  mobileMenu.classList.add("hidden");
});
// Slider
const slider = document.getElementById("slider");
const slides = slider.children;
const totalSlides = slides.length;
let index = 0;

function showSlide(i) {
  slider.style.transform = `translateX(-${i * 100}%)`;
}

document.getElementById("next").addEventListener("click", () => {
  index = (index + 1) % totalSlides;
  showSlide(index);
});

document.getElementById("prev").addEventListener("click", () => {
  index = (index - 1 + totalSlides) % totalSlides;
  showSlide(index);
});

// Auto-play
setInterval(() => {
  index = (index + 1) % totalSlides;
  showSlide(index);
}, 2000);

// Honey data
const honeyProducts = {
  western: {
    name: "Western Honey Bee",
    description: "Mild, sweet flavor perfect for everyday use",
    price: "$12.99",
    image: "https://via.placeholder.com/400x300?text=Western+Honey",
  },
  indian: {
    name: "Indian Honey Bee",
    description: "Distinctive floral aroma with rich golden color",
    price: "$15.99",
    image: "https://via.placeholder.com/400x300?text=Indian+Honey",
  },
  giant: {
    name: "Giant Honey Bee",
    description: "Strong, robust flavor for honey connoisseurs",
    price: "$18.99",
    image: "https://via.placeholder.com/400x300?text=Giant+Honey",
  },
  blackDwarf: {
    name: "Black Dwarf Honey Bee",
    description: "Rare dark honey with intense flavor",
    price: "$24.99",
    image: "https://via.placeholder.com/400x300?text=Black+Dwarf+Honey",
  },
  redDwarf: {
    name: "Red Dwarf Honey Bee",
    description: "Exotic reddish honey with complex notes",
    price: "$22.99",
    image: "https://via.placeholder.com/400x300?text=Red+Dwarf+Honey",
  },
};

let currentProduct = null;

// Add to cart function
function addToCart(productId) {
  currentProduct = honeyProducts[productId];

  Swal.fire({
    title: "Added to Cart!",
    text: `${currentProduct.name} has been added to your cart`,
    imageUrl: currentProduct.image,
    imageWidth: 200,
    imageHeight: 150,
    imageAlt: currentProduct.name,
    showCancelButton: true,
    confirmButtonColor: "#439353",
    cancelButtonColor: "#d33",
    confirmButtonText: "Proceed to Checkout",
    cancelButtonText: "Continue Shopping",
    background: "#fff4a4",
    color: "#386641",
  }).then((result) => {
    if (result.isConfirmed) {
      openOrderModal();
    }
  });
}

// Open order modal
function openOrderModal() {
  const modal = document.getElementById("orderModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalContent = document.getElementById("modalContent");

  modalTitle.textContent = `Order ${currentProduct.name}`;

  modalContent.innerHTML = `
                <div class="flex items-start space-x-4">
                    <img src="${currentProduct.image}" alt="${currentProduct.name}" class="w-24 h-24 object-cover rounded">
                    <div>
                        <h4 class="font-bold text-lg">${currentProduct.name}</h4>
                        <p class="text-gray-600">${currentProduct.description}</p>
                        <p class="text-xl font-bold text-[#439353] mt-2">${currentProduct.price}</p>
                    </div>
                </div>
                <div class="pt-4 border-t border-gray-200">
                    <label class="block text-gray-700 mb-2">Shipping Address</label>
                    <input type="text" id="shippingAddress" class="w-full p-2 border border-gray-300 rounded" placeholder="Enter your address">
                </div>
            `;

  modal.classList.remove("hidden");
}

// Close modal
function closeModal() {
  document.getElementById("orderModal").classList.add("hidden");
}

// Place order function
function placeOrder() {
  const address = document.getElementById("shippingAddress").value;

  if (!address) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please enter your shipping address!",
      confirmButtonColor: "#439353",
    });
    return;
  }

  closeModal();

  Swal.fire({
    title: "Order Placed!",
    text: `Your order for ${currentProduct.name} has been placed successfully.`,
    icon: "success",
    confirmButtonColor: "#439353",
    background: "#fff4a4",
    color: "#386641",
  });

  // Here you would typically send the order to your backend
  console.log(`Order placed: ${currentProduct.name} to ${address}`);
}

// Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById("orderModal");
  if (event.target === modal) {
    closeModal();
  }
};

document.querySelectorAll("#addToCart").forEach((button) => {
  button.addEventListener("click", function () {
    const honeyType = this.getAttribute("data-honey-type");
    const price = this.getAttribute("data-price");
    const image = this.getAttribute("data-image");
    // Show the SweetAlert modal
    Swal.fire({
      title: `${honeyType}`,
      html: `
                    <img src="${image}" alt="${honeyType}" style="width: 500px; height: 300px;">
                    <p>Price: ${price}</p>
                    <p>Do you want to place the order?</p>
                `,
      showCancelButton: true,
      confirmButtonText: "Place Order",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "custom-confirm-button",
        cancelButton: "custom-cancel-button",
      },
      buttonsStyling: false,
      background: "#3866418a",
      color: "#ffef76ff",
    }).then((result) => {
      if (result.isConfirmed) {
        // Show confirmation alert
        Swal.fire({
          title: "Order Placed!",
          text: `Your order for ${honeyType} has been placed.`,
          icon: "success",
          background: "#fff4a4",
          color: "#386641",
          customClass: {
            confirmButton: "custom-confirm-button",
            cancelButton: "custom-cancel-button",
          },
        });
      }
    });
  });
});

// Form Validation
document.addEventListener("DOMContentLoaded" , () => {

  const signupForm = document.getElementById("signupForm");
  const userName = document.getElementById("name");
  const userEmail = document.getElementById("email");
  const userPassword = document.getElementById("password");
  
  // Logic validation
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    // Check name validation
    if (userName.value.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Enter Your Name",
      });
      return;
    }
  
    // Check email validation
    if (!userEmail.value.includes("@") || !userEmail.value.includes(".")) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Enter Your Email Address",
      });
      return;
    }
  
    // Check password validation
    if (userPassword.value.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password Must be 6 Characters",
      });
      return;
    }
  
    // If all validations pass
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Form submitted successfully",
    }).then(() => {
      signupForm.reset();
    });
  });
})
