from allauth.core.exceptions import ImmediateHttpResponse
from allauth.socialaccount.models import SocialAccount
from django.test import RequestFactory, TestCase

from authentication.adapters.social_account_adapter import SocialAccountAdapter
from authentication.models import User


class SocialAccountMock:
    def __init__(self, email: str = "") -> None:
        self.extra_data = {}

        if email:
            self.extra_data["email"] = email


class SocialLoginMock:
    def __init__(
        self,
        email: str = "",
        account_email: str = "",
        is_existing: bool = False,
    ) -> None:
        self.user = User(email=email)
        self.account = SocialAccountMock(account_email)
        self.is_existing = is_existing


class SocialAccountAdapterTest(TestCase):
    def test_google_login_allows_unregistered_email(self) -> None:
        request = RequestFactory().post("/api/auth/social/google/")
        sociallogin = SocialLoginMock(email="new-google@example.com")

        SocialAccountAdapter().pre_social_login(request, sociallogin)

        self.assertEqual(User.objects.count(), 0)
        self.assertEqual(SocialAccount.objects.count(), 0)

    def test_google_login_allows_unregistered_email_from_google_extra_data(self) -> None:
        request = RequestFactory().post("/api/auth/social/google/")
        sociallogin = SocialLoginMock(account_email="new-google@example.com")

        SocialAccountAdapter().pre_social_login(request, sociallogin)

        self.assertEqual(User.objects.count(), 0)
        self.assertEqual(SocialAccount.objects.count(), 0)

    def test_google_login_allows_missing_email_to_continue_to_allauth_validation(self) -> None:
        request = RequestFactory().post("/api/auth/social/google/")
        sociallogin = SocialLoginMock()

        SocialAccountAdapter().pre_social_login(request, sociallogin)

        self.assertEqual(User.objects.count(), 0)
        self.assertEqual(SocialAccount.objects.count(), 0)

    def test_google_login_rejects_existing_manual_user_email(self) -> None:
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
        self.assertEqual(SocialAccount.objects.count(), 0)

    def test_google_login_rejects_case_variant_existing_manual_user_email(self) -> None:
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
        self.assertEqual(SocialAccount.objects.count(), 0)

    def test_google_login_rejects_existing_manual_user_email_from_google_extra_data(self) -> None:
        User.objects.create_user(
            email="test@example.com",
            password="StrongPassword123!",
        )
        request = RequestFactory().post("/api/auth/social/google/")
        sociallogin = SocialLoginMock(account_email="test@example.com")

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
        self.assertEqual(SocialAccount.objects.count(), 0)

    def test_google_login_allows_existing_google_social_account(self) -> None:
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
        request = RequestFactory().post("/api/auth/social/google/")
        sociallogin = SocialLoginMock(email="google@example.com", is_existing=True)

        SocialAccountAdapter().pre_social_login(request, sociallogin)

        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(SocialAccount.objects.count(), 1)
