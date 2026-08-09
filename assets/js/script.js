/* ==========================================================
   ALILARIO.COM
   Homepage v2.1
========================================================== */

const heroContent = document.querySelector(".hero-content");

const title = document.querySelector(".hero h1");
const subtitle = document.querySelector(".hero h2");
const tagline = document.querySelector(".tagline");

const navigation = document.querySelector(".hero-navigation");
const navLinks = document.querySelectorAll(".hero-navigation a");

const copyright = document.querySelector(".copyright");

const overlay = document.querySelector(".overlay");


/* ==========================================================
   INITIAL STATE
========================================================== */

navigation.style.opacity = "0";
navigation.style.transform = "translate(-50%,40px)";

copyright.style.opacity = "0";

navLinks.forEach((link) => {

    link.style.opacity = "0";
    link.style.transform = "translateY(20px)";

});


/* ==========================================================
   SCROLL ANIMATION
========================================================== */

window.addEventListener("scroll", () => {

    if (window.innerWidth <= 1200) return;

    const progress = Math.min(window.scrollY / (window.innerHeight * 0.7), 1);


    /* ---------------------------------------
       HERO GETS DARKER
    --------------------------------------- */

    const darkness = 0.15 + progress * 0.25;

    overlay.style.background = `rgba(0,0,0,${darkness})`;


    /* ---------------------------------------
       TAGLINE DISAPPEARS
    --------------------------------------- */

    tagline.style.opacity = Math.max(1 - progress * 3, 0);

    tagline.style.transform = `translateY(${-progress * 20}px)`;


    /* ---------------------------------------
       TITLE + SUBTITLE MOVE UP
    --------------------------------------- */

    heroContent.style.top = `${50 - progress * 25}%`;


    /* ---------------------------------------
       NAVIGATION
    --------------------------------------- */

    if (progress > 0.45) {

        navigation.style.opacity = "1";
        navigation.style.transform = "translate(-50%,0)";

        navLinks.forEach((link, index) => {

            setTimeout(() => {

                link.style.opacity = "1";
                link.style.transform = "translateY(0)";

            }, index * 120);

        });

    } else {

        navigation.style.opacity = "0";
        navigation.style.transform = "translate(-50%,40px)";

        navLinks.forEach((link) => {

            link.style.opacity = "0";
            link.style.transform = "translateY(20px)";

        });

    }


    /* ---------------------------------------
       COPYRIGHT
    --------------------------------------- */

    if (progress > 0.65) {

        copyright.style.opacity = "1";

    } else {

        copyright.style.opacity = "0";

    }

});