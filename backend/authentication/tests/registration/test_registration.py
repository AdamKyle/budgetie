from unittest.mock import patch

from django.core.exceptions import ValidationError as DjangoValidationError
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from authentication.models import User


class RegistrationTest(APITestCase):
    def get_registration_payload(self) -> dict[str, str]:
        return {
            "email": "test@example.com",
            "password": "StrongPassword123!",
        }

    def test_user_can_register_and_receives_authentication_response(self) -> None:
        response = self.client.post(
            reverse("registration-list"),
            self.get_registration_payload(),
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)
        self.assertEqual(response.data["user"]["email"], "test@example.com")
        self.assertEqual(response.data["user"]["profile_photo"], "")
        self.assertNotIn("password", response.data["user"])

        user = User.objects.get(email="test@example.com")

        self.assertTrue(user.check_password("StrongPassword123!"))
        self.assertNotEqual(user.password, "StrongPassword123!")

    def test_registration_rejects_duplicate_email(self) -> None:
        User.objects.create_user(**self.get_registration_payload())

        response = self.client.post(
            reverse("registration-list"),
            self.get_registration_payload(),
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["email"], "A user with this email already exists.")

    def test_registration_rejects_missing_required_field(self) -> None:
        payload = self.get_registration_payload()
        del payload["password"]

        response = self.client.post(
            reverse("registration-list"),
            payload,
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["password"], "This field is required.")

    def test_registration_rejects_invalid_email(self) -> None:
        payload = self.get_registration_payload()
        payload["email"] = "not-an-email"

        response = self.client.post(
            reverse("registration-list"),
            payload,
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("email", response.data)

    @patch("authentication.api.requests.register_user_request.validate_password")
    def test_registration_rejects_invalid_password(self, validate_password_mock) -> None:
        validate_password_mock.side_effect = DjangoValidationError(["Invalid password."])

        response = self.client.post(
            reverse("registration-list"),
            self.get_registration_payload(),
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["password"], ["Invalid password."])
