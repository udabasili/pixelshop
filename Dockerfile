FROM python:latest
WORKDIR /usr/app
RUN useradd myapp
USER myapp
COPY . .
RUN apt-get update
RUN apt-get install -y libgl1-mesa-dev
RUN pip install -r requirements.txt
CMD ["gunicorn"  , "-b", "0.0.0.0:8000", '-w', '2' , "pixelshop:app"]
