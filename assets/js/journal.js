/* ==========================================================
   ALILARIO.COM
   Journal Viewer v3.2
========================================================== */


/* ==========================================================
   ELEMENTS
========================================================== */

const page =
    document.querySelector(".page");

const journalGallery =
    document.getElementById("journal-gallery");

const viewer =
    document.getElementById("viewer");

const backdrop =
    document.querySelector(".viewer-backdrop");

const closeButton =
    document.getElementById("viewer-close");

const gallery =
    document.getElementById("viewer-gallery");

const titleField =
    document.getElementById("viewer-title");

const storyField =
    document.getElementById("viewer-story");

const infoPanel =
    document.querySelector(".viewer-info");


/* ==========================================================
   MOBILE / TABLET MENU
========================================================== */

const menuButton =
    document.getElementById("mobile-menu-button");

const mobileMenu =
    document.getElementById("mobile-menu");

const menuClose =
    document.getElementById("mobile-menu-close");


/* ==========================================================
   OPEN MOBILE MENU
========================================================== */

function openMenu(){

    if(!mobileMenu) return;

    mobileMenu.classList.add("active");

    mobileMenu.setAttribute(
        "aria-hidden",
        "false"
    );

    if(menuButton){

        menuButton.setAttribute(
            "aria-expanded",
            "true"
        );

    }

    document.body.classList.add("menu-open");

}


/* ==========================================================
   CLOSE MOBILE MENU
========================================================== */

function closeMenu(){

    if(!mobileMenu) return;

    mobileMenu.classList.remove("active");

    mobileMenu.setAttribute(
        "aria-hidden",
        "true"
    );

    if(menuButton){

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }

    document.body.classList.remove("menu-open");

}


/* ==========================================================
   MENU BUTTON
========================================================== */

if(menuButton){

    menuButton.addEventListener(
        "click",
        (event)=>{

            event.preventDefault();

            openMenu();

        }
    );

}


/* ==========================================================
   MENU CLOSE BUTTON
========================================================== */

if(menuClose){

    menuClose.addEventListener(
        "click",
        (event)=>{

            event.preventDefault();

            closeMenu();

        }
    );

}


/* ==========================================================
   MENU LINKS
========================================================== */

if(mobileMenu){

    const menuLinks =
        mobileMenu.querySelectorAll("a");


    menuLinks.forEach(link=>{

        link.addEventListener(
            "click",
            ()=>{

                closeMenu();

            }
        );

    });

}


/* ==========================================================
   ESCAPE — MOBILE MENU
========================================================== */

document.addEventListener(
    "keydown",
    (event)=>{

        if(

            event.key === "Escape" &&

            mobileMenu &&

            mobileMenu.classList.contains("active")

        ){

            closeMenu();

        }

    }
);


/* ==========================================================
   RENDER JOURNAL
========================================================== */

function renderJournal(){

    if(!journalGallery) return;


    journalGallery.innerHTML = "";


    Object.values(journal)

        .sort(
            (a,b)=>
                new Date(b.date) -
                new Date(a.date)
        )

        .forEach(entry=>{


            const card =
                document.createElement("a");


            card.href = "#";

            card.className =
                "project-card";

            card.dataset.journal =
                entry.id;


            /* ------------------------------------------
               Thumbnail
            ------------------------------------------ */

            let thumbnail = "";


            if(entry.cover){

                thumbnail =
                    entry.cover;

            }

            else if(entry.images){

                thumbnail =
                    entry.images[0];

            }

            else if(entry.youtube){

                thumbnail =
                    `https://img.youtube.com/vi/${entry.youtube}/maxresdefault.jpg`;

            }


            /* ------------------------------------------
               Card
            ------------------------------------------ */

            card.innerHTML = `

                <div class="project-image">

                    <img
                        src="${thumbnail}"
                        alt="${entry.title}">

                </div>

                <div class="project-overlay">

                    <div class="overlay-content">

                        <h2>
                            ${entry.title}
                        </h2>

                        <span class="journal-label">

                            → Explore my world

                        </span>

                    </div>

                </div>

            `;


            /* ------------------------------------------
               OPEN JOURNAL
            ------------------------------------------ */

            card.addEventListener(
                "click",
                (event)=>{

                    event.preventDefault();

                    openJournal(entry.id);

                }
            );


            journalGallery.appendChild(card);

        });

}


/* ==========================================================
   OPEN JOURNAL
========================================================== */

function openJournal(journalId){

    if(!viewer) return;


    gallery.innerHTML = "";

    gallery.scrollTop = 0;


    if(infoPanel){

        infoPanel.scrollTop = 0;

    }


    const entry =
        Object.values(journal).find(

            item =>
                item.id === journalId

        );


    if(!entry){

        console.error(
            "Journal not found:",
            journalId
        );

        return;

    }


    /* ------------------------------------------
       Information
    ------------------------------------------ */

    titleField.textContent =
        entry.title;

    storyField.textContent =
        entry.story;


    /* ------------------------------------------
       YouTube
    ------------------------------------------ */

    if(entry.youtube){

        const iframe =
            document.createElement("iframe");


        iframe.src =
            `https://www.youtube.com/embed/${entry.youtube}`;


        iframe.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";


        iframe.allowFullscreen = true;

        iframe.loading = "lazy";

        iframe.style.width =
            "100%";

        iframe.style.aspectRatio =
            "16 / 9";

        iframe.style.border =
            "0";

        iframe.style.marginBottom =
            "20px";


        gallery.appendChild(iframe);

    }


    /* ------------------------------------------
       Images
    ------------------------------------------ */

    if(entry.images){

        entry.images.forEach(
            imagePath=>{

                const img =
                    document.createElement("img");


                img.loading =
                    "lazy";

                img.alt =
                    entry.title;

                img.src =
                    imagePath;


                gallery.appendChild(img);

            }
        );

    }


    gallery.scrollTop = 0;


    if(infoPanel){

        infoPanel.scrollTop = 0;

    }


    /* ------------------------------------------
       SHOW VIEWER
    ------------------------------------------ */

    viewer.classList.add("active");

    page.classList.add("viewer-open");

    document.body.style.overflow =
        "hidden";

}


/* ==========================================================
   CLOSE JOURNAL
========================================================== */

function closeJournal(){

    if(!viewer) return;

    if(document.activeElement){
        document.activeElement.blur();
    }

    viewer.classList.remove("active");

    page.classList.remove("viewer-open");

    document.body.style.overflow =
        "";

}


/* ==========================================================
   VIEWER CLOSE BUTTON
========================================================== */

if(closeButton){

    closeButton.addEventListener(
        "click",
        closeJournal
    );

}


/* ==========================================================
   VIEWER BACKDROP
========================================================== */

if(backdrop){

    backdrop.addEventListener(
        "click",
        closeJournal
    );

}


/* ==========================================================
   ESCAPE — VIEWER
========================================================== */

document.addEventListener(
    "keydown",
    (event)=>{

        if(

            event.key === "Escape" &&

            viewer &&

            viewer.classList.contains("active")

        ){

            closeJournal();

        }

    }
);


/* ==========================================================
   INITIALIZE
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        renderJournal();

    }
);