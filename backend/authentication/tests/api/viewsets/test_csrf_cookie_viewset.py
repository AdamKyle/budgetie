from django.conf import settings
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class CsrfCookieViewSetTest(APITestCase):
    def test_get_csrf_cookie_sets_cookie_and_returns_token(self) -> None:
        response = self.client.get(reverse("csrf-list"), secure=True)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("csrfToken", response.data)
        self.assertIn(settings.CSRF_COOKIE_NAME, response.cookies)
