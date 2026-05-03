from django.contrib.auth.models import AbstractBaseUser
from django.db import models
from django.utils import timezone

from authentication.managers.user_manager import UserManager


class User(AbstractBaseUser):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=150, blank=True, default="")
    last_name = models.CharField(max_length=150, blank=True, default="")
    profile_photo = models.CharField(max_length=100, blank=True, default="")
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
