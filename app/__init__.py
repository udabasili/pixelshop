from flask import Flask
from config import Config

def create_app():
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object((Config))
    
    with app.app_context():
        from .routes.edit import edit_route  
        from .routes.home import home_route 
        from .routes.effect import effect_route

        app.register_blueprint(edit_route)
        app.register_blueprint(home_route)
        app.register_blueprint(effect_route)


        return app
