from flask import render_template, Blueprint, request, jsonify
from PIL import Image, ImageEnhance, ImageFilter, ImageChops
import sys
import os
import numpy as np
from io import BytesIO
import base64
import cv2
from ..data import temperature_chart


edit_route = Blueprint("edit_route", __name__, template_folder='templates')

@edit_route.route('/resize', methods=['POST'])
def resize():
    response = request.json['response'].split(',')[1]
    measurement = request.json['measurement']
    width = measurement['widthValue']
    height = measurement['heightValue']
    nparray = np.fromstring(base64.b64decode(response), np.uint8)
    img = cv2.imdecode(nparray, cv2.IMREAD_COLOR)
    response = cv2.resize(img, (int(width), int(height)))
    res = base64.b64encode(cv2.imencode('.jpg', response)[1])
    return jsonify({"res": str(res)})


@edit_route.route('/others/brightness', methods=['POST'])
def brightness():
    response = request.json['response']
    factorial = request.json['factorial']
    basedir = base64.b64decode(response)
    basedir = BytesIO(basedir)
    im = Image.open(basedir)
    factor = factorial
    enhancer = ImageEnhance.Brightness(im)
    im_output = enhancer.enhance(factor)
    buffered = BytesIO()
    rgb_im = im_output.convert('RGB')
    rgb_im.save(buffered, format="JPEG")
    res = base64.b64encode(buffered.getvalue())
    return jsonify({"res": str(res)})


@edit_route.route('/others/contrast', methods=['POST'])
def contrast():
    response = request.json['response']
    factorial = request.json['factorial']
    basedir = base64.b64decode(response)
    basedir = BytesIO(basedir)
    im = Image.open(basedir)
    factor = factorial
    enhancer = ImageEnhance.Contrast(im)
    im_output = enhancer.enhance(factor)
    buffered = BytesIO()
    rgb_im = im_output.convert('RGB')
    rgb_im.save(buffered, format="JPEG")
    res = base64.b64encode(buffered.getvalue())
    return jsonify({"res": str(res)})


@edit_route.route('/others/sharpness', methods=['POST'])
def sharpness():
    response = request.json['response']
    factorial = request.json['factorial']
    basedir = base64.b64decode(response)
    basedir = BytesIO(basedir)
    im = Image.open(basedir)
    factor = factorial
    enhancer = ImageEnhance.Sharpness(im)
    im_output = enhancer.enhance(factor)
    buffered = BytesIO()
    rgb_im = im_output.convert('RGB')
    rgb_im.save(buffered, format="JPEG")
    res = base64.b64encode(buffered.getvalue())
    return jsonify({"res": str(res)})


@edit_route.route('/color/saturation', methods=['POST'])
def saturation():
    response = request.json['response']
    factorial = request.json['factorial']
    basedir = base64.b64decode(response)
    basedir = BytesIO(basedir)
    im = Image.open(basedir)
    data = np.array(im)
    let = data[:1, :1, :]
    factor = factorial
    enhancer = ImageEnhance.Color(im)
    im_output = enhancer.enhance(factor)
    buffered = BytesIO()
    rgb_im = im_output.convert('RGB')
    rgb_im.save(buffered, format="JPEG")
    res = base64.b64encode(buffered.getvalue())
    return jsonify({"res": str(res)})


@edit_route.route('/color/temperature', methods=['POST'])
def temperature():
    response = request.json['response']
    factorial = request.json['factorial']
    basedir = base64.b64decode(response)
    basedir = BytesIO(basedir)
    im = Image.open(basedir)
    im = im.convert('RGB')

    mode = im.mode
    red, blue, green = temperature_chart[factorial]  
    matrix = (red / 255, 0, 0, 0, 0, 
              green / 255, 0, 0, 0, 0, 
              blue / 255, 0, )
    im = im.convert('RGB',matrix=matrix)
    buffered = BytesIO()
    im.save(buffered, format="JPEG")
    res = base64.b64encode(buffered.getvalue())
    return jsonify({"res": str(res)})
