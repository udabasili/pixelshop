FROM python:latest
WORKDIR /usr/app
COPY . .
RUN apt-get update
RUN apt-get install -y libgl1-mesa-dev
RUN pip install -r requirements.txt
RUN pip install Flask
RUN pip install gunicorn
USER root 
RUN chmod 755 /usr/app/start.sh
CMD ["sh", "./start.sh"]
