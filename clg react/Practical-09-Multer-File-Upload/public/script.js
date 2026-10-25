// Practical 09: Multer File Upload & MongoDB Storage Script

const API_BASE = '/api/files';

// DOM Elements
const statTotalFiles = document.getElementById('stat-total-files');
const statTotalSize = document.getElementById('stat-total-size');
const pillsContainer = document.getElementById('pills-container');

const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('file-input');
const filePreviewStrip = document.getElementById('file-preview-strip');
const selectedFilename = document.getElementById('selected-filename');
const selectedFilesize = document.getElementById('selected-filesize');

const uploadForm = document.getElementById('upload-form');
const fileCategory = document.getElementById('file-category');
const fileUploader = document.getElementById('file-uploader');
const fileDescription = document.getElementById('file-description');
const submitUploadBtn = document.getElementById('submit-upload-btn');

const filesGrid = document.getElementById('files-grid');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const refreshFilesBtn = document.getElementById('refresh-files-btn');

const responseStatusBadge = document.getElementById('response-status-badge');
const responseLatencyBadge = document.getElementById('response-latency-badge');
const jsonViewer = document.getElementById('json-viewer');

let currentSelectedFile = null;

// Helpers
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function inspectResponse(status, latencyMs, payload) {
  responseStatusBadge.textContent = `STATUS: ${status}`;
  responseStatusBadge.style.background = status >= 200 && status < 300 
    ? 'rgba(16, 185, 129, 0.2)' 
    : 'rgba(244, 63, 94, 0.2)';
  responseStatusBadge.style.color = status >= 200 && status < 300 ? '#34d399' : '#f87171';
  responseLatencyBadge.textContent = `${latencyMs} ms`;
  jsonViewer.textContent = JSON.stringify(payload, null, 2);
}

function getFileIcon(mimetype) {
  if (mimetype.startsWith('image/')) return '🖼️';
  if (mimetype.includes('pdf')) return '📕';
  if (mimetype.includes('word') || mimetype.includes('document')) return '📘';
  if (mimetype.includes('text') || mimetype.includes('json')) return '📄';
  return '📁';
}

// 1. Fetch Storage Statistics
async function fetchStorageStats() {
  try {
    const res = await fetch(`${API_BASE}/stats/storage`);
    const result = await res.json();
    if (result.success) {
      statTotalFiles.textContent = result.data.totalFiles;
      statTotalSize.textContent = result.data.formattedTotalSize;

      const breakdown = result.data.categoryBreakdown;
      if (Object.keys(breakdown).length > 0) {
        pillsContainer.innerHTML = Object.entries(breakdown).map(([cat, count]) => `
          <span class="cat-chip">${cat}: <strong>${count}</strong></span>
        `).join('');
      } else {
        pillsContainer.innerHTML = '<span class="subtext">No files registered yet.</span>';
      }
    }
  } catch (err) {
    console.error('Storage stats error:', err);
  }
}

// 2. Fetch Files List
async function fetchFiles() {
  const search = searchInput.value.trim();
  const cat = categoryFilter.value;

  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (cat !== 'All') params.append('category', cat);

  const start = performance.now();
  try {
    const res = await fetch(`${API_BASE}?${params.toString()}`);
    const result = await res.json();
    const duration = Math.round(performance.now() - start);

    inspectResponse(res.status, duration, result);

    if (result.success && result.data.length > 0) {
      filesGrid.innerHTML = result.data.map(f => {
        const isImage = f.mimetype.startsWith('image/');
        const formatted = f.formattedSize || formatBytes(f.size);
        const previewUrl = `/${f.path}`;

        return `
          <div class="file-card">
            <div class="file-card-header">
              <div class="file-type-icon">${getFileIcon(f.mimetype)}</div>
              <div class="file-info">
                <div class="file-title" title="${f.originalName}">${f.originalName}</div>
                <div class="file-meta-sub">
                  <span>${formatted}</span>
                  <span>•</span>
                  <span>${f.category}</span>
                </div>
              </div>
            </div>

            ${isImage ? `<img src="${previewUrl}" alt="${f.originalName}" class="file-img-preview" onerror="this.style.display='none'">` : ''}

            <p class="file-desc-text">${f.description || 'No description provided.'}</p>

            <div class="file-actions-row">
              <a href="${API_BASE}/${f._id}/download" class="btn-download" download>Download</a>
              <button class="btn-delete" onclick="handleDelete('${f._id}', '${f.originalName}')">Delete</button>
            </div>
          </div>
        `;
      }).join('');
    } else {
      filesGrid.innerHTML = `
        <div class="loading-state">No matching file records found in MongoDB storage.</div>
      `;
    }
  } catch (err) {
    filesGrid.innerHTML = `
      <div class="loading-state" style="color: #f87171;">Failed to load files: ${err.message}</div>
    `;
  }
}

