const express = require('express');
const multer = require('multer');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from public
app.use(express.static(path.join(__dirname, 'public')));

// Storage for HTML uploads
const uploadDir = path.join(__dirname, 'public');
const storage = multer.diskStorage({
  destination: function (_req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (_req, file, cb) {
    // Keep original name; ensure .html extension
    const originalName = file.originalname;
    const base = path.basename(originalName, path.extname(originalName));
    cb(null, base + '.html');
  },
});

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    const isHtml = /html?$/.test(path.extname(file.originalname).toLowerCase());
    if (!isHtml) return cb(new Error('Only .html files are allowed'));
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// Simple API for uploading HTML files
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  return res.json({ ok: true, filename: req.file.filename });
});

// Admin upload page
app.get('/admin/upload', (_req, res) => {
  const page = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>2-C Destiny Admin Upload</title>
    <style>
      body { font-family: system-ui, Arial, sans-serif; padding: 2rem; max-width: 800px; margin: 0 auto; }
      .card { border: 1px solid #e5e7eb; border-radius: 12px; padding: 1.5rem; box-shadow: 0 6px 20px rgba(0,0,0,0.06); }
      h1 { margin-top: 0; }
      input[type=file] { display: block; margin: 1rem 0; }
      button { background: #1f2937; color: white; border: none; padding: .6rem 1rem; border-radius: 8px; cursor: pointer; }
      button:disabled { opacity: .6; cursor: not-allowed; }
      .status { margin-top: 1rem; font-size: .95rem; }
      a { color: #2563eb; text-decoration: none; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>Upload HTML file</h1>
      <form id="uploadForm">
        <input type="file" name="file" accept=".html,.htm" required />
        <button type="submit">Upload</button>
      </form>
      <div class="status" id="status"></div>
      <p>Uploaded files are served from <code>/</code>. For example: <code>/about.html</code>.</p>
    </div>

    <script>
      const form = document.getElementById('uploadForm');
      const statusEl = document.getElementById('status');
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        statusEl.textContent = 'Uploading...';
        const fd = new FormData(form);
        try {
          const res = await fetch('/api/upload', { method: 'POST', body: fd });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Upload failed');
          statusEl.innerHTML = `Uploaded: <a href="/${data.filename}" target="_blank">/${data.filename}</a>`;
        } catch (err) {
          statusEl.textContent = err.message;
        }
      });
    </script>
  </body>
  </html>`;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(page);
});

// Fallback route to index.html if present
app.get('*', (req, res, next) => {
  const indexPath = path.join(__dirname, 'public', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    next();
  }
});

app.listen(PORT, () => {
  console.log(`2-C Destiny server running on http://localhost:${PORT}`);
});
