const VIVA_QUESTIONS = [
  {
    q: "What is Express.js and why is it preferred for Node.js backends?",
    a: "Express.js is a minimal, unopinionated web framework for Node.js providing robust routing, middleware pipelines, and HTTP utilities without cluttering core Node.js runtime performance."
  },
  {
    q: "What is an Express Router and why do we use express.Router()?",
    a: "express.Router() creates modular, isolated mini-applications for organizing route handlers across dedicated files (e.g. productRoutes.js) instead of dumping all endpoints in a single server.js file."
  },
  {
    q: "Explain the four CRUD operations and their HTTP methods.",
    a: "Create -> POST (returns 201 Created)\nRead -> GET (returns 200 OK)\nUpdate -> PUT/PATCH (returns 200 OK)\nDelete -> DELETE (returns 200 OK or 204 No Content)."
  },
  {
    q: "What does express.json() middleware do?",
    a: "It parses incoming HTTP request bodies with Content-Type: application/json and places the parsed object into req.body."
  },
  {
    q: "What is the difference between req.params and req.query?",
    a: "req.params parses path tokens like /api/products/:id, whereas req.query parses URL query strings like /api/products?category=Displays."
  },
  {
    q: "Why is CORS needed in Express APIs?",
    a: "CORS (Cross-Origin Resource Sharing) headers permit web browsers on different domains or ports to access Express API endpoints without browser security blocks."
  }
];

function switchTab(tabId) {
  document.querySelectorAll('.tab-pane').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-pill').forEach(el => el.classList.remove('active'));

  const activePane = document.getElementById(`tab-${tabId}`);
  if (activePane) activePane.classList.add('active');

  event.target.classList.add('active');

  if (tabId === 'inventory') {
    loadInventoryTable();
  }
}

function handleMethodChange() {
  const method = document.getElementById('httpMethod').value;
  const bodyGroup = document.getElementById('bodyEditorGroup');
  if (method === 'POST' || method === 'PUT') {
    bodyGroup.style.display = 'block';
  } else {
    bodyGroup.style.display = 'none';
  }
}

function setPreset(method, url) {
  document.getElementById('httpMethod').value = method;
  document.getElementById('requestUrl').value = url;
  handleMethodChange();
  handleSendRequest(new Event('submit'));
}

async function handleSendRequest(e) {
  if (e) e.preventDefault();

  const method = document.getElementById('httpMethod').value;
  const url = document.getElementById('requestUrl').value;
  const bodyText = document.getElementById('requestBody').value;
  const codeBox = document.getElementById('jsonResponse');
  const badge = document.getElementById('statusCodeBadge');
  const latency = document.getElementById('responseTime');

  badge.className = 'status-badge status-init';
  badge.textContent = 'Sending...';
  codeBox.textContent = '// Dispatching HTTP request...';

  const startTime = performance.now();

  try {
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (method === 'POST' || method === 'PUT') {
      try {
        JSON.parse(bodyText);
        options.body = bodyText;
      } catch (err) {
        alert('Invalid JSON in Request Payload!');
        return;
      }
    }

    const response = await fetch(url, options);
    const duration = Math.round(performance.now() - startTime);
    latency.textContent = `${duration} ms`;

    badge.textContent = `${response.status} ${response.statusText}`;
    badge.className = `status-badge ${response.ok ? 'status-2xx' : response.status < 500 ? 'status-4xx' : 'status-5xx'}`;

    const data = await response.json();
    codeBox.textContent = JSON.stringify(data, null, 2);

    // Refresh inventory count
    updateInventoryCount();
  } catch (error) {
    const duration = Math.round(performance.now() - startTime);
    latency.textContent = `${duration} ms`;
    badge.className = 'status-badge status-4xx';
    badge.textContent = 'Network Error';
    codeBox.textContent = `// Error connecting to ${url}\n${error.message}`;
  }
}

async function loadInventoryTable() {
  const tbody = document.getElementById('inventoryTableBody');
  tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;">Fetching live products...</td></tr>';

  try {
    const res = await fetch('/api/products');
    const data = await res.json();
    const items = data.data || [];

    document.getElementById('itemCount').textContent = items.length;

    if (items.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;">No products in database.</td></tr>';
      return;
    }

    tbody.innerHTML = items.map(p => `
      <tr>
        <td><strong>#${p.id}</strong></td>
        <td><strong>${p.name}</strong></td>
        <td><span style="color:#22d3ee;">${p.category}</span></td>
        <td><strong style="color:#10b981;">$${p.price.toFixed(2)}</strong></td>
        <td>${p.stock} units</td>
        <td style="max-width:250px; font-size:0.8rem; color:#94a3b8;">${p.description || '-'}</td>
        <td>
          <button class="action-btn-sm" onclick="setPreset('GET', '/api/products/${p.id}')">GET</button>
          <button class="action-btn-sm" onclick="setPreset('PUT', '/api/products/${p.id}')">PUT</button>
          <button class="action-btn-sm action-btn-delete" onclick="setPreset('DELETE', '/api/products/${p.id}')">DEL</button>
        </td>
      </tr>
    `).join('');
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="7" style="color:#f43f5e; text-align:center;">Failed to load items: ${err.message}</td></tr>`;
  }
}

async function updateInventoryCount() {
  try {
    const res = await fetch('/api/products');
    const data = await res.json();
    const items = data.data || [];
    document.getElementById('itemCount').textContent = items.length;
  } catch (err) {}
}

function renderViva() {
  const container = document.getElementById('vivaContainer');
  if (!container) return;

  container.innerHTML = VIVA_QUESTIONS.map((item, idx) => `
    <div class="viva-item">
      <div class="viva-header" onclick="toggleViva(${idx})">
        <span><strong>Q${idx + 1}:</strong> ${item.q}</span>
        <span id="vivaIcon-${idx}">+</span>
      </div>
      <div id="vivaBody-${idx}" class="viva-body" style="display: ${idx === 0 ? 'block' : 'none'};">
        ${item.a}
      </div>
    </div>
  `).join('');
}

function toggleViva(idx) {
  const body = document.getElementById(`vivaBody-${idx}`);
  const icon = document.getElementById(`vivaIcon-${idx}`);
  if (body.style.display === 'none') {
    body.style.display = 'block';
    icon.textContent = '-';
  } else {
    body.style.display = 'none';
    icon.textContent = '+';
  }
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
  renderViva();
  updateInventoryCount();
  // Auto test GET all on load
  handleSendRequest();
});