// 3. Delete File Record
window.handleDelete = async function(id, name) {
  if (!confirm(`Delete file "${name}" from server disk and MongoDB database?`)) return;

  const start = performance.now();
  try {
    const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    const result = await res.json();
    const duration = Math.round(performance.now() - start);

    inspectResponse(res.status, duration, result);

    if (result.success) {
      fetchFiles();
      fetchStorageStats();
    } else {
      alert(`Delete Error: ${result.message}`);
    }
  } catch (err) {
    alert(`Request Failed: ${err.message}`);
  }
};

// 4. File Selection & Drag-and-Drop Handling
function handleFileSelect(file) {
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    alert(`File "${file.name}" exceeds the 5 MB limit (${formatBytes(file.size)}).`);
    return;
  }

  currentSelectedFile = file;
  selectedFilename.textContent = file.name;
  selectedFilesize.textContent = formatBytes(file.size);
  filePreviewStrip.classList.remove('hidden');
  submitUploadBtn.disabled = false;
}

dropzone.addEventListener('click', (e) => {
  if (e.target !== fileInput) {
    fileInput.click();
  }
});

fileInput.addEventListener('change', () => {
  if (fileInput.files.length > 0) {
    handleFileSelect(fileInput.files[0]);
  }
});

dropzone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropzone.classList.add('dragover');
});

dropzone.addEventListener('dragleave', () => {
  dropzone.classList.remove('dragover');
});

dropzone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropzone.classList.remove('dragover');
  if (e.dataTransfer.files.length > 0) {
    handleFileSelect(e.dataTransfer.files[0]);
  }
});

// 5. Submit Upload Form
uploadForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!currentSelectedFile) return;

  const formData = new FormData();
  formData.append('file', currentSelectedFile);
  formData.append('category', fileCategory.value);
  formData.append('uploader', fileUploader.value.trim());
  formData.append('description', fileDescription.value.trim());

  submitUploadBtn.disabled = true;
  submitUploadBtn.textContent = 'Uploading to Multer Pipeline...';

  const start = performance.now();
  try {
    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      body: formData
    });
    const result = await res.json();
    const duration = Math.round(performance.now() - start);

    inspectResponse(res.status, duration, result);

    if (result.success) {
      currentSelectedFile = null;
      fileInput.value = '';
      fileDescription.value = '';
      filePreviewStrip.classList.add('hidden');
      fetchFiles();
      fetchStorageStats();
    } else {
      alert(`Upload Error: ${result.message}`);
    }
  } catch (err) {
    alert(`Upload Request Failed: ${err.message}`);
  } finally {
    submitUploadBtn.textContent = 'Upload to Server & Register in MongoDB';
    submitUploadBtn.disabled = !currentSelectedFile;
  }
});

// Search & Filter Events
let debounceTimer;
searchInput.addEventListener('input', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(fetchFiles, 300);
});

categoryFilter.addEventListener('change', fetchFiles);
refreshFilesBtn.addEventListener('click', () => {
  fetchFiles();
  fetchStorageStats();
});

// Init
fetchStorageStats();
fetchFiles();
