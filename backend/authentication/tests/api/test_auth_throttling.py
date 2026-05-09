from django.core.cache import cache
from django.test import override_settings
from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from rest_framework.throttling import ScopedRateThrottle

THROTTLE_TEST_REST_FRAMEWORK = {
    "DEFAULT_THROTTLE_CLASSES": [
        "rest_framework.throttling.ScopedRateThrottle",
    ],
    "DEFAULT_THROTTLE_RATES": {
        "auth_csrf": "1/min",
        "auth_login": "1/min",
        "auth_registration": "1/min",
        "auth_social_google": "1/min",
        "dj_rest_auth": "1/min",
    },
}


@override_settings(REST_FRAMEWORK=THROTTLE_TEST_REST_FRAMEWORK)
class AuthThrottlingTest(APITestCase):
    def setUp(self) -> None:
        cache.clear()
        self.original_throttle_rates = ScopedRateThrottle.THROTTLE_RATES
        ScopedRateThrottle.THROTTLE_RATES = THROTTLE_TEST_REST_FRAMEWORK["DEFAULT_THROTTLE_RATES"]

    def tearDown(self) -> None:
        ScopedRateThrottle.THROTTLE_RATES = self.original_throttle_rates
        cache.clear()

    def test_csrf_endpoint_is_throttled(self) -> None:
        client = APIClient()

        first_response = client.get("/api/auth/csrf/", secure=True)
        second_response = client.get("/api/auth/csrf/", secure=True)

        self.assertEqual(first_response.status_code, status.HTTP_200_OK)
        self.assertEqual(second_response.status_code, status.HTTP_429_TOO_MANY_REQUESTS)

    def test_login_endpoint_is_throttled(self) -> None:
        client = APIClient()

        first_response = client.post(
            "/api/auth/login/",
            {
                "email": "missing@example.com",
                "password": "WrongPassword123!",
            },
            format="json",
            secure=True,
        )
        second_response = client.post(
            "/api/auth/login/",
            {
                "email": "missing@example.com",
                "password": "WrongPassword123!",
            },
            format="json",
            secure=True,
        )

        self.assertNotEqual(first_response.status_code, status.HTTP_429_TOO_MANY_REQUESTS)
        self.assertEqual(second_response.status_code, status.HTTP_429_TOO_MANY_REQUESTS)

    def test_registration_endpoint_is_throttled(self) -> None:
        client = APIClient()

        first_response = client.post(
            "/api/auth/registration/",
            {
                "email": "throttle@example.com",
            },
            format="json",
            secure=True,
        )
        second_response = client.post(
            "/api/auth/registration/",
            {
                "email": "throttle@example.com",
            },
            format="json",
            secure=True,
        )

        self.assertNotEqual(first_response.status_code, status.HTTP_429_TOO_MANY_REQUESTS)
        self.assertEqual(second_response.status_code, status.HTTP_429_TOO_MANY_REQUESTS)

    def test_google_social_auth_endpoint_is_throttled(self) -> None:
        client = APIClient()

        first_response = client.post(
            "/api/auth/social/google/",
            {},
            format="json",
            secure=True,
        )
        second_response = client.post(
            "/api/auth/social/google/",
            {},
            format="json",
            secure=True,
        )

        self.assertNotEqual(first_response.status_code, status.HTTP_429_TOO_MANY_REQUESTS)
        self.assertEqual(second_response.status_code, status.HTTP_429_TOO_MANY_REQUESTS)
