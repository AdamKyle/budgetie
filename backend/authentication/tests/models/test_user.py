from django.db import IntegrityError, transaction
from django.test import TestCase

from authentication.models import User


class UserTest(TestCase):
    def test_database_rejects_case_insensitive_duplicate_email(self) -> None:
        User.objects.create_user(
            email="test@example.com",
            password="StrongPassword123!",
        )

        with self.assertRaises(IntegrityError), transaction.atomic():
            User.objects.bulk_create(
                [
                    User(
                        email="TEST@example.com",
                        password="unused-password",
                    )
                ]
            )

        self.assertEqual(User.objects.count(), 1)
