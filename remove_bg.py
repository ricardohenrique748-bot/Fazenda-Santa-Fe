from rembg import remove
from PIL import Image
import os

input_path = r'c:\Users\luckh\Desktop\Malut Soluções\logo\Whisk_cto5aznhvmm5mtz50im5yjytedzwqtlwkdnx0sy_000.jpg'
output_path = r'c:\Users\luckh\Desktop\Malut Soluções\frontend\src\assets\logo-precision.png'

print(f"Loading image from {input_path}")
try:
    with open(input_path, 'rb') as i:
        input_data = i.read()
        output_data = remove(input_data)
        with open(output_path, 'wb') as o:
            o.write(output_data)
    
    # Optional: Open and resize if it was too small/large
    img = Image.open(output_path)
    print(f"Original size: {img.size}")
    # If the image is small, we could upscale it using PIL (though AI upscaling is better)
    # But rembg output is usually good.
    
    print(f"Success: Background removed and saved to {output_path}")
except Exception as e:
    print(f"An error occurred: {e}")
