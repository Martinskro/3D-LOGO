from PIL import Image
from rembg import remove

def remove_background(image_path, output_path):
    """Remove background from an image using rembg and save the result."""
    image = Image.open(image_path)
    bg_removed_image = remove(image)
    bg_removed_image.save(output_path)
    print(f"Background removed image saved as {output_path}")

# Main script execution
input_path = '3D-Logo-Spinner/testlogo.jpg'  # Replace with your input image path
output_path = 'test_no_bg.png'  # Replace with desired output path

# Remove the background and save the result
remove_background(input_path, output_path)
