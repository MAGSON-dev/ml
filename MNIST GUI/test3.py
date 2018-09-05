import sys
if sys.version_info[0] < 3:
    import Tkinter as tk
else:
    import tkinter as tk
from PIL import Image, ImageTk


import matplotlib
matplotlib.use('TkAgg')
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
from matplotlib import pylab as plt

data = mnist.train.images[1].reshape(28,28)

root = tk.Tk()
root.wm_title("minimal example")

root.image = data
fig = plt.figure(figsize=(5, 4))
im = plt.imshow(root.image, cmap='gray_r')
plt.axis('off')

canvas = FigureCanvasTkAgg(fig, master=root)
canvas.show()
canvas.get_tk_widget().pack(side=tk.TOP, fill=tk.BOTH, expand=1)

tk.mainloop()
