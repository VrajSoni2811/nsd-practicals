// Practical 08: Express Middleware Pipeline Client Script

const API_BASE = '/api';

// Pipeline Nodes
const nodes = {
  request: document.getElementById('node-request'),
  logger: document.getElementById('node-logger'),
  limiter: document.getElementById('node-limiter'),
  parser: document.getElementById('node-parser'),
  auth: document.getElementById('node-auth'),
  validator: document.getElementById('node-validator'),
  handler: document.getElementById('node-handler'),
  error: document.getElementById('node-error')
};

const traceList = document.getElementById('trace-list');
const jsonViewer = document.getElementById('json-viewer');
const responseCodePill = document.getElementById('response-code-pill');
const latencyPill = document.getElementById('latency-pill');
const resetLimitBtn = document.getElementById('reset-limit-btn');

function resetPipelineVisuals() {
  Object.values(nodes).forEach(n => {
    n.classList.remove('active-step', 'active-error');
  });
}

function highlightNodes(activeKeys, isError = false) {
  resetPipelineVisuals();
  activeKeys.forEach((key, idx) => {
    setTimeout(() => {
      if (nodes[key]) {
        nodes[key].classList.add(isError && key === 'error' ? 'active-error' : 'active-step');
      }
    }, idx * 120);
  });
}

function renderTrace(traceArray) {
  if (!traceArray || traceArray.length === 0) {
    traceList.innerHTML = `<div class="empty-trace">No lifecycle steps captured.</div>`;
    return;
  }

  traceList.innerHTML = traceArray.map((step, idx) => `
    <div class="trace-step-item">
      <span class="step-num">#${idx + 1}</span>
      <div class="step-content">
        <span class="step-name">${step.middleware}</span>
        <span class="step-detail">${step.detail || ''}</span>
      </div>
    </div>
  `).join('');
}

function updateResponse(status, latencyMs, payload) {
  responseCodePill.textContent = `HTTP ${status}`;
  if (status >= 200 && status < 300) {
    responseCodePill.style.background = 'rgba(16, 185, 129, 0.2)';
    responseCodePill.style.color = '#34d399';
  } else if (status === 429) {
    responseCodePill.style.background = 'rgba(245, 158, 11, 0.2)';
    responseCodePill.style.color = '#fbbf24';
  } else {
    responseCodePill.style.background = 'rgba(244, 63, 94, 0.2)';
    responseCodePill.style.color = '#f87171';
  }

  latencyPill.textContent = `${latencyMs} ms`;
  jsonViewer.textContent = JSON.stringify(payload, null, 2);
}

// Test Runner
async function runTest(testType) {
  resetPipelineVisuals();
  const start = performance.now();

  try {
    let res, data;

    if (testType === 'public') {
      highlightNodes(['request', 'logger', 'limiter', 'handler']);
      res = await fetch(`${API_BASE}/public/status`);
      data = await res.json();
    } 
    else if (testType === 'auth-missing') {
      highlightNodes(['request', 'logger', 'limiter', 'auth', 'error'], true);
      res = await fetch(`${API_BASE}/protected/profile`);
      data = await res.json();
    } 
    else if (testType === 'auth-valid') {
      highlightNodes(['request', 'logger', 'limiter', 'auth', 'handler']);
      res = await fetch(`${API_BASE}/protected/profile`, {
        headers: { 'x-api-key': 'secret-token-2026' }
      });
      data = await res.json();
    } 
    else if (testType === 'rate-limit') {
      highlightNodes(['request', 'logger', 'limiter', 'error'], true);
      // Spam 15 requests sequentially to trigger 429
      let lastRes, lastData;
      for (let i = 0; i < 15; i++) {
        lastRes = await fetch(`${API_BASE}/public/status`);
        lastData = await lastRes.json();
      }
      res = lastRes;
      data = lastData;
    } 
    else if (testType === 'validation-fail') {
      highlightNodes(['request', 'logger', 'limiter', 'parser', 'auth', 'validator', 'error'], true);
      res = await fetch(`${API_BASE}/protected/transfer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'secret-token-2026'
        },
        body: JSON.stringify({
          recipient: 'Bob', // too short (< 3)
          amount: -500,     // invalid <= 0
          purpose: ''       // empty
        })
      });
      data = await res.json();
    } 
    else if (testType === 'server-error') {
      highlightNodes(['request', 'logger', 'limiter', 'handler', 'error'], true);
      res = await fetch(`${API_BASE}/test/error`);
      data = await res.json();
    }

    const duration = Math.round(performance.now() - start);
    updateResponse(res.status, duration, data);
    renderTrace(data.middlewareLifecycleTrace);

  } catch (err) {
    const duration = Math.round(performance.now() - start);
    updateResponse(0, duration, { error: err.message });
  }
}

// Reset Rate Limiter
resetLimitBtn.addEventListener('click', async () => {
  try {
    const res = await fetch(`${API_BASE}/admin/reset-limits`, { method: 'POST' });
    const data = await res.json();
    alert(data.message || 'Rate limit reset successfully.');
  } catch (err) {
    alert(`Reset failed: ${err.message}`);
  }
});

// Attach button listeners
document.querySelectorAll('.run-test-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const testType = btn.getAttribute('data-test');
    runTest(testType);
  });
});
