import os
import zipfile
from flask import Flask, send_from_directory, request, redirect, url_for, render_template, flash, abort
from werkzeug.utils import secure_filename

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
PUBLIC_DIR = os.path.join(BASE_DIR, 'public')
UPLOAD_DIR = os.path.join(BASE_DIR, 'uploads')

ALLOWED_HTML_EXTENSIONS = {'.html', '.htm'}
ALLOWED_ARCHIVES = {'.zip'}

app = Flask(__name__)
app.secret_key = os.environ.get('FLASK_SECRET_KEY', 'dev-secret')

os.makedirs(PUBLIC_DIR, exist_ok=True)
os.makedirs(UPLOAD_DIR, exist_ok=True)


def is_allowed_html(filename: str) -> bool:
    _, ext = os.path.splitext(filename.lower())
    return ext in ALLOWED_HTML_EXTENSIONS


def is_allowed_archive(filename: str) -> bool:
    _, ext = os.path.splitext(filename.lower())
    return ext in ALLOWED_ARCHIVES


@app.get('/')
def root_index():
    # Serve index.html if present; else list files
    index_path = os.path.join(PUBLIC_DIR, 'index.html')
    if os.path.exists(index_path):
        return send_from_directory(PUBLIC_DIR, 'index.html')
    files = sorted([f for f in os.listdir(PUBLIC_DIR)])
    return render_template('listing.html', files=files)


@app.get('/<path:requested_path>')
def serve_public(requested_path: str):
    # Serve files and subpaths under public/ safely
    normalized_path = os.path.normpath(requested_path).lstrip(os.sep)
    if normalized_path.startswith('..') or os.path.isabs(requested_path):
        abort(404)
    return send_from_directory(PUBLIC_DIR, normalized_path)


@app.route('/admin/upload', methods=['GET', 'POST'])
def upload_page():
    if request.method == 'GET':
        return render_template('upload.html')

    # POST
    if 'file' not in request.files:
        flash('No file part in request')
        return redirect(request.url)

    file = request.files['file']
    if file.filename == '':
        flash('No selected file')
        return redirect(request.url)

    filename = secure_filename(file.filename)
    file_ext = os.path.splitext(filename)[1].lower()

    if is_allowed_html(filename):
        dest_path = os.path.join(PUBLIC_DIR, filename)
        file.save(dest_path)
        flash(f'Uploaded {filename} to site root')
        return redirect(url_for('upload_page'))

    if is_allowed_archive(filename):
        zip_path = os.path.join(UPLOAD_DIR, filename)
        file.save(zip_path)
        try:
            with zipfile.ZipFile(zip_path, 'r') as zf:
                zf.extractall(PUBLIC_DIR)
            flash(f'Extracted {filename} into site')
        except zipfile.BadZipFile:
            flash('Invalid ZIP archive')
        finally:
            try:
                os.remove(zip_path)
            except OSError:
                pass
        return redirect(url_for('upload_page'))

    flash('Unsupported file type. Upload .html, .htm, or .zip')
    return redirect(request.url)


if __name__ == '__main__':
    port = int(os.environ.get('PORT', '8080'))
    app.run(host='0.0.0.0', port=port, debug=True)
