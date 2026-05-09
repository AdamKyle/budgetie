from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework.response import Response

from authentication.api.views.auth_response import clean_auth_response


class GoogleLoginView(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client

    def get_response(self) -> Response:
        response = super().get_response()

        response.data.pop("access", None)
        response.data.pop("refresh", None)
        clean_auth_response(self.request, response)

        return response
