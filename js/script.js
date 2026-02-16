// ================= SECTION TOGGLE =================
function toggleSection(id, condition) {
    document.getElementById(id).style.display =
        condition ? "block" : "none";
}

// ================= MAIN PREVIEW =================
function updatePreview() {

    // HEADER
    const name = fullName.value.trim();
    const title = document.getElementById("title").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const location = document.getElementById("location").value.trim();

    previewName.innerText = name;
    previewTitle.innerText = title;
    previewContact.innerText =
        [phone, email, location].filter(Boolean).join(" | ");

    toggleSection("headerSection", name || title || phone || email || location);

    // SUMMARY
    const summary = document.getElementById("summary").value.trim();
    previewSummary.innerText = summary;
    toggleSection("summarySection", summary);

    // SKILLS
    previewTechSkills.innerHTML = "";
    previewSoftSkills.innerHTML = "";

    document.getElementById("techSkills").value
        .split("\n")
        .filter(s => s.trim())
        .forEach(skill => {
            const li = document.createElement("li");
            li.innerText = skill;
            previewTechSkills.appendChild(li);
        });

    document.getElementById("softSkills").value
        .split("\n")
        .filter(s => s.trim())
        .forEach(skill => {
            const li = document.createElement("li");
            li.innerText = skill;
            previewSoftSkills.appendChild(li);
        });

    toggleSection(
        "skillsSection",
        previewTechSkills.children.length || previewSoftSkills.children.length
    );


    updateExperience();
    updateProjects();
    updateEducation();
    updateCertifications();
    updateAchievements();
}

// ================= EXPERIENCE =================
let experienceCount = 0;

function addExperience() {
    experienceCount++;
    const div = document.createElement("div");
    div.className = "experience-block";
    div.dataset.id = experienceCount;

    div.innerHTML = `
        <input placeholder="Job Title" class="exp-role" oninput="updatePreview()">
        <input placeholder="Company Name" class="exp-company" oninput="updatePreview()">
        <input placeholder="Duration" class="exp-duration" oninput="updatePreview()">
        <textarea placeholder="Work Description" class="exp-desc" oninput="updatePreview()"></textarea>
        <button class="remove-btn" onclick="removeExperience(${experienceCount})">Remove</button>
    `;

    experienceContainer.appendChild(div);
}

function removeExperience(id) {
    document.querySelector(`[data-id="${id}"]`)?.remove();
    updatePreview();
}

function updateExperience() {
    previewExperience.innerHTML = "";
    let hasData = false;

    document.querySelectorAll(".experience-block").forEach(block => {
        const role = block.querySelector(".exp-role")?.value;
        const company = block.querySelector(".exp-company")?.value;
        const duration = block.querySelector(".exp-duration")?.value;
        const desc = block.querySelector(".exp-desc")?.value;

        if (role || company || duration || desc) {
            hasData = true;
            previewExperience.innerHTML += `
                <p><strong>${role || ""}</strong> - ${company || ""}</p>
                <p><em>${duration || ""}</em></p>
                <p>${desc || ""}</p>
            `;
        }
    });

    toggleSection("experienceSection", hasData);
}

// ================= PROJECTS =================
let projectCount = 0;

function addProject() {
    projectCount++;
    const div = document.createElement("div");
    div.className = "experience-block";
    div.dataset.project = projectCount;

    div.innerHTML = `
        <input placeholder="Project Title" class="proj-title" oninput="updatePreview()">
        <input placeholder="Technologies Used" class="proj-tech" oninput="updatePreview()">
        <textarea placeholder="Project Description" class="proj-desc" oninput="updatePreview()"></textarea>
        <button class="remove-btn" onclick="removeProject(${projectCount})">Remove Project</button>
    `;

    projectContainer.appendChild(div);
}

function removeProject(id) {
    document.querySelector(`[data-project="${id}"]`)?.remove();
    updatePreview();
}

function updateProjects() {
    previewProjects.innerHTML = "";
    let hasData = false;

    document.querySelectorAll("[data-project]").forEach(block => {
        const title = block.querySelector(".proj-title").value;
        const tech = block.querySelector(".proj-tech").value;
        const desc = block.querySelector(".proj-desc").value;

        if (title || tech || desc) {
            hasData = true;
            previewProjects.innerHTML += `
                <p><strong>${title}</strong> (${tech})</p>
                <p>${desc}</p>
            `;
        }
    });

    toggleSection("projectsSection", hasData);
}

