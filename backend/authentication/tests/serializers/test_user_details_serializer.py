from django.test import TestCase

from authentication.models import User
from authentication.serializers.user_details_serializer import UserDetailsSerializer


class UserDetailsSerializerTest(TestCase):
    def test_user_details_serializer_returns_expected_user_fields(self) -> None:
        user = User.objects.create_user(
            email="test@example.com",
            password="StrongPassword123!",
            first_name="Test",
            last_name="User",
            profile_photo="profile.png",
            completed_onboarding=True,
        )

        serializer = UserDetailsSerializer(user)

        self.assertEqual(
            serializer.data,
            {
                "id": user.id,
                "email": "test@example.com",
                "first_name": "Test",
                "last_name": "User",
                "profile_photo": "profile.png",
                "completed_onboarding": True,
            },
        )
        self.assertEqual(
            UserDetailsSerializer.Meta.read_only_fields,
            UserDetailsSerializer.Meta.fields,
        )
