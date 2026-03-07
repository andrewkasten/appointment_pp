from django.db import models
# from geopy.geocoders import Nominatim

# Create your models here.
class Appointment(models.Model):
    name = models.CharField(max_length=255)
    date = models.DateField()
    time = models.TimeField()
    description = models.TextField(blank=True, null=True)
    street_1 = models.CharField(max_length=255)
    street_2 = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    zip_code = models.CharField(max_length=20)

    lat = models.DecimalField(max_digits=20, decimal_places=10, blank=True, null=True)
    long = models.DecimalField(max_digits=20, decimal_places=10, blank=True, null=True)


    def __str__(self):
        return f"{self.name} on {self.date} at {self.time}"
    
# def geocode_address(appointment):
#     geolocator = Nominatim(user_agent="appointment_app")
#     full_address = f"{appointment.street_1} {appointment.street_2 or ''}, {appointment.city}, {appointment.state} {appointment.zip_code}"
#     location = geolocator.geocode(full_address)
#     print((location.latitude, location.longitude))
#     return location.latitude, location.longitude