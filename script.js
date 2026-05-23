// Product Data - Pointing to your local 'img' folder
const products = [
    { 
        name: "Red Chilli Powder", 
        frontImg: "./img/chilli-front img.jpg", 
        backImg: "./img/chilli-back img.jpg", 
        desc: "Finely ground premium chillies for vibrant color and authentic heat.",
        variants: [
            { weight: "50g", price: 49 },
            { weight: "100g", price: 89 },
            { weight: "250g", price: 199 },
            { weight: "500g", price: 349 },
            { weight: "1kg", price: 599 }
        ]
    },
    { 
        name: "Coriander Powder", 
        frontImg: "./img/coriander-front img.jpg", 
        backImg: "./img/coriander-back img.jpg", 
        desc: "Aromatic and fresh ground seeds for the perfect curry base.",
        variants: [
            { weight: "50g", price: 39 },
            { weight: "100g", price: 69 },
            { weight: "250g", price: 149 },
            { weight: "500g", price: 249 },
            { weight: "1kg", price: 449 }
        ]
    },
    { 
        name: "Garam Masala", 
        frontImg: "./img/garam masala-front img.jpg", 
        backImg: "./img/garam masala-back img.jpg", 
        desc: "Aromatic and fresh ground seeds for the perfect curry base.",
        variants: [
            { weight: "50g", price: 149 },
            { weight: "100g", price: 249 },
            { weight: "250g", price: 549 },
            { weight: "500g", price: 999 },
            { weight: "1kg", price: 1949 }
        ]
    },
    { 
        name: "Turmeric Powder", 
        frontImg: "./img/turmeric-front img.jpg", 
        backImg: "./img/turmeric-back img.png", 
        desc: "100% Organic high-curcumin turmeric powder.",
        variants: [
            { weight: "50g", price: 49 },
            { weight: "100g", price: 79 },
            { weight: "250g", price: 179 },
            { weight: "500g", price: 299 },
            { weight: "1kg", price: 549 }
        ]
    }
];

const list = document.getElementById('product-list');

products.forEach((p, index) => {
    // Generate the dropdown options for weights
    let optionsHtml = p.variants.map(v => `<option value="${v.price}" data-weight="${v.weight}">${v.weight} - ₹${v.price}</option>`).join('');

    list.innerHTML += `
        <div class="card">
            <div class="image-container">
                <img src="${p.frontImg}" class="img-front" alt="${p.name} Front">
                <img src="${p.backImg}" class="img-back" alt="${p.name} Back">
                <div class="flip-hint">Hover to see back</div>
            </div>

            <div class="card-info">
                <h3>${p.name}</h3>
                <p class="product-desc">${p.desc}</p>
                
                <div class="pricing-box">
                    <label for="weight-${index}">Select Weight:</label>
                    <select id="weight-${index}" class="weight-select" onchange="updatePrice(${index})">
                        ${optionsHtml}
                    </select>
                </div>

                <div class="card-footer">
                    <span class="display-price" id="price-tag-${index}">₹${p.variants[0].price}</span>
                    <button onclick="orderViaWhatsApp(${index})" class="order-link">
                        <i class="fab fa-whatsapp"></i> Buy Now
                    </button>
                </div>
            </div>
        </div>
    `;
});

// Update price display when weight is changed
window.updatePrice = function(index) {
    const select = document.getElementById(`weight-${index}`);
    const priceTag = document.getElementById(`price-tag-${index}`);
    priceTag.innerText = `₹${select.value}`;
};

// Open WhatsApp with the specific product and weight
window.orderViaWhatsApp = function(index) {
    const p = products[index];
    const select = document.getElementById(`weight-${index}`);
    const selectedWeight = select.options[select.selectedIndex].getAttribute('data-weight');
    const selectedPrice = select.value;
    
    // --- ENTER THE CLIENT'S WHATSAPP NUMBER HERE ---
    // Format: Country Code + Phone Number (e.g., 919876543210). Do not include signs like '+' or '-'
    const whatsappNumber = "916387643090"; 
    
    const message = encodeURIComponent(`Hello Swaadica! I'd like to order ${p.name}.\nWeight: ${selectedWeight}\nPrice: ₹${selectedPrice}\nPlease confirm my order.`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
};

// 2. Navbar Scroll Effect Logic
window.addEventListener('scroll', function() {
    const nav = document.getElementById('main-nav');
    if (window.scrollY > 60) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});
// 3. Mobile Hamburger Menu Toggle Engine
document.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const toggleIcon = mobileToggle.querySelector('i');
    const navLinks = document.querySelectorAll('.nav-link-item, .contact-btn');

    // Toggle active state when clicking the hamburger icon
    mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        
        // Dynamic Icon morphing between Bars and Close cross
        if (navMenu.classList.contains('active')) {
            toggleIcon.className = 'fas fa-xmark';
            mobileToggle.style.transform = 'rotate(90deg)';
        } else {
            toggleIcon.className = 'fas fa-bars';
            mobileToggle.style.transform = 'rotate(0deg)';
        }
    });

    // Close mobile menu automatically when any navigational option is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            toggleIcon.className = 'fas fa-bars';
            mobileToggle.style.transform = 'rotate(0deg)';
        });
    });

    // Close menu if a user clicks anywhere outside the active drawer
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            toggleIcon.className = 'fas fa-bars';
            mobileToggle.style.transform = 'rotate(0deg)';
        }
    });
});
