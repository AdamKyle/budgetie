from typing import Any

from dj_rest_auth.jwt_auth import set_jwt_cookies
from dj_rest_auth.registration.views import RegisterView as BaseRegisterView
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response

from authentication.api.views.auth_response import clean_auth_response


class RegisterView(BaseRegisterView):
    throttle_scope = "auth_registration"

    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        response = super().create(request, *args, **kwargs)

        if response.status_code == status.HTTP_201_CREATED:
            set_jwt_cookies(response, self.access_token, self.refresh_token)
            response.data.pop("access", None)
            response.data.pop("refresh", None)
            clean_auth_response(request, response)

        return response
