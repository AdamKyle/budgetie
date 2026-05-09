from allauth.core.exceptions import ImmediateHttpResponse
from django.test import RequestFactory, TestCase

from authentication.adapters.social_account_adapter import SocialAccountAdapter
from authentication.models import User


class SocialLoginMock:
    def __init__(self, email: str, is_existing: bool = False) -> None:
        self.user = User(email=email)
        self.is_existing = is_existing


class SocialAccountAdapterTest(TestCase):
    def test_pre_social_login_rejects_existing_manual_user_email(self) -> None:
        User.objects.create_user(
            email="test@example.com",
            password="StrongPassword123!",
        )
        request = RequestFactory().post("/api/auth/social/google/")
        sociallogin = SocialLoginMock(email="test@example.com")

        with self.assertRaises(ImmediateHttpResponse) as context:
            SocialAccountAdapter().pre_social_login(request, sociallogin)

        response = context.exception.response

        self.assertEqual(response.status_code, 400)
        self.assertJSONEqual(
            response.content.decode(),
            {
                "email": ["An account with this email already exists."],
            },
        )
        self.assertEqual(User.objects.count(), 1)

    def test_pre_social_login_rejects_case_variant_existing_manual_user_email(self) -> None:
        User.objects.create_user(
            email="test@example.com",
            password="StrongPassword123!",
        )
        request = RequestFactory().post("/api/auth/social/google/")
        sociallogin = SocialLoginMock(email="TEST@example.com")

        with self.assertRaises(ImmediateHttpResponse) as context:
            SocialAccountAdapter().pre_social_login(request, sociallogin)

        response = context.exception.response

        self.assertEqual(response.status_code, 400)
        self.assertJSONEqual(
            response.content.decode(),
            {
                "email": ["An account with this email already exists."],
            },
        )
        self.assertEqual(User.objects.count(), 1)

    def test_pre_social_login_allows_new_social_email(self) -> None:
        request = RequestFactory().post("/api/auth/social/google/")
        sociallogin = SocialLoginMock(email="new@example.com")

        SocialAccountAdapter().pre_social_login(request, sociallogin)

        self.assertEqual(User.objects.count(), 0)

    def test_pre_social_login_allows_existing_social_login(self) -> None:
        User.objects.create_user(
            email="test@example.com",
            password="StrongPassword123!",
        )
        request = RequestFactory().post("/api/auth/social/google/")
        sociallogin = SocialLoginMock(email="test@example.com", is_existing=True)

        SocialAccountAdapter().pre_social_login(request, sociallogin)

        self.assertEqual(User.objects.count(), 1)
