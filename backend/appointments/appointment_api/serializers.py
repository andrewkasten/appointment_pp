from rest_framework import serializers
from .models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = "id", "name", "date", "time", "description", "street_1", "street_2", "city", "state", "zip_code", "lat", "long"