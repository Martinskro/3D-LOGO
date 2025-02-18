from flask import Flask, request, jsonify, send_from_directory
from rembg import remove
from PIL import Image
import os

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
PROCESSED_FOLDER = 'processed'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['PROCESSED_FOLDER'] = PROCESSED_FOLDER

# Ensure the folders exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'success': False, 'error': 'No file uploaded'}), 400
    
    file = request.files['file']
    filename = file.filename
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    
    # Save the uploaded file
    file.save(file_path)

    # Process the image using rembg
    image = Image.open(file_path)
    bg_removed_image = remove(image)

    # Choose output format based on whether the image has transparency
    if bg_removed_image.mode == 'RGBA':
        # Save as PNG to preserve transparency
        processed_filename = f'processed_{filename.rsplit(".", 1)[0]}.png'
        processed_path = os.path.join(app.config['PROCESSED_FOLDER'], processed_filename)
        bg_removed_image.save(processed_path, format='PNG')
    else:
        # Convert to RGB and save as JPEG if no transparency is needed
        bg_removed_image = bg_removed_image.convert('RGB')
        processed_filename = f'processed_{filename.rsplit(".", 1)[0]}.jpg'
        processed_path = os.path.join(app.config['PROCESSED_FOLDER'], processed_filename)
        bg_removed_image.save(processed_path, format='JPEG')

    # Return the path to the processed image
    return jsonify({'success': True, 'imagePath': f'/processed/{processed_filename}'})

@app.route('/processed/<filename>')
def serve_processed_image(filename):
    return send_from_directory(app.config['PROCESSED_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True)