// ================= EDUCATION =================
let educationCount = 0;

const educationContainer = document.getElementById("educationContainer");
const previewEducation = document.getElementById("previewEducation");

function addEducation() {
    educationCount++;

    const div = document.createElement("div");
    div.className = "experience-block";
    div.dataset.education = educationCount;

    div.innerHTML = `
        <input placeholder="Degree / Qualification" class="edu-degree" oninput="updatePreview()">
        <input placeholder="College / University / School" class="edu-institute" oninput="updatePreview()">
        <input placeholder="Year of Passing" class="edu-year" oninput="updatePreview()">
        <input placeholder="Location" class="edu-location" oninput="updatePreview()">
        <button class="remove-btn" onclick="removeEducation(${educationCount})">
            Remove
        </button>
    `;

    educationContainer.appendChild(div);
}

function removeEducation(id) {
    document.querySelector(`[data-education="${id}"]`)?.remove();
    updatePreview();
}

function updateEducation() {
    previewEducation.innerHTML = "";
    let hasData = false;

    document.querySelectorAll("[data-education]").forEach(block => {
        const degree = block.querySelector(".edu-degree").value;
        const institute = block.querySelector(".edu-institute").value;
        const year = block.querySelector(".edu-year").value;
        const location = block.querySelector(".edu-location").value;

        if (degree || institute || year || location) {
            hasData = true;
            previewEducation.innerHTML += `
                <p>
                    <strong>${degree}</strong><br>
                    ${institute}<br>
                    ${year}${location ? " | " + location : ""}
                </p>
            `;
        }
    });

    toggleSection("educationSection", hasData);
}


// ================= CERTIFICATIONS =================
let certCount = 0;

function addCertification() {
    certCount++;
    const div = document.createElement("div");
    div.className = "experience-block";
    div.dataset.cert = certCount;

    div.innerHTML = `
        <input placeholder="Certification Name" class="cert-name" oninput="updatePreview()">
        <input placeholder="Issued By" class="cert-org" oninput="updatePreview()">
        <button class="remove-btn" onclick="removeCertification(${certCount})">Remove</button>
    `;

    certContainer.appendChild(div);
}

function removeCertification(id) {
    document.querySelector(`[data-cert="${id}"]`)?.remove();
    updatePreview();
}

function updateCertifications() {
    previewCertifications.innerHTML = "";
    let hasData = false;

    document.querySelectorAll("[data-cert]").forEach(block => {
        const name = block.querySelector(".cert-name").value;
        const org = block.querySelector(".cert-org").value;

        if (name || org) {
            hasData = true;
            previewCertifications.innerHTML += `<li>${name} - ${org}</li>`;
        }
    });

    toggleSection("certSection", hasData);
}

// ================= ACHIEVEMENTS =================
let achievementCount = 0;

// Make sure this exists in HTML
const achievementContainer = document.getElementById("achievementContainer");
const previewAchievements = document.getElementById("previewAchievements");

function addAchievement() {
    achievementCount++;

    const div = document.createElement("div");
    div.className = "experience-block";
    div.setAttribute("data-achievement", achievementCount);

    div.innerHTML = `
        <textarea 
            class="ach-text" 
            placeholder="Achievement Detail"
            oninput="updateAchievements()">
        </textarea>

        <button 
            type="button"
            class="remove-btn"
            onclick="removeAchievement(${achievementCount})">
            Remove
        </button>
    `;

    achievementContainer.appendChild(div);
}

function removeAchievement(id) {
    const block = document.querySelector(`[data-achievement="${id}"]`);
    if (block) block.remove();

    updateAchievements();
}

function updateAchievements() {
    previewAchievements.innerHTML = "";
    let hasData = false;

    document.querySelectorAll(".ach-text").forEach(textarea => {
        const value = textarea.value.trim();
        if (value !== "") {
            hasData = true;
            previewAchievements.innerHTML += `<li>${value}</li>`;
        }
    });

    toggleSection("achievementSection", hasData);
}


// ================= PDF (A4) =================
function downloadPDF() {
    html2pdf().set({
        margin: 0,
        filename: "Resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    }).from(resumePreview).save();
}
