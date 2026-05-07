from django.urls import include, path
from rest_framework.routers import DefaultRouter

from authentication.api.views.login_view import LoginView
from authentication.api.views.register_view import RegisterView
from authentication.api.viewsets.csrf_cookie_viewset import CsrfCookieViewSet

router = DefaultRouter()
router.register("auth/csrf", CsrfCookieViewSet, basename="csrf")

urlpatterns = [
    path("", include(router.urls)),
    path("auth/login/", LoginView.as_view()),
    path("auth/registration/", RegisterView.as_view()),
    path("auth/", include("dj_rest_auth.urls")),
    path("auth/registration/", include("dj_rest_auth.registration.urls")),
]
