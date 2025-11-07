/*
Switch ot the page inside the main content div.
It will also manage the navigation option display.

The page name should match in both the navigation option and the page id.

Example: 
switchToPage('home')
nav option id 'opt-home' will try to display the page 'page-home'

 */
function switchToPage(pageName) {
    const mainContentElement = document.getElementById("main-content");

    const pageId = "page-" + pageName;
    const tabId = "opt-" + pageName;

    for (let page of mainContentElement.children) {
        // page.style.transform = "scale(0)";
        // page.style.width = "0";
        // page.style.height = "0";
        page.style.display = "none";
        page.classList.add("retracted");
    }

    const pageElement = document.getElementById(pageId);

    if (pageElement){
        // pageElement.style.transform = "scale(1)";
        // pageElement.style.width = "100%";
        // pageElement.style.height = "100%";
        pageElement.style.display = "flex";

        new Promise(() => {
            setTimeout(() => {pageElement.classList.remove("retracted");}, 1);
        })
        
    }

    
    const navTabElement = document.getElementById("nav-tab");

    [...navTabElement.children].forEach(tabElement => {
        tabElement.classList.remove("selected");
        
        if (tabElement.id === tabId){
            tabElement.classList.add("selected");
        }
    });

    // Navigation bar not displayed when in home page
    navTabElement.style.display = pageName === "home" ? "none" : "flex";
        
    
};

function createNavTabElement(name, title) {
    /*
    <div class="nav-opt" id="opt-contact">
        <div class="nav-opt-text">
            Contact
        </div>
        <div class="nav-opt-underline">
        </div>
    </div>
     */

    const navOptElement = document.createElement("div");
    navOptElement.id = "opt-" + name;
    navOptElement.classList.add("nav-opt");


    const navOptTextElement = document.createElement("div");
    navOptTextElement.classList.add("nav-opt-text");
    navOptTextElement.innerText = title || name;

    const navOptUnderlineElement = document.createElement("div");
    navOptUnderlineElement.classList.add("nav-opt-underline");

    navOptElement.appendChild(navOptTextElement);
    navOptElement.appendChild(navOptUnderlineElement);

    return navOptElement;
    
}

function createHomeNavigationElement(name, title, icon){
    /*
    <div class="home-navigation-opt" id="home-nav-skills">
        <div class="home-navigation-opt-icon fa fa-eye"></div>
        <div class="home-navigation-opt-caret fa fa-caret-right"></div>
        <div class="home-navigation-opt-text">
            SKILLS
        </div> 
    </div>
     */
    
    const homeNavOptElement = document.createElement("div");
    homeNavOptElement.id = "home-nav-" + name;
    homeNavOptElement.classList.add("home-navigation-opt");

    const homeNavIconElement = document.createElement("div");
    homeNavIconElement.classList.add("home-navigation-opt-icon");
    if (icon) {
        homeNavIconElement.classList.add("fa", "fa-" + icon);
    }

    const homeNavCaretElement = document.createElement("div");
    homeNavCaretElement.classList.add("fa", "fa-caret-right");

    const homeNavTextElement = document.createElement("div");
    homeNavTextElement.classList.add("home-navigation-opt-text");
    homeNavTextElement.innerText = title || name;

    homeNavOptElement.appendChild(homeNavIconElement);
    homeNavOptElement.appendChild(homeNavCaretElement);
    homeNavOptElement.appendChild(homeNavTextElement);

    return homeNavOptElement;

}

function pageNavigationSetup(pages) {
    // const mainContentElement = document.getElementById("main-content");
    const navTabElement = document.getElementById("nav-tab");
    const homeNavigationListElement = document.getElementById("home-navigation");


    Object.keys(pages).forEach((pageName, pageIndex) => {
        const tabElement = createNavTabElement(pageName, pages[pageName]?.navText || pageName);

        tabElement.onclick = () => switchToPage(pageName);

        navTabElement.appendChild(tabElement);

        const icon = pages[pageName]?.icon;

        // Home page
        if (pageIndex !== 0){
            const homeNavigationElement = createHomeNavigationElement(
                pageName,
                pages[pageName]?.text,
                icon,
            );

            const translate = (pageIndex - 1) / (Object.keys(pages).length - 1) * 6;

            homeNavigationElement.style.marginLeft = `${translate}rem`;

            homeNavigationElement.onclick = () => switchToPage(pageName);

            homeNavigationListElement.appendChild(homeNavigationElement);

            const pageElement = document.getElementById("page-" + pageName);

            if (pageElement && icon) {
                const pageIconElement = document.createElement("div");
                pageIconElement.classList.add("page-icon", "fa", "fa-" + icon);
                pageElement.insertBefore(pageIconElement, pageElement.firstChild);
            }

        }

        // Default first page
        if (pageIndex === 0){
            switchToPage(pageName);
        }

    });
}

