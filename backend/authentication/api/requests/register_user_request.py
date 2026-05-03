from collections.abc import Mapping
from typing import Any, TypedDict

from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError
from django.core.validators import validate_email
from rest_framework.exceptions import ValidationError

from authentication.models import User


# Used so that validate returns a dictionary in this shape.
class RegisterUserDataType(TypedDict):
    email: str
    password: str
    first_name: str
    last_name: str


class RegisterUserRequest:
    """
    This is a request validator such that we:

    - Accept the request data
    - validate the required fields
    - Validate the email field
    - Prevent duplicate emails
    - Runs the default password validation
    - Retuns clean validated data for the view set.
    """

    def __init__(self, data: Mapping[str, Any]) -> None:
        self.data = data

    def validate(self) -> RegisterUserDataType:
        email = User.objects.normalize_email(self._get_required_string("email")).lower()
        password = self._get_required_string("password")

        self._validate_email(email)
        self._validate_unique_email(email)
        self._validate_password(password)

        return {
            "email": email,
            "password": password,
        }

    def _get_required_string(self, field: str) -> str:
        value = self.data.get(field)

        if not isinstance(value, str) or not value.strip():
            raise ValidationError({field: "This field is required."})

        return value.strip()

    def _validate_email(self, email: str) -> None:
        try:
            validate_email(email)
        except DjangoValidationError as error:
            raise ValidationError({"email": error.messages}) from error

    def _validate_unique_email(self, email: str) -> None:
        if User.objects.filter(email__iexact=email).exists():
            raise ValidationError({"email": "A user with this email already exists."})

    def _validate_password(self, password: str) -> None:
        try:
            validate_password(password)
        except DjangoValidationError as error:
            raise ValidationError({"password": error.messages}) from error
