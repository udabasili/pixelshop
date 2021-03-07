from flask import render_template, Blueprint, request, jsonify
from PIL import Image, ImageEnhance, ImageFilter
import sys
import os
import numpy as np
from io import BytesIO
import base64

home_route = Blueprint("home_route", __name__, template_folder='templates')


@home_route.route('/', methods=['GET'])
def home():
    return render_template("index.html")