function createSkillElement(skill) {
    const {key, text, score, title, subtitle, img} = skill;

    const subtilteHTML = subtitle ? `<span class="skill-subtitle">${subtitle}</span>` : '';
    const imgHTML = img ? `<img class="skill-img" src="${img}"/>` : '';

    const skillElement = createElementFromString(
        `
        <div class="skill-card" id="skill-${key}">
            <div class="skill-header">
                <div class="skill-title">
                    <span class="skill-title-area"><span class="fa fa-caret-right"></span>${imgHTML}<span>${title}</span></span>
                    ${subtilteHTML}
                </div>
                <div class="skill-score"></div>
                
            </div>
            
            <div class="skill-description">${text}</div>
        </div>
        `
    );

    skillElement.classList.add("closed");

    const skillScoreElement = skillElement.getElementsByClassName("skill-score")[0];

    // Skill stars
    // skillScoreElement.innerHTML = Array.from({length: score}).map(
    //     e => "<span class='skill-score-star fa fa-star'></span>"
    // ).join("");

    const skillHeader = skillElement.getElementsByClassName("skill-header")[0];

    // Expand card event
    skillHeader.onclick = () => {
        const allSkillCards = document.getElementsByClassName("skill-card");

        if (allSkillCards){
            [...allSkillCards].forEach(skillCardElement => {
                if (skillCardElement.id === "skill-" + key) return;

                skillCardElement.classList.remove("opened");
                skillCardElement.classList.add("closed");
            })
        }

        const element = document.getElementById("skill-" + key);
        if (element.className.includes("closed")){
            element.classList.remove("closed");
            element.classList.add("opened");
        }
        else {
            element.classList.remove("opened");
            element.classList.add("closed");
        }
    }

    return skillElement;
}

function buildSkillsPage(skills) {
    const skillListElement = document.getElementById("skill-list");

    if (!skillListElement) return;

    skills.forEach(skill_obj => {
        const skillElement = createSkillElement(skill_obj);

        skillListElement.appendChild(skillElement);
    });
};

// Experiences 
function createExperienceCardElement(experience) {
    const {key, companyName, position, summary, location, start, end, text, img} = experience;

    const imgHTML = img ? `<img src="${img}"/>` : '';

    const startDate = moment(start, "YYYY-MM").format("MMM YYYY");
    const endDate = end ? moment(end, "YYYY-MM").format("MMM YYYY") : "ongoing";
    const {country, city} = location

    let dateRangeText = [startDate, endDate].join(" - ");

    const experienceCardElement = createElementFromString(
        `
        <div class="experience-card" id="experience-${key}">
            <div class="experience-card-header">
                <div class="experience-header-preview">
                    <div class="experience-card-position">
                        <div class="fa fa-caret-right"></div>
                        <span>${position}</span>
                    </div>
                    <div class="experience-card-summary">${summary}</div>
                    <div class="experience-card-locdate">
                        <div class="experience-card-daterange">
                            ${dateRangeText}
                        </div>
                        <div class="experience-card-location">
                            ${[companyName, city, country].join(" | ")}
                        </div>
                    </div>
                </div>
                <div>${imgHTML}</div>
            </div>
            <div class="experience-card-description">
                ${text}
            </div>
        </div>
        `
    );

    const experienceHeaderElement = experienceCardElement.getElementsByClassName("experience-card-header")[0];
    experienceCardElement.classList.add("closed");
    experienceHeaderElement.onclick = () => {
        // const allExperienceCards = document.getElementsByClassName("experience-card");

        // if (allExperienceCards){
        //     [...allExperienceCards].forEach(experienceCardElement => {
        //         if (experienceCardElement.id === "experience-" + key) return;

        //         experienceCardElement.classList.remove("opened");
        //         experienceCardElement.classList.add("closed");
        //     })
        // }

        const element = document.getElementById("experience-" + key);
        if (element.className.includes("closed")){
            element.classList.remove("closed");
            element.classList.add("opened");
        }
        else {
            element.classList.remove("opened");
            element.classList.add("closed");
        }
    }

    return experienceCardElement;

}

function buildExperiencePage(experiences) {
    const experienceListElement = document.getElementById("experience-list");

    if (!experienceListElement) return;

    experiences.forEach(experience => {
        const experienceCardElement = createExperienceCardElement(experience); 

        experienceListElement.appendChild(experienceCardElement);
    });

}

pageNavigationSetup(all_pages);
buildExperiencePage(all_experiences);
buildSkillsPage(all_skills);

// Force trigger animation at the start of the application
const firstPageElement = document.getElementById("page-" + Object.keys(all_pages)[0]);
firstPageElement.classList.add("retracted");

let intervalId = setInterval(() => {
    firstPageElement.classList.remove("retracted");
    clearInterval(intervalId);
}, 1)





