/**
 * MD SHAHRUKH KHAN SOHEL - PERSONAL DEVELOPER PORTFOLIO ENGINE
 * Publishable on GitHub Pages (Sohelkhan26.github.io)
 * 
 * Features:
 * - Dynamic data binding for all site texts and projects
 * - Discreet Admin portal gated with password "iamlazy.z"
 * - Full CRUD for projects + In-place editing of all site texts
 * - LocalStorage persistence + Export helper for GitHub Pages
 */

const ADMIN_PASSWORD = "iamlazy.z";
const SITE_STORAGE_KEY = "sohel_personal_site_data";
const AUTH_KEY = "sohel_admin_authenticated";

let siteData = null;
let activeCategoryFilter = "all";
let currentSearchQuery = "";
let editingProjectId = null;

// ==========================================================================
// INITIALIZATION
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  loadSiteData();
  renderSiteData();
  initNavigation();
  initProjectsControls();
  initAdminSystem();
  initContactForm();
  checkAdminSession();
});

// ==========================================================================
// DATA PERSISTENCE & BINDING
// ==========================================================================
function loadSiteData() {
  const saved = localStorage.getItem(SITE_STORAGE_KEY);
  if (saved) {
    try {
      siteData = JSON.parse(saved);
    } catch (e) {
      console.warn("Could not parse saved site data, using defaults", e);
      siteData = JSON.parse(JSON.stringify(DEFAULT_SITE_DATA));
    }
  } else {
    siteData = JSON.parse(JSON.stringify(DEFAULT_SITE_DATA));
    saveSiteData();
  }
}

function saveSiteData() {
  localStorage.setItem(SITE_STORAGE_KEY, JSON.stringify(siteData));
}

function renderSiteData() {
  if (!siteData) return;

  // 1. Hero Section
  setTextContent("hero-greeting", siteData.hero.greeting || "Hello, I'm");
  setTextContent("hero-name", siteData.hero.name || "Md Shahrukh Khan Sohel");
  setTextContent("hero-role", siteData.hero.role || "Frontend Developer");
  setTextContent("hero-bio", siteData.hero.bio || "");

  const cvBtn = document.getElementById("btn-download-cv");
  if (cvBtn && siteData.hero.resumeUrl) {
    cvBtn.onclick = () => window.open(siteData.hero.resumeUrl, "_blank");
  }

  // 2. About Section
  setTextContent("about-lead", siteData.about.lead || "");
  setTextContent("about-body", siteData.about.body || "");
  setTextContent("about-exp-years", siteData.about.experienceYears || "2+ years");
  setTextContent("about-exp-field", siteData.about.experienceField || "Frontend Development");
  setTextContent("about-edu-degree", siteData.about.educationDegree || "B.Sc. in CSE");
  setTextContent("about-edu-institute", siteData.about.educationInstitute || "KUET");

  // 3. Contact Section (WhatsApp number is also phone number, as requested)
  setTextContent("contact-email-display", siteData.contact.email || "sohel2007084@stud.kuet.ac.bd");
  setTextContent("contact-whatsapp-display", siteData.contact.whatsappDisplay || `${siteData.contact.whatsapp} (WhatsApp / Phone)`);
  
  const waBtn = document.getElementById("btn-whatsapp-chat");
  if (waBtn && siteData.contact.whatsapp) {
    const cleanNum = siteData.contact.whatsapp.replace(/[^0-9]/g, "");
    waBtn.href = `https://wa.me/${cleanNum}`;
  }

  // 4. Projects Grid
  renderProjectsGrid();
}

function setTextContent(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// ==========================================================================
// NAVIGATION & SCROLLING
// ==========================================================================
function initNavigation() {
  const navbar = document.getElementById("navbar");
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    highlightNavOnScroll();
  });

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener("click", () => {
      hamburgerBtn.classList.toggle("open");
      mobileMenu.classList.toggle("open");
      document.body.style.overflow = mobileMenu.classList.contains("open") ? "hidden" : "auto";
    });

    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        hamburgerBtn.classList.remove("open");
        mobileMenu.classList.remove("open");
        document.body.style.overflow = "auto";
      });
    });
  }

  function highlightNavOnScroll() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }
}

