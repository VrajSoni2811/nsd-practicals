// Practical 11: Blog System with JWT Authentication & RBAC

const API_AUTH = '/api/auth';
const API_ARTICLES = '/api/articles';

// State
let currentToken = null;
let currentUser = null;

// DOM Elements
const userAvatar = document.getElementById('user-avatar');
const userDisplayName = document.getElementById('user-display-name');
const userDisplayEmail = document.getElementById('user-display-email');
const userRoleBadge = document.getElementById('user-role-badge');
const logoutBtn = document.getElementById('logout-btn');
const tokenStatusPill = document.getElementById('token-status-pill');

// Permissions Matrix
const permRead = document.getElementById('perm-read');
const permComment = document.getElementById('perm-comment');
const permCreate = document.getElementById('perm-create');
const permEditOwn = document.getElementById('perm-edit-own');
const permAdminOverride = document.getElementById('perm-admin-override');

// Article Feeds & Modals
const articlesGrid = document.getElementById('articles-grid');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const openPublishModalBtn = document.getElementById('open-publish-modal-btn');
const publishModal = document.getElementById('publish-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const cancelModalBtn = document.getElementById('cancel-modal-btn');
const publishForm = document.getElementById('publish-form');

// Response Inspector
const responseStatusBadge = document.getElementById('response-status-badge');
const responseLatencyBadge = document.getElementById('response-latency-badge');
const jsonViewer = document.getElementById('json-viewer');

// Inspector Helper
function inspectResponse(status, latencyMs, payload) {
  responseStatusBadge.textContent = `STATUS: ${status}`;
  if (status >= 200 && status < 300) {
    responseStatusBadge.style.background = 'rgba(16, 185, 129, 0.2)';
    responseStatusBadge.style.color = '#34d399';
  } else if (status === 401 || status === 403) {
    responseStatusBadge.style.background = 'rgba(244, 63, 94, 0.2)';
    responseStatusBadge.style.color = '#f87171';
  } else {
    responseStatusBadge.style.background = 'rgba(245, 158, 11, 0.2)';
    responseStatusBadge.style.color = '#fbbf24';
  }

  responseLatencyBadge.textContent = `${latencyMs} ms`;
  jsonViewer.textContent = JSON.stringify(payload, null, 2);
}

// 1. Update Capabilities & Permissions Matrix
function updateCapabilities() {
  const role = currentUser ? currentUser.role : 'Guest';

  // Read: All
  permRead.className = 'matrix-cell granted';

  // Comment: Requires authentication
  if (currentUser) {
    permComment.className = 'matrix-cell granted';
    permComment.querySelector('.perm-icon').textContent = '✅';
  } else {
    permComment.className = 'matrix-cell denied';
    permComment.querySelector('.perm-icon').textContent = '🔒';
  }

  // Create: Author & Admin
  if (role === 'Author' || role === 'Admin') {
    permCreate.className = 'matrix-cell granted';
    permCreate.querySelector('.perm-icon').textContent = '✅';
    openPublishModalBtn.disabled = false;
  } else {
    permCreate.className = 'matrix-cell denied';
    permCreate.querySelector('.perm-icon').textContent = '🔒';
    openPublishModalBtn.disabled = true;
  }

  // Edit Own: Author & Admin
  if (role === 'Author' || role === 'Admin') {
    permEditOwn.className = 'matrix-cell granted';
    permEditOwn.querySelector('.perm-icon').textContent = '✅';
  } else {
    permEditOwn.className = 'matrix-cell denied';
    permEditOwn.querySelector('.perm-icon').textContent = '🔒';
  }

  // Admin Override: Admin Only
  if (role === 'Admin') {
    permAdminOverride.className = 'matrix-cell granted';
    permAdminOverride.querySelector('.perm-icon').textContent = '✅';
  } else {
    permAdminOverride.className = 'matrix-cell denied';
    permAdminOverride.querySelector('.perm-icon').textContent = '🔒';
  }
}

// 2. Login Flow
async function handleLogin(email, password) {
  const start = performance.now();
  try {
    const res = await fetch(`${API_AUTH}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const result = await res.json();
    const duration = Math.round(performance.now() - start);

    inspectResponse(res.status, duration, result);

    if (result.success) {
      currentToken = result.token;
      currentUser = result.user;

      // Update UI
      userDisplayName.textContent = currentUser.name;
      userDisplayEmail.textContent = currentUser.email;
      userRoleBadge.textContent = currentUser.role;
      userRoleBadge.className = `role-badge ${currentUser.role}`;

      if (currentUser.role === 'Admin') userAvatar.textContent = '👑';
      else if (currentUser.role === 'Author') userAvatar.textContent = '✍️';
      else userAvatar.textContent = '📖';

      tokenStatusPill.textContent = `JWT: Verified (${currentUser.role} Token)`;
      tokenStatusPill.style.color = '#34d399';

      updateCapabilities();
      fetchArticles();
    } else {
      alert(`Login failed: ${result.message}`);
    }
  } catch (err) {
    alert(`Request error: ${err.message}`);
  }
}

// 3. Logout Flow
function handleLogout() {
  currentToken = null;
  currentUser = null;

  userDisplayName.textContent = 'Guest / Unauthenticated';
  userDisplayEmail.textContent = 'Public read-only permissions';
  userRoleBadge.textContent = 'Guest';
  userRoleBadge.className = 'role-badge Guest';
  userAvatar.textContent = '👤';

  tokenStatusPill.textContent = 'JWT Status: Not Authenticated';
  tokenStatusPill.style.color = 'var(--text-muted)';

  updateCapabilities();
  fetchArticles();
}

// 4. Fetch Articles
async function fetchArticles() {
  const search = searchInput.value.trim();
  const cat = categoryFilter.value;

  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (cat !== 'All') params.append('category', cat);

  const start = performance.now();
  try {
    const res = await fetch(`${API_ARTICLES}?${params.toString()}`);
    const result = await res.json();
    const duration = Math.round(performance.now() - start);

    inspectResponse(res.status, duration, result);

    if (result.success && result.data.length > 0) {
      articlesGrid.innerHTML = result.data.map(art => {
        const canDelete = currentUser && (currentUser.role === 'Admin' || currentUser.id === art.authorId);

        return `
          <div class="article-card glass-panel">
            <div class="card-top-row">
              <span class="badge" style="background: rgba(255,255,255,0.06); color: #94a3b8;">${art.category}</span>
              <span style="font-size: 0.78rem; color: var(--text-muted);">⏱️ ${art.readTimeMinutes} min read</span>
            </div>

            <h3 class="article-title">${art.title}</h3>
            <p class="article-excerpt">${art.excerpt}</p>

            <div class="article-meta-row">
              <span>By <strong>${art.authorName}</strong></span>
              <span>💬 ${art.comments ? art.comments.length : 0} comments</span>
            </div>

            ${art.comments && art.comments.length > 0 ? `
              <div class="comments-container">
                <div class="comment-bubble">
                  <strong>${art.comments[art.comments.length - 1].userName}:</strong> ${art.comments[art.comments.length - 1].commentText}
                </div>
              </div>
            ` : ''}

            <div class="card-actions-row">
              <button class="btn-card-action btn-comment-art" onclick="handlePromptComment('${art._id}')">
                + Add Comment
              </button>

              ${canDelete ? `
                <button class="btn-card-action btn-delete-art" onclick="handleDeleteArticle('${art._id}', '${art.title}')">
                  Delete
                </button>
              ` : ''}
            </div>
          </div>
        `;
      }).join('');
    } else {
      articlesGrid.innerHTML = `<div class="loading-state">No articles found in repository.</div>`;
    }
  } catch (err) {
    articlesGrid.innerHTML = `<div class="loading-state" style="color: #f87171;">Failed to load articles: ${err.message}</div>`;
  }
}

// 5. Add Comment Handler
window.handlePromptComment = async function(articleId) {
  if (!currentUser) {
    alert('RBAC Violation: You must log in (as Reader, Author or Admin) to post comments.');
    return;
  }

  const commentText = prompt('Enter your comment:');
  if (!commentText || !commentText.trim()) return;

  const start = performance.now();
  try {
    const res = await fetch(`${API_ARTICLES}/${articleId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentToken}`
      },
      body: JSON.stringify({ commentText: commentText.trim() })
    });
    const result = await res.json();
    const duration = Math.round(performance.now() - start);

    inspectResponse(res.status, duration, result);

    if (result.success) {
      fetchArticles();
    } else {
      alert(`Comment Error: ${result.message}`);
    }
  } catch (err) {
    alert(`Request error: ${err.message}`);
  }
};

// 6. Delete Article Handler
window.handleDeleteArticle = async function(id, title) {
  if (!window.confirm(`Delete article "${title}" from MongoDB?`)) return;

  const start = performance.now();
  try {
    const res = await fetch(`${API_ARTICLES}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${currentToken}`
      }
    });
    const result = await res.json();
    const duration = Math.round(performance.now() - start);

    inspectResponse(res.status, duration, result);

    if (result.success) {
      fetchArticles();
    } else {
      alert(`Deletion Error: ${result.message}`);
    }
  } catch (err) {
    alert(`Request error: ${err.message}`);
  }
};

// 7. Publish Form Submit
publishForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!currentUser || (currentUser.role !== 'Author' && currentUser.role !== 'Admin')) {
    alert('RBAC Violation: Only Authors and Admins can publish articles.');
    return;
  }

  const payload = {
    title: document.getElementById('post-title').value.trim(),
    category: document.getElementById('post-category').value,
    readTimeMinutes: Number(document.getElementById('post-readtime').value),
    excerpt: document.getElementById('post-excerpt').value.trim(),
    content: document.getElementById('post-content').value.trim()
  };

  const start = performance.now();
  try {
    const res = await fetch(API_ARTICLES, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentToken}`
      },
      body: JSON.stringify(payload)
    });
    const result = await res.json();
    const duration = Math.round(performance.now() - start);

    inspectResponse(res.status, duration, result);

    if (result.success) {
      publishModal.classList.add('hidden');
      publishForm.reset();
      fetchArticles();
    } else {
      alert(`Publish Error: ${result.message}`);
    }
  } catch (err) {
    alert(`Submit error: ${err.message}`);
  }
});

// Event Listeners
document.querySelectorAll('.role-pill-btn').forEach(btn => {
  if (btn.id === 'logout-btn') return;
  btn.addEventListener('click', () => {
    const email = btn.getAttribute('data-email');
    const pass = btn.getAttribute('data-pass');
    handleLogin(email, pass);
  });
});

logoutBtn.addEventListener('click', handleLogout);

openPublishModalBtn.addEventListener('click', () => publishModal.classList.remove('hidden'));
closeModalBtn.addEventListener('click', () => publishModal.classList.add('hidden'));
cancelModalBtn.addEventListener('click', () => publishModal.classList.add('hidden'));

let searchDebounce;
searchInput.addEventListener('input', () => {
  clearTimeout(searchDebounce);
  searchDebounce = setTimeout(fetchArticles, 300);
});

categoryFilter.addEventListener('change', fetchArticles);

// Init
updateCapabilities();
fetchArticles();
