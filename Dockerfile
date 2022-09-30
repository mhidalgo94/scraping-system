FROM python:3.7-alpine

ENV PYTHONUNBUFFERED 1
RUN mkdir /app-django
COPY ./backend/requirements.txt /app-django/requirements.txt

RUN apk add --update --no-cache postgresql-client jpeg-dev

RUN apk add --update --no-cache --virtual .tmp-build-deps \ 
    gcc libc-dev linux-headers postgresql-dev musl-dev zlib zlib-dev
    
RUN pip install -r /app-django/requirements.txt

RUN apk del .tmp-build-deps

COPY ./backend/ /app-django
WORKDIR /app-django


CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]