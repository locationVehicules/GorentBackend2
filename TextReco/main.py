import pytesseract
import cv2

pytesseract.pytesseract.tesseract_cmd = "C:\\Program Files\\Tesseract-OCR\\tesseract.exe"
def getInfoFromImg ():
    img = cv2.imread("img\permetkA.jpg")
    img = cv2.resize(img, (960, 540))
    imgrgb = cv2.cvtColor(img , cv2.COLOR_BGR2RGB)
    data = []
    results = pytesseract.image_to_data(imgrgb)
    for id, line in enumerate(results.splitlines()):
        if id != 0:
            line = line.split()
            if len(line) == 12:
                if (line[11]!= ""):
                    data.append(line[11])
    return data

print (detInfoFromImg()); 
# detInfoFromImg(); 
