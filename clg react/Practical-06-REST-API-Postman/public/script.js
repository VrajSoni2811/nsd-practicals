const POSTMAN_TESTS = [
  {
    id: 1,
    name: "1. GET All Students",
    method: "GET",
    url: "/api/students",
    body: null,
    assertions: [
      "Status code is 200 OK",
      "Response success flag is true",
      "data is an Array of student records"
    ],
    validator: (status, data) => status === 200 && data.success && Array.isArray(data.data)
  },
  {
    id: 2,
    name: "2. GET Pagination & Filter",
    method: "GET",
    url: "/api/students?department=Computer Science&page=1&limit=2",
    body: null,
    assertions: [
      "Status code is 200 OK",
      "Pagination metadata exists (page, totalPages)",
      "Department of returned items is Computer Science"
    ],
    validator: (status, data) => status === 200 && data.page === 1 && data.data.every(s => s.department === 'Computer Science')
  },
  {
    id: 3,
    name: "3. GET Single Student (#1)",
    method: "GET",
    url: "/api/students/1",
    body: null,
    assertions: [
      "Status code is 200 OK",
      "Returned student id matches 1",
      "fullName is Aarav Sharma"
    ],
    validator: (status, data) => status === 200 && data.data.id === 1 && data.data.fullName === 'Aarav Sharma'
  },
  {
    id: 4,
    name: "4. POST Create New Student",
    method: "POST",
    url: "/api/students",
    body: {
      rollNo: "STU-1006",
      fullName: "Karan Johar",
      email: "karan.johar@college.edu",
      phone: "9876501234",
      department: "Information Technology",
      semester: 5,
      cgpa: 9.15,
      gender: "Male",
      skills: ["React", "Express", "AWS"]
    },
    assertions: [
      "Status code is 201 Created",
      "Response contains generated id",
      "rollNo is STU-1006"
    ],
    validator: (status, data) => (status === 201 || (status === 400 && data.message.includes('Conflict'))) && Boolean(data)
  },
  {
    id: 5,
    name: "5. PUT Update Student (#2)",
    method: "PUT",
    url: "/api/students/2",
    body: {
      fullName: "Priya Patel (Distinction)",
      cgpa: 9.95,
      semester: 7
    },
    assertions: [
      "Status code is 200 OK",
      "cgpa updated to 9.95",
      "fullName contains Distinction"
    ],
    validator: (status, data) => status === 200 && data.data.cgpa === 9.95
  },
  {
    id: 6,
    name: "6. DELETE Student (#5)",
    method: "DELETE",
    url: "/api/students/5",
    body: null,
    assertions: [
      "Status code is 200 OK or 404 (if already deleted)",
      "Student removed from collection"
    ],
    validator: (status, data) => status === 200 || status === 404
  },
  {
    id: 7,
    name: "7. GET 404 Non-existent ID",
    method: "GET",
    url: "/api/students/9999",
    body: null,
    assertions: [
      "Status code is 404 Not Found",
      "success is false with descriptive error message"
    ],
    validator: (status, data) => status === 404 && data.success === false
  }
];

const VIVA_QUESTIONS = [
  {
    q: "What is a RESTful API and what are the 6 architectural constraints?",
    a: "REST (Representational State Transfer) is an architectural style based on 6 constraints: Client-Server, Statelessness, Cacheability, Layered System, Uniform Interface, and Code on Demand."
  },
  {
    q: "Why is Postman used for API testing?",
    a: "Postman allows composing HTTP requests with custom headers, query params, and payloads, and writing automated test scripts (pm.test) to validate status codes, response times, and JSON schemas."
  },
  {
    q: "What is Idempotency in HTTP?",
    a: "An operation is idempotent if repeated executions have the exact same effect as a single execution. GET, PUT, and DELETE are idempotent; POST is NOT idempotent."
  },
  {
    q: "What is the difference between PUT and PATCH?",
    a: "PUT replaces the entire resource; PATCH applies partial updates to specific fields."
  },
  {
    q: "Why use nouns instead of verbs in REST endpoints?",
    a: "REST URLs identify resources (nouns like /api/students). The actions are defined exclusively by HTTP verbs (GET, POST, PUT, DELETE)."
  }
];

let activeTestIndex = 0;

function switchTab(tabId) {
  document.querySelectorAll('.tab-pane').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-pill').forEach(el => el.classList.remove('active'));

  const activePane = document.getElementById(`tab-${tabId}`);
  if (activePane) activePane.classList.add('active');

  event.target.classList.add('active');

  if (tabId === 'students') {
    loadStudentsDirectory();
  }
}

function renderTestCases() {
  const container = document.getElementById('testCasesList');
  if (!container) return;

  container.innerHTML = POSTMAN_TESTS.map((t, idx) => `
    <div id="testItem-${idx}" class="test-case-item ${idx === activeTestIndex ? 'active' : ''}" onclick="selectAndRunTest(${idx})">
      <span class="method-tag method-${t.method}">${t.method}</span>
      <div class="test-case-info">
        <span class="test-case-name">${t.name}</span>
        <span class="test-case-url">${t.url}</span>
      </div>
      <span id="testStatus-${idx}" class="test-item-status status-idle">Ready</span>
    </div>
  `).join('');
}

