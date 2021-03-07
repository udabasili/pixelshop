from flask import render_template, Blueprint, request, jsonify
from PIL import Image, ImageEnhance, ImageFilter, ImageChops
import numpy as np
from io import BytesIO
import base64
import cv2


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
    res = cv2.stylization(img, sigma_s=60, sigma_r=0.6)
    res = base64.b64encode(cv2.imencode('.jpg', res)[1])
    return jsonify({"res": str(res)})


@effect_route.route('/effect/cartoon', methods=['POST'])
def cartoon():
    response = request.json['response'].split(',')[1]
    nparray = np.fromstring(base64.b64decode(response), np.uint8)
    img = cv2.imdecode(nparray, cv2.IMREAD_COLOR)
    res = cv2.stylization(img, sigma_s=150, sigma_r=0.25)
    res = base64.b64encode(cv2.imencode('.jpg', res)[1])
    return jsonify({"res": str(res)})


@effect_route.route('/effect/grainy', methods=['POST'])
def grainy():
    response = request.json['response'].split(',')[1]
    nparray = np.fromstring(base64.b64decode(response), np.uint8)
    img = cv2.imdecode(nparray, cv2.IMREAD_COLOR)
    res = cv2.cvtColor(img, cv2.COLOR_BGRA2BGR)
    res = base64.b64encode(cv2.imencode('.jpg', res)[1])
    return jsonify({"res": str(res)})

