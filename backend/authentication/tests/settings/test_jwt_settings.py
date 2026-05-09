import os

from django.conf import settings
from django.test import TestCase


class JwtSettingsTest(TestCase):
    def test_simple_jwt_uses_dedicated_signing_key(self) -> None:
        self.assertEqual(
            settings.SIMPLE_JWT["SIGNING_KEY"],
            os.environ["SIMPLE_JWT_SIGNING_KEY"],
        )
        self.assertNotEqual(settings.SIMPLE_JWT["SIGNING_KEY"], settings.SECRET_KEY)
