/* =============================================
   SHAKS — PORTFOLIO JAVASCRIPT
   File: script.js
   ============================================= */


/* ── 1. THEME TOGGLE ──────────────────────────
   Switches between dark and light mode.
   We store the user's choice in localStorage
   so it remembers when they come back.
   ─────────────────────────────────────────── */

// Grab the elements we need
const themeBtn  = document.getElementById('themeBtn')
const themeIcon = document.getElementById('themeIcon')
const html      = document.documentElement   // this is the <html> tag

// Check if the user has a saved theme from last visit
const savedTheme = localStorage.getItem('theme') || 'dark'
html.setAttribute('data-theme', savedTheme)
updateIcon(savedTheme)

// When the button is clicked, switch the theme
themeBtn.addEventListener('click', function () {
  const current = html.getAttribute('data-theme')
  const next    = current === 'dark' ? 'light' : 'dark'

  html.setAttribute('data-theme', next)   // swap the theme
  localStorage.setItem('theme', next)     // save choice
  updateIcon(next)                        // update the icon
})

// Show sun ☀️ on dark mode (clicking switches to light)
// Show moon 🌙 on light mode (clicking switches to dark)
function updateIcon(theme) {
  themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙'
}


/* ── 2. MOBILE MENU ───────────────────────────
   Opens and closes the mobile nav menu
   when the hamburger button is clicked.
   ─────────────────────────────────────────── */

const burger     = document.getElementById('burger')
const mobileMenu = document.getElementById('mobileMenu')

// Toggle menu open/closed when burger is clicked
burger.addEventListener('click', function () {
  mobileMenu.classList.toggle('open')
})

// Close the menu (called by onclick in HTML links)
function closeMenu() {
  mobileMenu.classList.remove('open')
}


/* ── 3. CONTACT FORM ──────────────────────────
   Simple validation when the user clicks
   "Send Message". Checks that all fields
   are filled before showing a success message.
   ─────────────────────────────────────────── */

function sendMessage() {
  // Get the values the user typed
  const name    = document.getElementById('name').value.trim()
  const email   = document.getElementById('email').value.trim()
  const message = document.getElementById('message').value.trim()

  // Check if any field is empty
  if (name === '' || email === '' || message === '') {
    alert('Please fill in all fields before sending.')
    return  // stop here, don't continue
  }

  // Simple email format check (must have @ and .)
  if (!email.includes('@') || !email.includes('.')) {
    alert('Please enter a valid email address.')
    return
  }

  // If all good, show success message
  alert(`Thanks ${name}! Your message has been sent. I'll get back to you soon.`)

  // Clear the form
  document.getElementById('name').value    = ''
  document.getElementById('email').value   = ''
  document.getElementById('message').value = ''
}


/* ── 4. NAVBAR ACTIVE LINK ────────────────────
   Highlights the nav link for whatever
   section the user is currently looking at
   as they scroll down the page.
   ─────────────────────────────────────────── */

const navLinks  = document.querySelectorAll('.nav-links a')
const sections  = document.querySelectorAll('section')

window.addEventListener('scroll', function () {
  let currentSection = ''

  // Loop through every section and check which one is on screen
  sections.forEach(function (section) {
    const sectionTop = section.offsetTop - 80  // 80px offset for navbar height
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id')
    }
  })

  // Remove 'active' from all links, then add it to the current one
  navLinks.forEach(function (link) {
    link.classList.remove('active')
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active')
    }
  })
})


/* ── 5. FADE-IN ON SCROLL ─────────────────────
   Cards and sections fade in as you
   scroll down to them instead of just
   appearing all at once.
   ─────────────────────────────────────────── */

// Select everything we want to animate
const fadeElements = document.querySelectorAll(
  '.project-card, .skill-card, .about-card, .section-title'
)

// Add the starting hidden style to each element
fadeElements.forEach(function (el) {
  el.style.opacity   = '0'
  el.style.transform = 'translateY(20px)'
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
})

// This runs every time the user scrolls
window.addEventListener('scroll', function () {
  fadeElements.forEach(function (el) {
    const rect = el.getBoundingClientRect()  // where is this element on screen?

    // If the element is visible in the viewport
    if (rect.top < window.innerHeight - 80) {
      el.style.opacity   = '1'
      el.style.transform = 'translateY(0)'
    }
  })
})