// ==========================================================================
// PROJECTS SHOWCASE & FILTERING
// ==========================================================================
function initProjectsControls() {
  const pills = document.querySelectorAll(".filter-pill");
  const searchInput = document.getElementById("project-search-input");

  pills.forEach(pill => {
    pill.addEventListener("click", () => {
      pills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      activeCategoryFilter = pill.getAttribute("data-filter");
      renderProjectsGrid();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearchQuery = e.target.value.trim().toLowerCase();
      renderProjectsGrid();
    });
  }
}

function renderProjectsGrid() {
  const gridContainer = document.getElementById("projects-grid-container");
  if (!gridContainer || !siteData || !siteData.projects) return;

  const filtered = siteData.projects.filter(project => {
    const matchesCategory = (activeCategoryFilter === "all") ||
      (project.categoryKey && project.categoryKey.toLowerCase() === activeCategoryFilter.toLowerCase());

    if (!currentSearchQuery) return matchesCategory;

    const inTitle = project.title.toLowerCase().includes(currentSearchQuery);
    const inDesc = project.description && project.description.toLowerCase().includes(currentSearchQuery);
    const inTags = project.tags && project.tags.some(t => t.toLowerCase().includes(currentSearchQuery));
    const inCat = project.category && project.category.toLowerCase().includes(currentSearchQuery);

    return matchesCategory && (inTitle || inDesc || inTags || inCat);
  });

  if (filtered.length === 0) {
    gridContainer.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-magnifying-glass" style="font-size: 2rem; margin-bottom: 0.75rem; color: var(--text-dim);"></i>
        <h3>No projects match your filter</h3>
        <p>Try searching for a different keyword or selecting 'All Projects'.</p>
      </div>
    `;
    return;
  }

  gridContainer.innerHTML = filtered.map(proj => {
    const tagsHtml = (proj.tags || []).map(t => `<span class="project-tag-pill">${escapeHtml(t)}</span>`).join("");

    return `
      <div class="project-card" data-id="${proj.id}">
        <div class="project-thumb-box">
          <img src="${escapeHtml(proj.image || './assets/project-3.png')}" alt="${escapeHtml(proj.title)}" loading="lazy" onerror="this.src='./assets/project-3.png'" />
          <span class="project-category-tag">${escapeHtml(proj.category || 'Project')}</span>
        </div>
        <div class="project-body">
          <h3>${escapeHtml(proj.title)}</h3>
          <p>${escapeHtml(proj.description || '')}</p>
          <div class="project-tags">
            ${tagsHtml}
          </div>
        </div>
        <div class="project-footer">
          <div class="project-btns-group">
            ${proj.demoUrl ? `<a href="${escapeHtml(proj.demoUrl)}" target="_blank" rel="noopener noreferrer" class="proj-btn proj-btn-primary"><i class="fa-solid fa-arrow-up-right-from-square"></i> Demo</a>` : ''}
            ${proj.githubUrl ? `<a href="${escapeHtml(proj.githubUrl)}" target="_blank" rel="noopener noreferrer" class="proj-btn proj-btn-secondary"><i class="fa-brands fa-github"></i> GitHub</a>` : ''}
          </div>
          <button class="proj-btn-details" onclick="openProjectDetailsModal('${proj.id}')">
            Details <i class="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    `;
  }).join("");
}

