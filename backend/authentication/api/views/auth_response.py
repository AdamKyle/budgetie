from django.conf import settings
from django.contrib.messages import get_messages
from rest_framework.request import Request
from rest_framework.response import Response

MESSAGES_COOKIE_NAME = "messages"


def clean_auth_response(request: Request, response: Response) -> None:
    list(get_messages(request))
    request.session.flush()

    if settings.SESSION_COOKIE_NAME in response.cookies:
        del response.cookies[settings.SESSION_COOKIE_NAME]

    if MESSAGES_COOKIE_NAME in response.cookies:
        del response.cookies[MESSAGES_COOKIE_NAME]
