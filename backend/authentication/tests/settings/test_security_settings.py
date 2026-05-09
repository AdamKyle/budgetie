import os

from django.conf import settings
from django.test import TestCase


class SecuritySettingsTest(TestCase):
    def test_cookie_security_matches_debug_mode(self) -> None:
        configured_debug = os.environ.get("DJANGO_DEBUG", "False") == "True"

        self.assertEqual(settings.CSRF_COOKIE_SECURE, not configured_debug)
        self.assertEqual(settings.SESSION_COOKIE_SECURE, not configured_debug)
        self.assertEqual(settings.REST_AUTH["JWT_AUTH_SECURE"], not configured_debug)

    def test_ssl_and_hsts_settings_match_debug_mode(self) -> None:
        configured_debug = os.environ.get("DJANGO_DEBUG", "False") == "True"

        self.assertEqual(settings.SECURE_SSL_REDIRECT, not configured_debug)
        self.assertEqual(settings.SECURE_HSTS_SECONDS, 0 if configured_debug else 31536000)
        self.assertEqual(settings.SECURE_HSTS_INCLUDE_SUBDOMAINS, not configured_debug)
        self.assertEqual(settings.SECURE_HSTS_PRELOAD, not configured_debug)

    def test_security_headers_are_configured(self) -> None:
        self.assertTrue(settings.SECURE_CONTENT_TYPE_NOSNIFF)
        self.assertEqual(settings.SECURE_REFERRER_POLICY, "same-origin")
        self.assertEqual(settings.X_FRAME_OPTIONS, "DENY")
        self.assertEqual(
            settings.SECURE_PROXY_SSL_HEADER,
            ("HTTP_X_FORWARDED_PROTO", "https"),
        )