// Project Details Modal
function openProjectDetailsModal(projectId) {
  const project = (siteData.projects || []).find(p => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById("project-details-modal");
  const modalBody = document.getElementById("project-modal-body");

  const tagsHtml = (project.tags || []).map(t => `<span class="project-tag-pill" style="font-size: 0.85rem; padding: 0.3rem 0.7rem;">${escapeHtml(t)}</span>`).join("");

  modalBody.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1.25rem;">
      <img src="${escapeHtml(project.image || './assets/project-3.png')}" alt="${escapeHtml(project.title)}" style="width: 100%; max-height: 320px; object-fit: cover; border-radius: var(--radius-md); border: 1px solid var(--border-color);" onerror="this.src='./assets/project-3.png'" />
      <div>
        <span class="project-category-tag" style="position: static; display: inline-block; margin-bottom: 0.5rem;">${escapeHtml(project.category || 'Project')}</span>
        <h2 style="font-size: 1.6rem; margin-bottom: 0.75rem;">${escapeHtml(project.title)}</h2>
        <p style="color: var(--text-muted); line-height: 1.7; font-size: 1rem; margin-bottom: 1.25rem;">
          ${escapeHtml(project.description || '')}
        </p>

        <h4 style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-dim); margin-bottom: 0.5rem;">Technologies</h4>
        <div class="project-tags" style="margin-bottom: 1.5rem;">
          ${tagsHtml}
        </div>

        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          ${project.demoUrl ? `<a href="${escapeHtml(project.demoUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a>` : ''}
          ${project.githubUrl ? `<a href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary"><i class="fa-brands fa-github"></i> View GitHub Repo</a>` : ''}
        </div>
      </div>
    </div>
  `;

  openModal(modal);
}

// ==========================================================================
// DISCREET ADMIN SYSTEM
// Password: "iamlazy.z"
// Triggers:
// 1. Discreet footer lock button
// 2. Keyboard shortcut: Ctrl + Shift + A
// 3. Double-clicking footer copyright
// ==========================================================================
function initAdminSystem() {
  const discreetLock = document.getElementById("discreet-admin-lock");
  const loginModal = document.getElementById("admin-login-modal");
  const loginForm = document.getElementById("admin-login-form");
  const passwordInput = document.getElementById("admin-password-input");
  const copyrightText = document.getElementById("footer-copyright");

  if (discreetLock) {
    discreetLock.addEventListener("click", openAdminPortal);
  }

  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "A" || e.key === "a")) {
      e.preventDefault();
      openAdminPortal();
    }
  });

  if (copyrightText) {
    copyrightText.addEventListener("dblclick", openAdminPortal);
  }

  // Password verification
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const entered = passwordInput.value.trim();

      if (entered === ADMIN_PASSWORD) {
        sessionStorage.setItem(AUTH_KEY, "true");
        closeModal(loginModal);
        passwordInput.value = "";
        showToast("Access granted! Admin Portal opened.", "success");
        updateAdminPill(true);
        openAdminDashboard();
      } else {
        const content = loginModal.querySelector(".modal-content");
        content.classList.add("shake");
        showToast("Incorrect password. Access denied.", "error");
        setTimeout(() => content.classList.remove("shake"), 400);
        passwordInput.value = "";
        passwordInput.focus();
      }
    });
  }

  // Setup Admin Tabs & Forms
  setupAdminTabs();
  setupSiteTextEditor();
  setupProjectEditor();
}

function openAdminPortal() {
  const isAuth = sessionStorage.getItem(AUTH_KEY) === "true";
  if (isAuth) {
    openAdminDashboard();
  } else {
    const loginModal = document.getElementById("admin-login-modal");
    openModal(loginModal);
    setTimeout(() => {
      const pwd = document.getElementById("admin-password-input");
      if (pwd) pwd.focus();
    }, 150);
  }
}

function checkAdminSession() {
  if (sessionStorage.getItem(AUTH_KEY) === "true") {
    updateAdminPill(true);
  }
}

function updateAdminPill(active) {
  const pill = document.getElementById("admin-mode-pill");
  if (pill) {
    if (active) pill.classList.add("active");
    else pill.classList.remove("active");
  }
}

function adminLogout() {
  sessionStorage.removeItem(AUTH_KEY);
  updateAdminPill(false);
  closeAllModals();
  showToast("Admin session closed.", "info");
}

function openAdminDashboard() {
  const modal = document.getElementById("admin-dashboard-modal");
  renderAdminProjectList();
  populateSiteTextEditorForm();
  openModal(modal);
}

// Admin Tabs Switcher
function setupAdminTabs() {
  const tabBtns = document.querySelectorAll(".admin-tab-btn");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".admin-tab-content").forEach(c => c.classList.remove("active"));

      btn.classList.add("active");
      const targetId = btn.getAttribute("data-tab");
      const targetContent = document.getElementById(targetId);
      if (targetContent) targetContent.classList.add("active");
    });
  });
}

// ==========================================================================
// ADMIN TAB 1: PROJECTS MANAGEMENT (CRUD)
// ==========================================================================
function renderAdminProjectList() {
  const listContainer = document.getElementById("admin-projects-list");
  if (!listContainer || !siteData || !siteData.projects) return;

  const countEl = document.getElementById("admin-projects-counter");
  if (countEl) countEl.textContent = `${siteData.projects.length} Total Projects`;

  if (siteData.projects.length === 0) {
    listContainer.innerHTML = `<p style="color: var(--text-muted); text-align: center; padding: 2rem;">No projects yet. Click "+ Add New Project" to add your first one!</p>`;
    return;
  }

  listContainer.innerHTML = siteData.projects.map((proj, idx) => `
    <div class="admin-project-item">
      <div style="display: flex; align-items: center; gap: 0.85rem; flex: 1;">
        <img src="${escapeHtml(proj.image || './assets/project-3.png')}" alt="" class="admin-item-thumb" onerror="this.src='./assets/project-3.png'" />
        <div>
          <div style="font-weight: 600; font-size: 0.95rem;">${escapeHtml(proj.title)}</div>
          <div style="font-size: 0.8rem; color: var(--accent-color);">${escapeHtml(proj.category || 'General')} • ${(proj.tags || []).slice(0, 3).join(", ")}</div>
        </div>
      </div>
      <div class="admin-item-actions">
        <button class="admin-icon-btn" title="Move Up" onclick="reorderProject(${idx}, -1)" ${idx === 0 ? 'disabled style="opacity: 0.3;"' : ''}>
          <i class="fa-solid fa-arrow-up"></i>
        </button>
        <button class="admin-icon-btn" title="Move Down" onclick="reorderProject(${idx}, 1)" ${idx === siteData.projects.length - 1 ? 'disabled style="opacity: 0.3;"' : ''}>
          <i class="fa-solid fa-arrow-down"></i>
        </button>
        <button class="admin-icon-btn" title="Edit Project" onclick="openAddEditProjectModal('${proj.id}')">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="admin-icon-btn delete" title="Delete Project" onclick="deleteProject('${proj.id}')">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
  `).join("");
}

function reorderProject(index, direction) {
  const newIndex = index + direction;
  if (newIndex < 0 || newIndex >= siteData.projects.length) return;

  const temp = siteData.projects[index];
  siteData.projects[index] = siteData.projects[newIndex];
  siteData.projects[newIndex] = temp;

  saveSiteData();
  renderAdminProjectList();
  renderProjectsGrid();
  showToast("Project order updated", "info");
}

function deleteProject(projectId) {
  const proj = siteData.projects.find(p => p.id === projectId);
  if (!proj) return;

  if (confirm(`Are you sure you want to delete "${proj.title}"?`)) {
    siteData.projects = siteData.projects.filter(p => p.id !== projectId);
    saveSiteData();
    renderAdminProjectList();
    renderProjectsGrid();
    showToast(`Deleted "${proj.title}"`, "info");
  }
}

// Project Add / Edit Modal
function openAddEditProjectModal(projectId = null) {
  editingProjectId = projectId;
  const modal = document.getElementById("project-editor-modal");
  const modalTitle = document.getElementById("project-editor-modal-title");
  const form = document.getElementById("project-editor-form");

  // Populate Asset Images Select
  const assetSelect = document.getElementById("editor-asset-select");
  if (assetSelect) {
    assetSelect.innerHTML = `<option value="">-- Choose from existing asset image --</option>` +
      AVAILABLE_ASSET_IMAGES.map(img => `<option value="${img.path}">${img.name}</option>`).join("");
  }

  if (projectId) {
    const proj = siteData.projects.find(p => p.id === projectId);
    if (!proj) return;

    modalTitle.textContent = "Edit Project";
    document.getElementById("editor-proj-title").value = proj.title || "";
    document.getElementById("editor-proj-category").value = proj.categoryKey || "web";
    document.getElementById("editor-proj-desc").value = proj.description || "";
    document.getElementById("editor-proj-tags").value = (proj.tags || []).join(", ");
    document.getElementById("editor-proj-img").value = proj.image || "";
    document.getElementById("editor-proj-demo").value = proj.demoUrl || "";
    document.getElementById("editor-proj-github").value = proj.githubUrl || "";

    if (assetSelect) assetSelect.value = proj.image || "";
    updateEditorImagePreview(proj.image || "");
  } else {
    modalTitle.textContent = "Add New Project";
    form.reset();
    updateEditorImagePreview("");
  }

  openModal(modal);
}

function setupProjectEditor() {
  const assetSelect = document.getElementById("editor-asset-select");
  const imgInput = document.getElementById("editor-proj-img");
  const fileInput = document.getElementById("editor-proj-file");
  const form = document.getElementById("project-editor-form");

  if (assetSelect) {
    assetSelect.addEventListener("change", (e) => {
      if (e.target.value) {
        imgInput.value = e.target.value;
        updateEditorImagePreview(e.target.value);
      }
    });
  }

  if (imgInput) {
    imgInput.addEventListener("input", (e) => {
      updateEditorImagePreview(e.target.value);
    });
  }

  if (fileInput) {
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          imgInput.value = event.target.result;
          updateEditorImagePreview(event.target.result);
          if (assetSelect) assetSelect.value = "";
          showToast("Image loaded from file!", "success");
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = document.getElementById("editor-proj-title").value.trim();
      const categoryKey = document.getElementById("editor-proj-category").value;
      const description = document.getElementById("editor-proj-desc").value.trim();
      const tagsRaw = document.getElementById("editor-proj-tags").value.trim();
      const image = document.getElementById("editor-proj-img").value.trim() || "./assets/project-3.png";
      const demoUrl = document.getElementById("editor-proj-demo").value.trim();
      const githubUrl = document.getElementById("editor-proj-github").value.trim();

      const categoryMap = {
        web: "Web Development",
        mobile: "Mobile Apps",
        backend: "Database & Systems",
        algorithms: "Automation & Tools",
        other: "Engineering Project"
      };
      const category = categoryMap[categoryKey] || "Project";
      const tags = tagsRaw ? tagsRaw.split(",").map(t => t.trim()).filter(Boolean) : [];

      if (editingProjectId) {
        const idx = siteData.projects.findIndex(p => p.id === editingProjectId);
        if (idx !== -1) {
          siteData.projects[idx] = {
            ...siteData.projects[idx],
            title,
            category,
            categoryKey,
            description,
            tags,
            image,
            demoUrl,
            githubUrl
          };
          showToast(`Updated "${title}"`, "success");
        }
      } else {
        const newProj = {
          id: "proj-" + Date.now(),
          title,
          category,
          categoryKey,
          description,
          tags,
          image,
          demoUrl,
          githubUrl
        };
        siteData.projects.unshift(newProj);
        showToast(`Added project "${title}"`, "success");
      }

      saveSiteData();
      renderAdminProjectList();
      renderProjectsGrid();
      closeModal(document.getElementById("project-editor-modal"));
    });
  }
}

function updateEditorImagePreview(src) {
  const preview = document.getElementById("editor-img-preview");
  if (!preview) return;
  preview.src = src || "./assets/project-3.png";
}

// ==========================================================================
// ADMIN TAB 2: EDIT SITE TEXTS & CONTENT
// ==========================================================================
function populateSiteTextEditorForm() {
  if (!siteData) return;

  // Hero Section
  setInputValue("text-edit-hero-greeting", siteData.hero.greeting);
  setInputValue("text-edit-hero-name", siteData.hero.name);
  setInputValue("text-edit-hero-role", siteData.hero.role);
  setInputValue("text-edit-hero-bio", siteData.hero.bio);

  // About Section
  setInputValue("text-edit-about-lead", siteData.about.lead);
  setInputValue("text-edit-about-body", siteData.about.body);
  setInputValue("text-edit-about-exp-years", siteData.about.experienceYears);
  setInputValue("text-edit-about-exp-field", siteData.about.experienceField);
  setInputValue("text-edit-about-edu-degree", siteData.about.educationDegree);
  setInputValue("text-edit-about-edu-institute", siteData.about.educationInstitute);

  // Contact Section (WhatsApp & Email only)
  setInputValue("text-edit-contact-whatsapp", siteData.contact.whatsapp);
  setInputValue("text-edit-contact-email", siteData.contact.email);
}

function setInputValue(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val || "";
}

function setupSiteTextEditor() {
  const form = document.getElementById("site-texts-editor-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // 1. Update Hero
    siteData.hero.greeting = document.getElementById("text-edit-hero-greeting").value.trim();
    siteData.hero.name = document.getElementById("text-edit-hero-name").value.trim();
    siteData.hero.role = document.getElementById("text-edit-hero-role").value.trim();
    siteData.hero.bio = document.getElementById("text-edit-hero-bio").value.trim();

    // 2. Update About
    siteData.about.lead = document.getElementById("text-edit-about-lead").value.trim();
    siteData.about.body = document.getElementById("text-edit-about-body").value.trim();
    siteData.about.experienceYears = document.getElementById("text-edit-about-exp-years").value.trim();
    siteData.about.experienceField = document.getElementById("text-edit-about-exp-field").value.trim();
    siteData.about.educationDegree = document.getElementById("text-edit-about-edu-degree").value.trim();
    siteData.about.educationInstitute = document.getElementById("text-edit-about-edu-institute").value.trim();

    // 3. Update Contact
    const wa = document.getElementById("text-edit-contact-whatsapp").value.trim();
    siteData.contact.whatsapp = wa;
    siteData.contact.whatsappDisplay = `${wa} (WhatsApp / Phone)`;
    siteData.contact.email = document.getElementById("text-edit-contact-email").value.trim();

    saveSiteData();
    renderSiteData();
    showToast("Website texts updated and saved!", "success");
  });
}

// ==========================================================================
// ADMIN TAB 3: EXPORT & PUBLISH FOR GITHUB PAGES
// ==========================================================================
function exportSiteDataJson() {
  const jsonStr = JSON.stringify(siteData, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `site-data-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast("Site data JSON exported!", "success");
}

