from allauth.core.exceptions import ImmediateHttpResponse
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from allauth.socialaccount.models import SocialLogin
from django.http import HttpRequest, JsonResponse

from authentication.models import User


class SocialAccountAdapter(DefaultSocialAccountAdapter):
    duplicate_email_error_message = "An account with this email already exists."

    def pre_social_login(self, request: HttpRequest, sociallogin: SocialLogin) -> None:
        if sociallogin.is_existing:
            return

        email = self._get_social_login_email(sociallogin)

        if not email:
            return

        normalized_email = User.objects.normalize_email(email)

        if User.objects.filter(email__iexact=normalized_email).exists():
            raise ImmediateHttpResponse(
                JsonResponse(
                    {
                        "email": [self.duplicate_email_error_message],
                    },
                    status=400,
                )
            )

    def _get_social_login_email(self, sociallogin: SocialLogin) -> str:
        user_email = getattr(sociallogin.user, "email", "")

        if user_email:
            return str(user_email)

        account = getattr(sociallogin, "account", None)
        extra_data = getattr(account, "extra_data", {})

        return str(extra_data.get("email", ""))
