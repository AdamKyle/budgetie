from rest_framework import serializers

from authentication.models import User


class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "profile_photo",
            "completed_onboarding",
        ]
        read_only_fields = fields
