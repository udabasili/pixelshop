from flask import render_template, Blueprint, request, jsonify
from PIL import Image, ImageEnhance, ImageFilter, ImageChops
import numpy as np
from io import BytesIO
import base64
import cv2
from scipy.interpolate import UnivariateSpline

effect_route = Blueprint("effect_route", __name__, template_folder='templates')

@effect_route.route('/effect/b-w', methods=['POST'])
def blackWhiteEffect():
    threshold = 128
    response = request.json['response'].split(',')[1]
    nparray = np.fromstring(base64.b64decode(response), np.uint8)
    img = cv2.imdecode(nparray, cv2.IMREAD_COLOR)
    greyImage = cv2.cvtColor(img,  cv2.COLOR_BGR2GRAY)
    img_binary = cv2.threshold(greyImage, threshold, 255, cv2.THRESH_BINARY)[1]
    res = base64.b64encode(cv2.imencode('.jpg', img_binary)[1])
    return jsonify({"res": str(res)})


@effect_route.route('/effect/oil', methods=['POST'])
def oilEffect():
    threshold = 128
    response = request.json['response'].split(',')[1]
    nparray = np.fromstring(base64.b64decode(response), np.uint8)
    img = cv2.imdecode(nparray, cv2.IMREAD_COLOR)
    response = cv2.xphoto.oilPainting(img, 8, 2)
    res = base64.b64encode(cv2.imencode('.jpg', response)[1])
    return jsonify({"res": str(res)})


@effect_route.route('/effect/water-color', methods=['POST'])
def waterColor():
    response = request.json['response'].split(',')[1]
    nparray = np.fromstring(base64.b64decode(response), np.uint8)
    img = cv2.imdecode(nparray, cv2.IMREAD_COLOR)
    res = cv2.stylization(img, sigma_s=2, sigma_r=0.2)
    res = base64.b64encode(cv2.imencode('.jpg', res)[1])
    return jsonify({"res": str(res)})


@effect_route.route('/effect/sepia', methods=['POST'])
def sepia():
    response = request.json['response'].split(',')[1]
    imgdata = base64.b64decode(response)
    npimg = np.fromstring(imgdata, dtype=np.uint8);
    img = cv2.imdecode(npimg, 1)
    kernel = np.array([[0.272, 0.534, 0.131],
                       [0.349, 0.686, 0.168],
                       [0.393, 0.769, 0.189]])
    res = cv2.filter2D(img, -1, kernel)
    res = base64.b64encode(cv2.imencode('.jpg', res)[1])
    return jsonify({"res": str(res)})

@effect_route.route('/effect/emboss', methods=['POST'])
def emboss():
    response = request.json['response'].split(',')[1]
    basedir = base64.b64decode(response)
    basedir = BytesIO(basedir)
    im = Image.open(basedir)
    im_output = im.filter(ImageFilter.EMBOSS)
    buffered = BytesIO()
    rgb_im = im_output.convert('RGB')
    rgb_im.save(buffered, format="JPEG")
    res = base64.b64encode(buffered.getvalue())
    return jsonify({"res": str(res)})


@effect_route.route('/effect/warm', methods=['POST'])
def warm():
    response = request.json['response'].split(',')[1]
    imgdata = base64.b64decode(response)
    npimg = np.fromstring(imgdata, dtype=np.uint8)
    img = cv2.imdecode(npimg, 1)
    topTable = UnivariateSpline([0, 64, 128, 256], [0, 80, 160, 256])
    topTable = topTable(range(256))
    bottomTable = UnivariateSpline([0, 64, 128, 256], [0, 80, 160, 256])
    bottomTable = bottomTable(range(256))
    red_channel, green_channel, blue_channel = cv2.split(img)
    red_channel = cv2.LUT(red_channel, topTable).astype(np.uint8)
    blue_channel = cv2.LUT(blue_channel, bottomTable).astype(np.uint8)
    res = cv2.merge((red_channel, green_channel, blue_channel))
    res = base64.b64encode(cv2.imencode('.jpg', res)[1])
    return jsonify({"res": str(res)})

# @effect_route.route('/effect/water-color', methods=['POST'])
# def grainy():
#     response = request.json['response'].split(',')[1]
#     imgdata = base64.b64decode(response)
#     img = Image.open(BytesIO(imgdata))
#     img = Image.new('RGB', img.size)
#     for x in range(img.size[0]):
#         for y in range(img.size[1]):
#             r, g, b = img.getpixel((x, y))
#             red = int(r * 0.393 + g * 0.769 + b * 0.189)
#             green = int(r * 0.349 + g * 0.686 + b * 0.168)
#             blue = int(r * 0.272 + g * 0.534 + b * 0.131)
#             img.putpixel((x, y), (red, green, blue))
#     buffered = BytesIO()
#     img.save(buffered, format='JPEG')
#     res = base64.b64encode(buffered.getvalue())
#     return jsonify({"res": str(res)})

