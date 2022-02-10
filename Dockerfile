FROM python:latest
WORKDIR /usr/app
COPY . .
# RUN apt-get update
RUN apt-get install -y libgl1-mesa-dev
RUN pip install --upgrade pip
RUN pip3 install opencv-python
RUN pip3 install -r requirements.txt
RUN pip3 install Flask
RUN pip3 install gunicorn
USER root 
RUN chmod 755 /usr/app/start.sh
ENTRYPOINT /usr/app/start.sh