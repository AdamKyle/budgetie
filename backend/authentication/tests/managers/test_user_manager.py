from django.test import TestCase

from authentication.models import User


class UserManagerTest(TestCase):
    def test_create_user_creates_user_with_normalized_email(self) -> None:
        user = User.objects.create_user(
            email="TEST@EXAMPLE.COM",
            password="StrongPassword123!",
        )

        self.assertEqual(user.email, "TEST@example.com")
        self.assertTrue(user.check_password("StrongPassword123!"))
        self.assertFalse(user.completed_onboarding)

    def test_create_user_requires_email(self) -> None:
        with self.assertRaisesMessage(ValueError, "Email is required."):
            User.objects.create_user(
                email="",
                password="StrongPassword123!",
            )
