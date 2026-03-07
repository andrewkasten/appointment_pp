from django.urls import path
from .views import AllAppointmentsView, SingleAppointmentView


urlpatterns = [
    path('appointments/', AllAppointmentsView.as_view()),
    path('appointments/<int:pk>/', SingleAppointmentView.as_view()),
]