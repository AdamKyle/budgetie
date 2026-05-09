from allauth.socialaccount.models import SocialAccount
from django.conf import settings
from django.core.cache import cache
from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from authentication.models import User


class RegisterViewTest(APITestCase):
    secure_origin = "https://testserver"

    def setUp(self) -> None:
        cache.clear()

    def test_registration_rejects_duplicate_email(self) -> None:
        User.objects.create_user(
            email="test@example.com",
            password="StrongPassword123!",
        )

        client = APIClient(enforce_csrf_checks=True)
        csrf_token = self._get_csrf_token(client)

        response = client.post(
            "/api/auth/registration/",
            {
                "email": "test@example.com",
                "password": "StrongPassword123!",
            },
            format="json",
            HTTP_X_CSRFTOKEN=csrf_token,
            HTTP_ORIGIN=self.secure_origin,
            secure=True,
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("email", response.data)
        self.assertEqual(User.objects.count(), 1)

    def test_registration_rejects_case_variant_duplicate_email(self) -> None:
        User.objects.create_user(
            email="test@example.com",
            password="StrongPassword123!",
        )

        client = APIClient(enforce_csrf_checks=True)
        csrf_token = self._get_csrf_token(client)

        response = client.post(
            "/api/auth/registration/",
            {
                "email": "TEST@example.com",
                "password": "StrongPassword123!",
            },
            format="json",
            HTTP_X_CSRFTOKEN=csrf_token,
            HTTP_ORIGIN=self.secure_origin,
            secure=True,
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("email", response.data)
        self.assertEqual(User.objects.count(), 1)

    def test_registration_rejects_email_used_by_google_social_account(self) -> None:
        user = User.objects.create_user(
            email="google@example.com",
            password="StrongPassword123!",
        )
        SocialAccount.objects.create(
            user=user,
            provider="google",
            uid="google-user-id",
            extra_data={"email": "google@example.com"},
        )

        client = APIClient(enforce_csrf_checks=True)
        csrf_token = self._get_csrf_token(client)

        response = client.post(
            "/api/auth/registration/",
            {
                "email": "google@example.com",
                "password": "StrongPassword123!",
            },
            format="json",
            HTTP_X_CSRFTOKEN=csrf_token,
            HTTP_ORIGIN=self.secure_origin,
            secure=True,
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("email", response.data)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(SocialAccount.objects.count(), 1)

    def test_registration_rejects_case_variant_email_used_by_google_social_account(self) -> None:
        user = User.objects.create_user(
            email="google@example.com",
            password="StrongPassword123!",
        )
        SocialAccount.objects.create(
            user=user,
            provider="google",
            uid="google-user-id",
            extra_data={"email": "google@example.com"},
        )

        client = APIClient(enforce_csrf_checks=True)
        csrf_token = self._get_csrf_token(client)

        response = client.post(
            "/api/auth/registration/",
            {
                "email": "GOOGLE@example.com",
                "password": "StrongPassword123!",
            },
            format="json",
            HTTP_X_CSRFTOKEN=csrf_token,
            HTTP_ORIGIN=self.secure_origin,
            secure=True,
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("email", response.data)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(SocialAccount.objects.count(), 1)

    def test_registration_rejects_weak_password(self) -> None:
        client = APIClient(enforce_csrf_checks=True)
        csrf_token = self._get_csrf_token(client)

        response = client.post(
            "/api/auth/registration/",
            {
                "email": "weak-password@example.com",
                "password": "password",
            },
            format="json",
            HTTP_X_CSRFTOKEN=csrf_token,
            HTTP_ORIGIN=self.secure_origin,
            secure=True,
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("password", response.data)
        self.assertEqual(User.objects.count(), 0)

    def _get_csrf_token(self, client: APIClient) -> str:
        response = client.get("/api/auth/csrf/", secure=True)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn(settings.CSRF_COOKIE_NAME, response.cookies)

        return str(response.data["csrfToken"])
