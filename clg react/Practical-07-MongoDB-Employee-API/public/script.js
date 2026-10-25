// Practical 07: MongoDB Atlas Employee Management Frontend Script

const API_BASE = '/api/employees';

// DOM Elements
const dbStatusPill = document.getElementById('db-status-pill');
const dbStatusText = document.getElementById('db-status-text');
const dbModeLabel = document.getElementById('db-mode-label');
const dbMessageLabel = document.getElementById('db-message-label');

const analyticsGrid = document.getElementById('analytics-grid');
const refreshAnalyticsBtn = document.getElementById('refresh-analytics-btn');

const employeeTableBody = document.getElementById('employee-table-body');
const searchInput = document.getElementById('search-input');
const departmentFilter = document.getElementById('department-filter');
const sortSelect = document.getElementById('sort-select');

const responseStatusBadge = document.getElementById('response-status-badge');
const responseLatencyBadge = document.getElementById('response-latency-badge');
const jsonViewer = document.getElementById('json-viewer');

const addModal = document.getElementById('add-modal');
const openAddModalBtn = document.getElementById('open-add-modal-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const cancelModalBtn = document.getElementById('cancel-modal-btn');
const addEmployeeForm = document.getElementById('add-employee-form');

// Helper: Inspect JSON
function inspectResponse(status, latencyMs, payload) {
  responseStatusBadge.textContent = `STATUS: ${status}`;
  responseStatusBadge.style.background = status >= 200 && status < 300 
    ? 'rgba(16, 185, 129, 0.2)' 
    : 'rgba(244, 63, 94, 0.2)';
  responseStatusBadge.style.color = status >= 200 && status < 300 ? '#34d399' : '#f87171';
  responseLatencyBadge.textContent = `${latencyMs} ms`;
  jsonViewer.textContent = JSON.stringify(payload, null, 2);
}

// 1. Check Database Engine Status
async function checkDBStatus() {
  const start = performance.now();
  try {
    const res = await fetch(`${API_BASE}/db-status`);
    const data = await res.json();
    const duration = Math.round(performance.now() - start);

    if (data.status.isAtlas) {
      dbStatusPill.className = 'status-pill online';
      dbStatusText.textContent = 'Atlas Cluster Connected';
      dbModeLabel.textContent = 'MongoDB Atlas Cloud';
      dbModeLabel.style.color = '#34d399';
    } else {
      dbStatusPill.className = 'status-pill checking';
      dbStatusText.textContent = 'Local Mongo Fallback';
      dbModeLabel.textContent = 'Simulated Mongo Engine (Offline Safe)';
      dbModeLabel.style.color = '#fbbf24';
    }
    dbMessageLabel.textContent = data.status.message;
  } catch (err) {
    dbStatusPill.className = 'status-pill';
    dbStatusText.textContent = 'Engine Offline';
    dbMessageLabel.textContent = err.message;
  }
}

// 2. Fetch Department Aggregation Pipeline Stats
async function fetchAnalytics() {
  const start = performance.now();
  try {
    const res = await fetch(`${API_BASE}/analytics/overview`);
    const result = await res.json();
    const duration = Math.round(performance.now() - start);

    if (result.success && result.data.length > 0) {
      analyticsGrid.innerHTML = result.data.map(item => `
        <div class="stat-card">
          <span class="stat-dept-name">${item._id} Department</span>
          <span class="stat-val-highlight">₹${item.avgSalary.toLocaleString()}</span>
          <div class="stat-sub-info">
            <span>Headcount: <strong>${item.headcount}</strong></span>
            <span>Payroll: ₹${item.totalPayroll.toLocaleString()}</span>
          </div>
        </div>
      `).join('');
    } else {
      analyticsGrid.innerHTML = `<p class="subtext">No aggregation data available.</p>`;
    }
  } catch (err) {
    analyticsGrid.innerHTML = `<p class="subtext" style="color: #f87171;">Failed to load analytics: ${err.message}</p>`;
  }
}

// 3. Fetch & Render Employees Table
async function fetchEmployees() {
  const search = searchInput.value.trim();
  const dept = departmentFilter.value;
  const sort = sortSelect.value;

  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (dept !== 'All') params.append('department', dept);
  if (sort) params.append('sort', sort);

  const url = `${API_BASE}?${params.toString()}`;
  const start = performance.now();

  try {
    const res = await fetch(url);
    const result = await res.json();
    const duration = Math.round(performance.now() - start);

    inspectResponse(res.status, duration, result);

    if (result.success && result.data.length > 0) {
      employeeTableBody.innerHTML = result.data.map(emp => `
        <tr>
          <td><span class="emp-id-pill">${emp.empId}</span></td>
          <td>
            <strong>${emp.name}</strong>
            <br><small style="color: #9ca3af;">${emp.email}</small>
          </td>
          <td>${emp.department}</td>
          <td>${emp.designation}</td>
          <td style="font-family: var(--font-mono); font-weight: 600;">₹${Number(emp.salary).toLocaleString()}</td>
          <td>
            <span class="status-badge ${emp.status === 'Active' ? 'Active' : 'On-Leave'}">
              ${emp.status}
            </span>
          </td>
          <td>
            <button class="btn-danger-sm" onclick="handleDelete('${emp._id}', '${emp.empId}', '${emp.name}')">Delete</button>
          </td>
        </tr>
      `).join('');
    } else {
      employeeTableBody.innerHTML = `
        <tr>
          <td colspan="7" class="loading-cell">No matching employee documents found in MongoDB.</td>
        </tr>
      `;
    }
  } catch (err) {
    employeeTableBody.innerHTML = `
      <tr>
        <td colspan="7" class="loading-cell" style="color: #f87171;">Network Error: ${err.message}</td>
      </tr>
    `;
  }
}

// 4. Delete Employee Document
window.handleDelete = async function(id, empId, name) {
  if (!confirm(`Are you sure you want to delete employee ${name} (${empId}) from MongoDB?`)) {
    return;
  }

  const start = performance.now();
  try {
    const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    const result = await res.json();
    const duration = Math.round(performance.now() - start);

    inspectResponse(res.status, duration, result);

    if (result.success) {
      fetchEmployees();
      fetchAnalytics();
    } else {
      alert(`Delete Error: ${result.message}`);
    }
  } catch (err) {
    alert(`Request Failed: ${err.message}`);
  }
};

// 5. Add Employee Form Submit
addEmployeeForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const payload = {
    empId: document.getElementById('modal-empId').value.trim(),
    name: document.getElementById('modal-name').value.trim(),
    email: document.getElementById('modal-email').value.trim(),
    department: document.getElementById('modal-dept').value,
    designation: document.getElementById('modal-designation').value.trim(),
    salary: Number(document.getElementById('modal-salary').value),
    status: 'Active'
  };

  const start = performance.now();
  try {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await res.json();
    const duration = Math.round(performance.now() - start);

    inspectResponse(res.status, duration, result);

    if (result.success) {
      addModal.classList.add('hidden');
      addEmployeeForm.reset();
      fetchEmployees();
      fetchAnalytics();
    } else {
      alert(`Creation Error: ${result.message}`);
    }
  } catch (err) {
    alert(`Submit Failed: ${err.message}`);
  }
});

// Modal Event Listeners
openAddModalBtn.addEventListener('click', () => addModal.classList.remove('hidden'));
closeModalBtn.addEventListener('click', () => addModal.classList.add('hidden'));
cancelModalBtn.addEventListener('click', () => addModal.classList.add('hidden'));

// Search & Filter Listeners
let searchDebounce;
searchInput.addEventListener('input', () => {
  clearTimeout(searchDebounce);
  searchDebounce = setTimeout(fetchEmployees, 300);
});

departmentFilter.addEventListener('change', fetchEmployees);
sortSelect.addEventListener('change', fetchEmployees);
refreshAnalyticsBtn.addEventListener('click', fetchAnalytics);

// Initial Execution
checkDBStatus();
fetchAnalytics();
fetchEmployees();
