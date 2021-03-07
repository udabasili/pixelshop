FROM python:latest
WORKDIR /usr/app
COPY . .
RUN apt-get update
RUN apt-get install -y libgl1-mesa-dev
RUN pip install -r requirements.txt
RUN pip install Flask
RUN pip install gunicorn
CMD ["gunicorn"  , "-b", "0.0.0.0:8000", '-w', '2' , "pixelshop:app"]
