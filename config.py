import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    FLASK_APP = os.environ.get("FLASK_APP")
    FLASK_ENV = os.environ.get("FLASK_ENV")

