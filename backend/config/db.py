import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

DB_SQLITE = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'config' / '.db.sqlite3',
    }
}

DB_POSTGRES = {
    'default': {
        "ENGINE": 'django.db.backends.postgresql',
        'HOST': os.environ.get('DB_HOST'),
        'NAME': os.environ.get('DB_NAME'),
        'USER': os.environ.get('DB_USER'),
        'PASSWORD': os.environ.get('DB_PASS'),
        'PORT': os.environ.get('DB_PORT')
    }
}