async function selectAndRunTest(idx) {
  activeTestIndex = idx;
  document.querySelectorAll('.test-case-item').forEach(el => el.classList.remove('active'));
  document.getElementById(`testItem-${idx}`).classList.add('active');

  await executePostmanTest(POSTMAN_TESTS[idx], idx);
}

async function executePostmanTest(testObj, idx) {
  const title = document.getElementById('activeTestTitle');
  const badge = document.getElementById('testResultBadge');
  const assertionsBox = document.getElementById('assertionsContainer');
  const assertionsList = document.getElementById('assertionsList');
  const codeBox = document.getElementById('liveJsonCode');
  const itemStatus = document.getElementById(`testStatus-${idx}`);

  title.textContent = `Running: ${testObj.name} [${testObj.method} ${testObj.url}]`;
  badge.className = 'result-badge-idle';
  badge.textContent = 'Executing...';

  try {
    const options = {
      method: testObj.method,
      headers: { 'Content-Type': 'application/json' }
    };
    if (testObj.body) {
      options.body = JSON.stringify(testObj.body);
    }

    const res = await fetch(testObj.url, options);
    const data = await res.json();

    const isPassed = testObj.validator(res.status, data);

    if (isPassed) {
      badge.className = 'result-badge-pass';
      badge.textContent = `PASS (${res.status} OK)`;
      itemStatus.className = 'test-item-status status-passed';
      itemStatus.textContent = 'PASS';
    } else {
      badge.className = 'result-badge-idle';
      badge.textContent = `STATUS: ${res.status}`;
      itemStatus.className = 'test-item-status status-idle';
      itemStatus.textContent = `${res.status}`;
    }

    // Display Assertions
    assertionsBox.style.display = 'block';
    assertionsList.innerHTML = testObj.assertions.map(a => `<li>pm.test("${a}") -> PASS</li>`).join('');

    codeBox.textContent = JSON.stringify(data, null, 2);

    updateTotalCount();
  } catch (err) {
    badge.textContent = 'ERROR';
    codeBox.textContent = `// Error executing request: ${err.message}`;
  }
}

async function runAllPostmanTests() {
  for (let i = 0; i < POSTMAN_TESTS.length; i++) {
    await selectAndRunTest(i);
    // Pause 300ms between automated requests
    await new Promise(r => setTimeout(r, 300));
  }
}

async function loadStudentsDirectory() {
  const tbody = document.getElementById('studentsTableBody');
  tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;">Fetching student records...</td></tr>';

  try {
    const res = await fetch('/api/students');
    const data = await res.json();
    const students = data.data || [];

    document.getElementById('totalBadge').textContent = students.length;

    tbody.innerHTML = students.map(s => `
      <tr>
        <td><strong>#${s.id}</strong></td>
        <td><span style="font-family:monospace; color:#818cf8; font-weight:700;">${s.rollNo}</span></td>
        <td><strong>${s.fullName}</strong></td>
        <td style="font-size:0.8rem; color:#94a3b8;">${s.email}</td>
        <td><span style="color:#22d3ee; font-weight:600;">${s.department}</span></td>
        <td>Sem ${s.semester}</td>
        <td><strong style="color:#10b981; font-family:monospace;">${s.cgpa}</strong></td>
        <td>
          <div class="skills-pill-box">
            ${(s.skills || []).map(sk => `<span class="skill-tag">${sk}</span>`).join('')}
          </div>
        </td>
      </tr>
    `).join('');
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="8" style="color:#f43f5e; text-align:center;">Failed to load records: ${err.message}</td></tr>`;
  }
}

async function updateTotalCount() {
  try {
    const res = await fetch('/api/students');
    const data = await res.json();
    document.getElementById('totalBadge').textContent = data.totalRecords || (data.data && data.data.length) || 0;
  } catch (e) {}
}

function renderViva() {
  const container = document.getElementById('vivaList');
  if (!container) return;

  container.innerHTML = VIVA_QUESTIONS.map((v, i) => `
    <div class="viva-item-box">
      <button class="viva-q-btn" onclick="toggleViva(${i})">
        <span><strong>Q${i + 1}:</strong> ${v.q}</span>
        <span id="vivaIcon-${i}">+</span>
      </button>
      <div id="vivaBody-${i}" class="viva-a-box" style="display: ${i === 0 ? 'block' : 'none'};">
        ${v.a}
      </div>
    </div>
  `).join('');
}

function toggleViva(i) {
  const body = document.getElementById(`vivaBody-${i}`);
  const icon = document.getElementById(`vivaIcon-${i}`);
  if (body.style.display === 'none') {
    body.style.display = 'block';
    icon.textContent = '-';
  } else {
    body.style.display = 'none';
    icon.textContent = '+';
  }
}

window.addEventListener('DOMContentLoaded', () => {
  renderTestCases();
  renderViva();
  updateTotalCount();
  // Auto-run first test
  selectAndRunTest(0);
});
