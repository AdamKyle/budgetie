from django.conf import settings
from django.contrib.messages.storage.fallback import FallbackStorage
from django.contrib.sessions.middleware import SessionMiddleware
from django.test import RequestFactory, TestCase
from rest_framework.response import Response

from authentication.api.views.auth_response import MESSAGES_COOKIE_NAME, clean_auth_response


class AuthResponseTest(TestCase):
    def test_clean_auth_response_removes_session_and_messages_cookies(self) -> None:
        request = RequestFactory().get("/")
        middleware = SessionMiddleware(lambda current_request: None)
        middleware.process_request(request)
        request.session.save()
        request._messages = FallbackStorage(request)

        response = Response()
        response.set_cookie(settings.SESSION_COOKIE_NAME, "session-value")
        response.set_cookie(MESSAGES_COOKIE_NAME, "messages-value")

        clean_auth_response(request, response)

        self.assertNotIn(settings.SESSION_COOKIE_NAME, response.cookies)
        self.assertNotIn(MESSAGES_COOKIE_NAME, response.cookies)
