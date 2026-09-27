
// ==========================================
// SHARONS GLAM - WEBSITE JAVASCRIPT
// ==========================================

// 1. PRELOADER
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");

    setTimeout(() => {
        preloader.classList.add("hide");
    }, 700);
});

// 2. HEADER SCROLL EFFECT
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
});

// 3. MOBILE NAVIGATION
const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link, .nav-book");

function closeMenu() {
    navbar.classList.remove("open");
    menuToggle.classList.remove("active");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen);
});

navLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
});

// 4. ACTIVE NAVIGATION LINK
const sections = document.querySelectorAll("main section[id]");

window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }
    });

    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
});

// 5. SCROLL REVEAL ANIMATIONS
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// 6. PRICE MENU
// DEMO PRICES - CONFIRM WITH SALON OWNER BEFORE PUBLISHING

const priceData = {
    hair: [
        {
            name: "Haircut & Styling",
            description: "Personalised haircut and finishing",
            price: "₹499+"
        },
        {
            name: "Hair Wash & Blow Dry",
            description: "Wash and professional blow dry",
            price: "₹399+"
        },
        {
            name: "Hair Spa",
            description: "Nourishing hair care treatment",
            price: "₹799+"
        },
        {
            name: "Hair Smoothening",
            description: "Smoothing treatment consultation",
            price: "₹2,499+"
        },
        {
            name: "Hair Colour",
            description: "Colouring based on hair length",
            price: "₹1,499+"
        },
        {
            name: "Highlights",
            description: "Custom highlight consultation",
            price: "₹1,999+"
        }
    ],

    skin: [
        {
            name: "Basic Facial",
            description: "Refreshing facial experience",
            price: "₹699+"
        },
        {
            name: "Clean-Up",
            description: "Basic skin cleansing treatment",
            price: "₹399+"
        },
        {
            name: "Detan Treatment",
            description: "Skin detan service",
            price: "₹599+"
        },
        {
            name: "Advanced Facial",
            description: "Facial options after consultation",
            price: "₹1,499+"
        }
    ],

    makeup: [
        {
            name: "Party Makeup",
            description: "Makeup for special occasions",
            price: "₹1,999+"
        },
        {
            name: "Engagement Makeup",
            description: "Occasion makeup consultation",
            price: "₹4,999+"
        },
        {
            name: "Bridal Makeup",
            description: "Bridal package consultation",
            price: "₹9,999+"
        },
        {
            name: "Hairstyling",
            description: "Occasion hair styling",
            price: "₹799+"
        }
    ],

    grooming: [
        {
            name: "Beard Styling",
            description: "Beard shaping and grooming",
            price: "₹199+"
        },
        {
            name: "Haircut",
            description: "Haircut and finishing",
            price: "₹299+"
        },
        {
            name: "Threading",
            description: "Basic threading service",
            price: "₹99+"
        },
        {
            name: "Waxing",
            description: "Waxing service by area",
            price: "₹199+"
        }
    ]
};

const priceList = document.getElementById("priceList");
const priceTabs = document.querySelectorAll(".price-tab");

function displayPrices(category) {
    const items = priceData[category];

    priceList.innerHTML = "";

    items.forEach((item, index) => {
        const priceItem = document.createElement("div");
        priceItem.className = "price-item";
        priceItem.style.animationDelay = `${index * 70}ms`;

        const details = document.createElement("div");

        const title = document.createElement("h4");
        title.textContent = item.name;

        const description = document.createElement("p");
        description.textContent = item.description;

        const price = document.createElement("strong");
        price.textContent = item.price;

        details.appendChild(title);
        details.appendChild(description);

        priceItem.appendChild(details);
        priceItem.appendChild(price);

        priceList.appendChild(priceItem);
    });
}

priceTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        priceTabs.forEach(button => {
            button.classList.remove("active");
        });

        tab.classList.add("active");

        const category = tab.dataset.category;
        displayPrices(category);
    });
});

// Show hair prices by default
displayPrices("hair");

// 7. BOOKING DATE MINIMUM
const dateInput = document.getElementById("date");

const today = new Date();
const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

dateInput.min = localToday;
dateInput.value = localToday;

// 8. WHATSAPP BOOKING FORM
const bookingForm = document.getElementById("bookingForm");

// IMPORTANT:
// Replace this placeholder with the salon owner's
// confirmed WhatsApp number, including country code.
// India = 91 + 10-digit mobile number.
// Do not include +, spaces or dashes.

const SALON_WHATSAPP_NUMBER = "91XXXXXXXXXX";

bookingForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const service = document.getElementById("service").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const message = document.getElementById("message").value.trim();

    // Basic validation
    if (!name || !phone || !service || !date || !time) {
        alert("Please fill in all required fields.");
        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
    }

    if (date < localToday) {
        alert("Please select today or a future date.");
        return;
    }

    // Prevent accidental messages to a placeholder number
    if (SALON_WHATSAPP_NUMBER.includes("X")) {
        alert(
            "Demo booking form is working! Please add the salon's confirmed WhatsApp number in script.js before using live bookings."
        );
        return;
    }

    const formattedDate = new Date(date + "T00:00:00")
        .toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });

    const whatsappMessage =
        `Hello SHARONS GLAM! I would like to request an appointment.\n\n` +
        `Name: ${name}\n` +
        `Phone: ${phone}\n` +
        `Service: ${service}\n` +
        `Preferred Date: ${formattedDate}\n` +
        `Preferred Time: ${time}\n` +
        `Message: ${message || "None"}\n\n` +
        `Please confirm availability. Thank you!`;

    const whatsappURL =
        `https://wa.me/${SALON_WHATSAPP_NUMBER}?text=` +
        encodeURIComponent(whatsappMessage);

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
});

// 9. FOOTER YEAR
document.getElementById("year").textContent =
    new Date().getFullYear();

// 10. IMAGE FALLBACK
document.querySelectorAll("img").forEach(img => {
    img.addEventListener("error", () => {
        img.style.backgroundColor = "#e7e0d5";
        img.style.minHeight = "150px";
        img.alt = "Salon image unavailable";
    });
});

console.log("SHARONS GLAM website loaded successfully!");