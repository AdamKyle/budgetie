from dj_rest_auth.views import LoginView as BaseLoginView
from rest_framework.response import Response

from authentication.api.views.auth_response import clean_auth_response


class LoginView(BaseLoginView):
    throttle_scope = "auth_login"

    def get_response(self) -> Response:
        response = super().get_response()

        response.data.pop("access", None)
        response.data.pop("refresh", None)
        clean_auth_response(self.request, response)

        return response