function copySiteDataCode() {
  const code = `const DEFAULT_SITE_DATA = ${JSON.stringify(siteData, null, 2)};\n\nconst AVAILABLE_ASSET_IMAGES = ${JSON.stringify(AVAILABLE_ASSET_IMAGES, null, 2)};\n`;
  navigator.clipboard.writeText(code).then(() => {
    showToast("Copied code! Paste it directly into site-data.js to commit to GitHub Pages.", "success");
  }).catch(() => {
    showToast("Could not access clipboard.", "error");
  });
}

function resetSiteDataToDefaults() {
  if (confirm("Reset all website texts and project listings to original defaults?")) {
    siteData = JSON.parse(JSON.stringify(DEFAULT_SITE_DATA));
    saveSiteData();
    renderSiteData();
    renderAdminProjectList();
    populateSiteTextEditorForm();
    showToast("Website restored to default data.", "info");
  }
}

// ==========================================================================
// CONTACT FORM & ACTIONS
// ==========================================================================
function initContactForm() {
  const form = document.getElementById("personal-contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("sender-name").value.trim();
      const email = document.getElementById("sender-email").value.trim();
      const message = document.getElementById("sender-message").value.trim();

      if (!name || !email || !message) {
        showToast("Please fill in your name, email, and message.", "error");
        return;
      }

      showToast(`Thank you, ${name}! Your message has been prepared.`, "success");

      const recipient = siteData.contact.email || "sohel2007084@stud.kuet.ac.bd";
      const subject = encodeURIComponent(`Portfolio Message from ${name}`);
      const body = encodeURIComponent(`Hi Sohel,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;

      setTimeout(() => {
        if (confirm("Would you like to open your email client to send this message directly to Sohel?")) {
          window.location.href = mailtoUrl;
        }
      }, 400);

      form.reset();
    });
  }
}

function copyEmailAddress() {
  const email = (siteData && siteData.contact && siteData.contact.email) ? siteData.contact.email : "sohel2007084@stud.kuet.ac.bd";
  navigator.clipboard.writeText(email).then(() => {
    showToast("Email address copied to clipboard!", "success");
  }).catch(() => {
    showToast("Email: " + email, "info");
  });
}

// ==========================================================================
// MODALS & UTILS
// ==========================================================================
function openModal(el) {
  if (!el) return;
  el.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal(el) {
  if (!el) return;
  el.classList.remove("open");
  const openModals = document.querySelectorAll(".modal-overlay.open");
  if (openModals.length === 0) {
    document.body.style.overflow = "auto";
  }
}

function closeAllModals() {
  document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("open"));
  document.body.style.overflow = "auto";
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-overlay")) {
    closeModal(e.target);
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeAllModals();
  }
});

function showToast(message, type = "info") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const iconMap = {
    success: "fa-solid fa-circle-check",
    error: "fa-solid fa-triangle-exclamation",
    info: "fa-solid fa-circle-info"
  };

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="${iconMap[type] || iconMap.info}"></i> <span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentElement) toast.parentElement.removeChild(toast);
  }, 3200);
}

function escapeHtml(str) {
  if (!str) return "";
  const d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}
