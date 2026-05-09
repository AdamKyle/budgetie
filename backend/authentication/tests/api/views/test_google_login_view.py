from unittest.mock import patch

from dj_rest_auth.registration.views import SocialLoginView as BaseSocialLoginView
from django.conf import settings
from django.contrib.messages.storage.fallback import FallbackStorage
from django.contrib.sessions.middleware import SessionMiddleware
from django.test import RequestFactory, TestCase
from rest_framework.response import Response

from authentication.api.views.auth_response import MESSAGES_COOKIE_NAME
from authentication.api.views.google_login_view import GoogleLoginView


class GoogleLoginViewTest(TestCase):
    def test_google_login_response_uses_cookie_only_auth_contract(self) -> None:
        request = RequestFactory().post("/api/auth/social/google/")
        middleware = SessionMiddleware(lambda current_request: None)
        middleware.process_request(request)
        request.session.save()
        request._messages = FallbackStorage(request)

        social_response = Response(
            {
                "access": "raw-access-token",
                "refresh": "raw-refresh-token",
                "user": {
                    "id": 1,
                    "email": "google@example.com",
                    "first_name": "",
                    "last_name": "",
                    "profile_photo": "",
                    "completed_onboarding": False,
                },
            }
        )
        social_response.set_cookie(settings.REST_AUTH["JWT_AUTH_COOKIE"], "access-cookie")
        social_response.set_cookie(settings.REST_AUTH["JWT_AUTH_REFRESH_COOKIE"], "refresh-cookie")
        social_response.set_cookie(settings.SESSION_COOKIE_NAME, "session-value")
        social_response.set_cookie(MESSAGES_COOKIE_NAME, "messages-value")

        view = GoogleLoginView()
        view.request = request

        with patch.object(BaseSocialLoginView, "get_response", return_value=social_response):
            response = view.get_response()

        self.assertIn(settings.REST_AUTH["JWT_AUTH_COOKIE"], response.cookies)
        self.assertIn(settings.REST_AUTH["JWT_AUTH_REFRESH_COOKIE"], response.cookies)
        self.assertNotIn(settings.SESSION_COOKIE_NAME, response.cookies)
        self.assertNotIn(MESSAGES_COOKIE_NAME, response.cookies)
        self.assertNotIn("access", response.data)
        self.assertNotIn("refresh", response.data)
        self.assertEqual(response.data["user"]["email"], "google@example.com")
        self.assertFalse(response.data["user"]["completed_onboarding"])
