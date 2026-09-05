/* ==================================================
   PRELOADER
================================================== */

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    setTimeout(() => {
        preloader.classList.add("hide");
    }, 700);

});


/* ==================================================
   NAVBAR
================================================== */

const header = document.getElementById("header");
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");


/* Navbar scroll effect */

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* Mobile menu */

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("show");

    const icon = menuBtn.querySelector("i");

    if (navMenu.classList.contains("show")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});


/* Close mobile menu */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("show");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* ==================================================
   ACTIVE NAVIGATION
================================================== */

const sections = document.querySelectorAll("section[id]");

function updateActiveLink() {

    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            navLinks.forEach(link => {
                link.classList.remove("active");
            });

            const activeLink = document.querySelector(
                `.nav-link[href="#${sectionId}"]`
            );

            if (activeLink) {
                activeLink.classList.add("active");
            }

        }

    });

}

window.addEventListener("scroll", updateActiveLink);


/* ==================================================
   SCROLL REVEAL
================================================== */

const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right"
);

const revealObserver = new IntersectionObserver(

    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.15
    }

);


revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* ==================================================
   ANIMATED COUNTERS
================================================== */

const counters = document.querySelectorAll(".counter");

let countersStarted = false;


function startCounters() {

    if (countersStarted) return;

    countersStarted = true;

    counters.forEach(counter => {

        const target = parseFloat(
            counter.getAttribute("data-target")
        );

        const duration = 1800;
        const startTime = performance.now();

        function updateCounter(currentTime) {

            const elapsed = currentTime - startTime;

            const progress = Math.min(
                elapsed / duration,
                1
            );

            const easeOut = 1 - Math.pow(1 - progress, 3);

            const currentValue = target * easeOut;

            if (target % 1 !== 0) {

                counter.textContent =
                    currentValue.toFixed(1);

            } else {

                counter.textContent =
                    Math.floor(currentValue);

            }

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }

        }

        requestAnimationFrame(updateCounter);

    });

}


/* Observe statistics */

const statsSection = document.querySelector(".stats-section");

const statsObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                startCounters();

                statsObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.3
    }

);

if (statsSection) {
    statsObserver.observe(statsSection);
}


/* ==================================================
   CONTACT FORM
================================================== */

const contactForm = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");


contactForm.addEventListener("submit", function (event) {

    event.preventDefault();


    if (!contactForm.checkValidity()) {

        contactForm.reportValidity();

        return;

    }


    successMessage.classList.add("show");


    contactForm.reset();


    setTimeout(() => {

        successMessage.classList.remove("show");

    }, 5000);

});


/* Clear button */

contactForm.addEventListener("reset", () => {

    successMessage.classList.remove("show");

});


/* ==================================================
   BACK TO TOP
================================================== */

const backToTop = document.getElementById("backToTop");


window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* ==================================================
   IMAGE LOADING EFFECT
================================================== */

const images = document.querySelectorAll("img");


images.forEach(image => {

    image.style.opacity = "0";
    image.style.transition = "opacity 0.6s ease";


    if (image.complete) {

        image.style.opacity = "1";

    } else {

        image.addEventListener("load", () => {

            image.style.opacity = "1";

        });

        image.addEventListener("error", () => {

            image.style.opacity = "1";

        });

    }

});


/* ==================================================
   SMOOTH SCROLL FOR ALL ANCHOR LINKS
================================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (targetId === "#") return;

        const target = document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            const headerHeight = header.offsetHeight;

            const targetPosition =
                target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        }

    });

});


/* ==================================================
   PARALLAX HERO EFFECT
================================================== */

const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {

    if (window.innerWidth > 768) {

        const scrollValue = window.scrollY;

        if (scrollValue < window.innerHeight) {

            hero.style.backgroundPosition =
                `center ${scrollValue * 0.35}px`;

        }

    }

});


/* ==================================================
   CARD STAGGER ANIMATION
================================================== */

const cards = document.querySelectorAll(
    ".tech-card, .service-card, .project-card"
);

cards.forEach((card, index) => {

    card.style.transitionDelay =
        `${(index % 3) * 0.1}s`;

});


/* ==================================================
   CONTACT INPUT EFFECT
================================================== */

const inputs = document.querySelectorAll(
    ".form-group input, .form-group textarea"
);

inputs.forEach(input => {

    input.addEventListener("focus", () => {

        input.parentElement.classList.add("focused");

    });


    input.addEventListener("blur", () => {

        if (input.value.trim() === "") {

            input.parentElement.classList.remove("focused");

        }

    });

});


/* ==================================================
   CONSOLE MESSAGE
================================================== */

console.log(
    "PICT Educational Project Website Loaded Successfully."
);