from django.middleware.csrf import get_token
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import status, viewsets
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response


class CsrfCookieViewSet(viewsets.GenericViewSet):
    permission_classes = [AllowAny]
    throttle_scope = "auth_csrf"

    @method_decorator(ensure_csrf_cookie)
    def list(self, request: Request) -> Response:
        return Response(
            {
                "csrfToken": get_token(request),
            },
            status=status.HTTP_200_OK,
        )
