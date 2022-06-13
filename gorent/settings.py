from pathlib import Path
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-p_&dku$%00bqp8&*ff7ikok-3%m*qdiu*_ep*htp8cdoc)j3*6'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    "corsheaders",

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework.authtoken',
    'rest_framework',
    'contart',
    'administration',
    'parcking',
    'reservation',
    'question',
    'cars',
    'probleme',
    'reclamation',
    'bill',
    'payment',
    'records',
    'faceRecog',
    'notifications',
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",

    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000", "http://localhost:3001", "http://localhost:3002",
    "http://192.168.8.100:3000"
]

ROOT_URLCONF = 'gorent.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
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

WSGI_APPLICATION = 'gorent.wsgi.application'
ASGI_APPLICATION = 'gorent.asgi.application'

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [("127.0.0.1", 6379)],
        },
    },
}
# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'go_rent',
        'HOST': '127.0.0.1',
        'PORT': 3306,
        'USER': 'root',
        'PASSWORD': 'admin',
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

STATIC_URL = 'static/'

# for PDFs and images
MEDIA_URL = 'Documents/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'Documents')

# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
# AUTH_USER_MODEL = 'administration.costumUser'
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',

    ]
}

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
# SOHIEB APIs KEY
# if DEBUG:
#     STRIPE_PUBLISHABLE_KEY = 'pk_test_51Kyi4SD90I7r8evScHRaIw0PTF2YPNPKnFu5l2M6UgxleyjmfJS5txGSrZzlgH6xn4GbQsWpcvZzpCn3DP9FuVAJ00hxT3bxwy'
#     STRIPE_SECRET_KEY = 'sk_test_51Kyi4SD90I7r8evSXHPxXYEalAqVhqatBLQj0Bgw52lJTIaFCL3uaX8pszDLMBE82PtVpuUCEJmCPMODvtYOkhhS00qFbefJtJ'
# GoRent APIs KEY
# email=gorent2022pfe@gmail.com password=nhtrgb3570
if DEBUG:
    STRIPE_PUBLISHABLE_KEY = 'pk_test_51L4GmXH0mDiv5izs9R5HetS6n358XhnEuD82g3yMlCyUVC73YdOOqZkxzG3jzPEaXC4doZQwiIAb4sKZHNp2T9wY00o3iQQmQJ'
    STRIPE_SECRET_KEY = 'sk_test_51L4GmXH0mDiv5izscDDzM4Ccr3fwhZL5B5xH9gR1onBWcMNuwqnO9BsKJJqe8wYd5gI2ucA41v6aYisEDKCCwpid00ZuGcSblt'

# else:
#     STRIPE_PUBLISHABLE_KEY = 'production_publishable_key'
#     STRIPE_SECRET_KEY = 'production_secret_key'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'Gorent2022pfe@gmail.com'
EMAIL_HOST_PASSWORD = 'qenuvprhpcnndngr'
EMAIL_PORT = 587
EMAIL_USE_TLS = True