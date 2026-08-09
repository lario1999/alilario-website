/* ==========================================================
   ALILARIO.COM
   Projects Viewer v2.2
========================================================== */


/* ==========================================================
   ELEMENTS
========================================================== */

const page =
    document.querySelector(".page");

const projectsGallery =
    document.getElementById("projects-gallery");

const categoryButtons =
    document.querySelectorAll(".category");

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

const clientField =
    document.getElementById("viewer-client");

const locationField =
    document.getElementById("viewer-location");

const yearField =
    document.getElementById("viewer-year");

const servicesField =
    document.getElementById("viewer-services");

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
   RENDER PROJECTS
========================================================== */

function renderProjects(category){

    if(!projectsGallery) return;


    /* ------------------------------------------
       Active Category
    ------------------------------------------ */

    categoryButtons.forEach(button=>{

        button.classList.toggle(

            "active",

            button.dataset.category === category

        );

    });


    /* ------------------------------------------
       Clear Gallery
    ------------------------------------------ */

    projectsGallery.innerHTML = "";


    /* ------------------------------------------
       Render Cards
    ------------------------------------------ */

    Object.values(projects)

        .filter(
            project =>
                project.category === category
        )

        .sort(
            (a,b)=>
                new Date(b.date) -
                new Date(a.date)
        )

        .forEach(project=>{

            const card =
                document.createElement("a");


            card.href = "#";

            card.className =
                "project-card";

            card.dataset.project =
                project.id;


            card.innerHTML = `

                <div class="project-image">

                    <img
                        src="${project.images[0]}"
                        alt="${project.title}">

                </div>

                <div class="project-overlay">

                    <div class="overlay-content">

                        <h2>
                            ${project.title}
                        </h2>

                        <p>
                            ${project.location}
                        </p>

                    </div>

                </div>

            `;


            card.addEventListener(
                "click",
                (event)=>{

                    event.preventDefault();

                    openProject(project.id);

                }
            );


            projectsGallery.appendChild(card);

        });

}


/* ==========================================================
   OPEN PROJECT
========================================================== */

function openProject(projectId){

    if(!viewer) return;


    gallery.innerHTML = "";

    gallery.scrollTop = 0;


    if(infoPanel){

        infoPanel.scrollTop = 0;

    }


    const project =
        projects[projectId];


    if(!project){

        console.error(
            "Project not found:",
            projectId
        );

        return;

    }


    /* ------------------------------------------
       Information
    ------------------------------------------ */

    titleField.textContent =
        project.title;

    clientField.textContent =
        project.client;

    locationField.textContent =
        project.location;

    yearField.textContent =
        project.year;

    servicesField.textContent =
        project.services;


    /* ------------------------------------------
       Gallery
    ------------------------------------------ */

    project.images.forEach(
        imagePath=>{

            const img =
                document.createElement("img");


            img.loading = "lazy";

            img.alt =
                project.title;

            img.src =
                imagePath;


            gallery.appendChild(img);

        }
    );


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
   CLOSE PROJECT
========================================================== */

function closeProject(){

    if(!viewer) return;


    viewer.classList.remove("active");

    page.classList.remove("viewer-open");

    document.body.style.overflow = "";

}


/* ==========================================================
   CATEGORY BUTTONS
========================================================== */

categoryButtons.forEach(
    button=>{

        button.addEventListener(
            "click",
            ()=>{

                renderProjects(
                    button.dataset.category
                );

            }
        );

    }
);


/* ==========================================================
   VIEWER CLOSE BUTTON
========================================================== */

if(closeButton){

    closeButton.addEventListener(
        "click",
        closeProject
    );

}


/* ==========================================================
   VIEWER BACKDROP
========================================================== */

if(backdrop){

    backdrop.addEventListener(
        "click",
        closeProject
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

            closeProject();

        }

    }
);


/* ==========================================================
   INITIALIZE
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        const params =
            new URLSearchParams(window.location.search);

        const category =
            params.get("category");


        if(
            category === "corporate" ||
            category === "wedding"
        ){

            renderProjects(category);

        }else{

            renderProjects("architecture");

        }

    }
);