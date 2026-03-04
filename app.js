// Twisday Premium — Logic & Interactions

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(d);
}

function formatContent(content) {
  if (!content) return '';
  return content
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(Boolean)
    .map(p => `<p>${escapeHtml(p).replace(/\n/g, '<br>')}</p>`)
    .join('');
}

// Estimate reading time based on 200 words per minute
function estimateReadingTime(text) {
  if (!text) return '1 min read';
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

async function loadPosts() {
  return window.twisdayPosts || [];
}

// Global Interaction Logic
document.addEventListener('DOMContentLoaded', () => {
  // Glow effect following mouse on post cards
  document.addEventListener('mousemove', e => {
    document.querySelectorAll('.post-card-inner').forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
});

// Intersection Observer for scroll animations if elements are created dynamically
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

function observeElement(el) {
  // For elements that are added after load
  el.classList.add('reveal');
  observer.observe(el);
}

// --- Calendar & Home Logic ---
let allPosts = [];
let filteredPosts = [];
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedDate = null; // format YYYY-MM-DD

async function initHome() {
  allPosts = await loadPosts();
  filteredPosts = [...allPosts];

  // If there are posts, default the calendar to the month of the newest post
  if (allPosts.length > 0) {
    const latestPostDate = allPosts[0].date;
    const [y, m] = latestPostDate.split('-');
    if (y && m) {
      currentYear = parseInt(y, 10);
      currentMonth = parseInt(m, 10) - 1;
    }
  }

  renderCalendar();
  renderPostsList(filteredPosts);
}

function renderCalendar() {
  const container = document.getElementById('calendar-section');
  if (!container) return; // Only run on home page

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const postDatesThisMonth = allPosts.map(p => {
    if (!p.date) return -1;
    const [y, m, d] = p.date.split('-');
    if (parseInt(y, 10) === currentYear && parseInt(m, 10) - 1 === currentMonth) {
      return parseInt(d, 10);
    }
    return -1;
  }).filter(d => d !== -1);

  let html = `
    <div class="calendar-header">
      <button class="calendar-nav" onclick="changeMonth(-1)" aria-label="Previous month">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" transform="scale(-1, 1)">
          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <h3>${months[currentMonth]} ${currentYear}</h3>
      <button class="calendar-nav" onclick="changeMonth(1)" aria-label="Next month">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
    <div class="calendar-grid">
      <div class="calendar-day-name">Sun</div>
      <div class="calendar-day-name">Mon</div>
      <div class="calendar-day-name">Tue</div>
      <div class="calendar-day-name">Wed</div>
      <div class="calendar-day-name">Thu</div>
      <div class="calendar-day-name">Fri</div>
      <div class="calendar-day-name">Sat</div>
  `;

  for (let i = 0; i < firstDay; i++) {
    html += `<div class="calendar-day empty"></div>`;
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const hasPost = postDatesThisMonth.includes(day);
    const isActive = selectedDate === dateStr;

    let classes = "calendar-day";
    if (hasPost) classes += " has-post clickable";
    if (isActive) classes += " active";

    if (hasPost || isActive) {
      html += `<div class="${classes}" onclick="selectDate('${dateStr}')">${day}</div>`;
    } else {
      html += `<div class="${classes}">${day}</div>`;
    }
  }

  html += `</div>`;
  container.innerHTML = html;
}

function changeMonth(delta) {
  currentMonth += delta;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
}

function selectDate(dateStr) {
  // Only allow selecting dates that actually have posts (to be safe)
  const hasPost = allPosts.some(p => p.date === dateStr);
  if (!hasPost && selectedDate !== dateStr) return;

  if (selectedDate === dateStr) {
    clearFilter();
    return;
  }
  selectedDate = dateStr;
  filteredPosts = allPosts.filter(p => p.date === dateStr);

  renderCalendar();
  renderFilterNotice();
  renderPostsList(filteredPosts);

  const postsList = document.getElementById('filter-container');
  if (postsList) {
    const yOffset = -20;
    const y = postsList.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

function clearFilter() {
  selectedDate = null;
  filteredPosts = [...allPosts];
  renderCalendar();
  renderFilterNotice();
  renderPostsList(filteredPosts);
}

function renderFilterNotice() {
  const container = document.getElementById('filter-container');
  if (!container) return;

  if (selectedDate) {
    container.innerHTML = `
      <div class="filter-notice">
        <span>Showing stories for <strong>${formatDate(selectedDate)}</strong></span>
        <button class="clear-filter" onclick="clearFilter()">Clear filter</button>
      </div>
    `;
  } else {
    container.innerHTML = '';
  }
}

function renderPostsList(posts) {
  const container = document.getElementById('posts-list');
  if (!container) return;

  container.innerHTML = '';

  if (!posts || posts.length === 0) {
    container.innerHTML = '<p class="loading">No stories found for this date.</p>';
    return;
  }

  posts.forEach((post, index) => {
    const originalIndex = allPosts.findIndex(p => p === post);

    const el = document.createElement('article');
    el.className = 'post-card fade-in-up';
    el.style.animationDelay = `${0.1 + (index * 0.1)}s`;

    const excerpt = escapeHtml(post.excerpt || post.content.slice(0, 120) + '…');

    el.innerHTML = `
      <a href="post.html?id=${originalIndex}" class="post-card-inner">
        <div class="post-meta">
          <time datetime="${post.date}">${formatDate(post.date)}</time>
          <span class="reading-time">${estimateReadingTime(post.content)}</span>
        </div>
        <h2>${escapeHtml(post.title)}</h2>
        <p class="excerpt">${excerpt}</p>
        <div class="read-more">
          <span>Read story</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="arrow-icon">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </a>
    `;
    observeElement(el);
    container.appendChild(el);
  });
}
