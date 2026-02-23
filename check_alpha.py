from PIL import Image
import numpy as np

img_path = r'c:\Users\luckh\Desktop\Malut Soluções\frontend\src\assets\logo-precision.png'
img = Image.open(img_path)

if img.mode == 'RGBA':
    data = np.array(img)
    alpha = data[:,:,3]
    print(f"Image has alpha channel. Transparent pixels: {np.sum(alpha < 255)}")
    print(f"Total pixels: {alpha.size}")
else:
    print(f"Image has no alpha channel. Mode: {img.mode}")
