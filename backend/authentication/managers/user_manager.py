from django.contrib.auth.models import BaseUserManager


class UserManager(BaseUserManager):
    @classmethod
    def normalize_email(cls, email: str) -> str:
        return super().normalize_email(email.strip()).lower()

    def create_user(self, email: str, password: str | None = None, **extra_fields):
        email = self.normalize_email(email)

        if not email:
            raise ValueError("Email is required.")

        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user
