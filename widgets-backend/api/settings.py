import os


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-#pgmhcswy%#gmdc%#^sj9h3tg$2)17ciqy=$f#tvbyt3&vgb@f'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["*"]

PROJECT_PATH = os.path.abspath(os.path.dirname(__name__))
DATA_DIR = os.path.join(PROJECT_PATH, "data")

# Application definition

INSTALLED_APPS = [
    'rest_framework',
    'corsheaders',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'api'
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'api.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'api.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': '/dev/shm/db.sqlite3',  # Throw dev db away when we stop the container
    }
}

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # TODO: Load from environment variable
]


DEFAULT_AUTO_FIELD = 'django.db.models.AutoField'

# Django Rest Framework
REST_FRAMEWORK = {
    # TODO: Handle pagination
    # 'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    # 'PAGE_SIZE': int(os.getenv('DJANGO_PAGINATION_LIMIT', 24)),
}
