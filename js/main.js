// check if there is local storage color option 
let mainColors = localStorage.getItem("color_option"); 

if (mainColors !== null) {
    document.documentElement.style.setProperty('--main-color', mainColors);

    // remove active class from all colors list item
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");

        if (element.dataset.color === mainColors) {
            element.classList.add("active");
        } 
    });
    
}




// Random background Option
let backgroundOption = true;

let backgroundInterval;

// check if there is local storage random background item
let backgroundLocalItem = localStorage.getItem("background_option");

if (backgroundLocalItem !== null) {
    if (backgroundLocalItem === true) {
        backgroundOption = true;
    } else {
        backgroundOption = false;
    }
    // remove active class from all spans 
    document.querySelectorAll(".random-backgrounds span").forEach(element => {
        element.classList.remove("active");
    });

    if (backgroundLocalItem === 'true') {
        document.querySelector('.random-backgrounds .yes').classList.add("active");
    } else {
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }
}
// start settings box
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
    document.querySelector('.settings-box').classList.toggle('open');
}


// switch colors
const colorsLi = document.querySelectorAll('.colors-list li');
colorsLi.forEach(li => {
    li.addEventListener('click', (e) => {
        document.documentElement.style.setProperty('--main-color',e.target.dataset.color);
        localStorage.setItem('color_option', e.target.dataset.color);

        handleActive(e);
    });
});



// switch random backgrounds option 
const randomBackEl = document.querySelectorAll('.random-backgrounds span');
randomBackEl.forEach(span => {
    span.addEventListener('click', (e) => {
        handleActive(e);

        if (e.target.dataset.background === 'yes') {
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem('background_option', true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem('background_option', false);
        }
    })
})



 // start landing page
 let page = document.querySelector(".landing-page");

 let imgArray = ["photoFive.jpg","photoFour.jpg","photoOne.jpg","photoThree.jpg","photoTwo.jpg","photoSix.jpg","photoSeven.jpg","01.jpg","02.jpg"];
 // end landing page

// Function to randomize imgs
function randomizeImgs() {
    if (backgroundOption === true) {
         backgroundInterval = setInterval(() => {
            let randomNumber = Math.floor(Math.random() * imgArray.length);
        
            page.style.backgroundImage = 'url("images/' + imgArray[randomNumber] + '")';
        }, 1000); 
    }
}

randomizeImgs();


let btn = document.getElementById("btn");

window.onscroll = function () {
    if (window.scrollY >= 700) {
        btn.style.display = 'block';
    } else {
        btn.style.display = 'none';
    }
}

// select skills 
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
    let skillsOffsetTop = ourSkills.offsetTop;

    let skillsOuterHeight = ourSkills.offsetHeight;
    
    let windowHeight = this.innerHeight;

    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

        let allskills = document.querySelectorAll(".skill-box .skill-progress span");

        allskills.forEach(skill => {
            skill.style.width = skill.dataset.progress; 
        })

    }
}

// Create Popup with the images
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {
    img.addEventListener('click', function () {

        let overlay = document.createElement("div");

        overlay.className = "popup-overlay";

        document.body.appendChild(overlay);

        // create popup box
        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";

        if (img.alt !== null) {
            let imgHeading = document.createElement("h3");
            let imgText = document.createTextNode(img.alt);
            imgHeading.appendChild(imgText);
            popupBox.appendChild(imgHeading);
        }

        let popupImage = document.createElement("img");
        popupImage.src = img.src;
        popupBox.appendChild(popupImage);
        document.body.appendChild(popupBox);
        // create the close span
        let closeButton = document.createElement("span");
        let buttonText = document.createTextNode("X");
        closeButton.className = 'close-button';
        closeButton.appendChild(buttonText);
        popupBox.appendChild(closeButton);
        
    })
})


// Close popub
document.addEventListener('click', function (e) {
    if (e.target.className == 'close-button') {
        e.target.parentNode.remove();

        // remove overlay 
        document.querySelector('.popup-overlay').remove();
    }
});



// select All bullets 
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

const allLinks = document.querySelectorAll(".links a");

function scrollIntosomewhere(elements) {
    elements.forEach(ele => {
        ele.addEventListener('click', (e) => {

            e.preventDefault();

            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth',
            });
        });
    });
}

scrollIntosomewhere(allBullets);
scrollIntosomewhere(allLinks);



// handle active state
function handleActive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    ev.target.classList.add("active");
}


// show bullets

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletscontainer = document.querySelector(".nav-bullets");
let bulletitemlocal = localStorage.getItem("bullets_option");

if (bulletitemlocal !== null) {
    bulletsSpan.forEach(span => {
        span.classList.remove("active");
    });
    if(bulletitemlocal === "block") {
        bulletscontainer.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
        bulletscontainer.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

bulletsSpan.forEach(function (span) {
    span.addEventListener('click', function (e) {

        if (span.dataset.display === 'show') {

            bulletscontainer.style.display = "block";
            localStorage.setItem("bullets_option", "block");

        } else {

            bulletscontainer.style.display = "none";
            localStorage.setItem("bullets_option", "none");
        }
        handleActive(e);
    })
})


// Reset Button
document.querySelector(".reset-options").onclick = function () {
    localStorage.clear();

    window.location.reload();
}


// Toggle menu
let toggleBtn = document.querySelector(".toggle-menu");
let tlinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
    e.stopPropagation();

    this.classList.toggle("menu-active");
    tlinks.classList.toggle("open");
}

// click anywhere outside menu and toggle button 
document.addEventListener('click', function (e) {
    if (e.target !== toggleBtn) {
        // check 
        if (tlinks.classList.contains("open")) {
            toggleBtn.classList.toggle("menu-active");
            tlinks.classList.toggle("open");
        }
    }
})



// stop propagation on menu

tlinks.onclick = function (e) {
    e.stopPropagation();
}