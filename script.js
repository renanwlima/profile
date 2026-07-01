// Rolagem suave ao clicar no menu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

// Lógica para alternar tema (modo escuro)
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Por padrão, o tema é escuro. Verifica se o usuário salvou o tema claro.
if (localStorage.getItem('theme') === 'light') {
  body.classList.remove('dark-mode');
  themeToggle.innerHTML = '🌙';
} else {
  body.classList.add('dark-mode'); // Garante que o modo escuro seja aplicado
  themeToggle.innerHTML = '☀️'; 
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');

  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
    themeToggle.innerHTML = '☀️'; // Ícone de sol para ir para o modo claro
  } else {
    localStorage.setItem('theme', 'light');
    themeToggle.innerHTML = '🌙'; // Ícone de lua para ir para o modo escuro
  }
});

// ==========================================================================
// INTERACTIVE PROJECTS MODAL LOGIC
// ==========================================================================
const modal = document.getElementById('project-modal');
const modalBody = modal.querySelector('.modal-body');
const modalClose = modal.querySelector('.modal-close');
const modalBackdrop = modal.querySelector('.modal-backdrop');

function openModal(projectCard) {
  // Extract and clone components from clicked project card
  const imgWrapper = projectCard.querySelector('.projeto-image-wrapper').cloneNode(true);
  const title = projectCard.querySelector('h3').textContent;
  const tags = projectCard.querySelector('.project-tags').cloneNode(true);
  const desc = projectCard.querySelector('p').textContent;
  const features = projectCard.querySelector('.projeto-features') 
    ? projectCard.querySelector('.projeto-features').cloneNode(true) 
    : null;
  
  // Clear modal body
  modalBody.innerHTML = '';
  
  // Construct modal header title
  const modalTitle = document.createElement('h3');
  modalTitle.textContent = title;
  
  // Construct modal description
  const modalDesc = document.createElement('p');
  modalDesc.textContent = desc;
  
  // Append elements inside the modal body
  modalBody.appendChild(imgWrapper);
  modalBody.appendChild(modalTitle);
  modalBody.appendChild(tags);
  modalBody.appendChild(modalDesc);
  
  if (features) {
    modalBody.appendChild(features);
  }
  
  // Display the modal with smooth transitions
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Disable scroll on background body
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = ''; // Re-enable background scrolling
}

// Add click listeners to all "Ver mais" buttons
document.querySelectorAll('.btn-ver-mais').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.projeto');
    openModal(card);
  });
});

// Close modal interactions
modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);

// Listen to Escape key to exit modal
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});

// ==========================================================================
// MOBILE MENU TOGGLE LOGIC
// ==========================================================================
const hamburgerToggle = document.querySelector('.hamburger-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

if (hamburgerToggle && navbarMenu) {
  hamburgerToggle.addEventListener('click', () => {
    const isActive = hamburgerToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
    hamburgerToggle.setAttribute('aria-expanded', isActive);
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.navbar-menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburgerToggle.classList.remove('active');
      navbarMenu.classList.remove('active');
      hamburgerToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close mobile menu when clicking outside the navbar container
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar-container') && navbarMenu.classList.contains('active')) {
      hamburgerToggle.classList.remove('active');
      navbarMenu.classList.remove('active');
      hamburgerToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Console ready log
console.log("Portfólio de Renan carregado com sucesso!");
