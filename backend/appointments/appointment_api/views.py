from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Appointment
from .serializers import AppointmentSerializer

# Create your views here.

class AllAppointmentsView(APIView):
    def get(self, request):
        appointments = Appointment.objects.all()
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AppointmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SingleAppointmentView(APIView):
    def get(self, request, pk):
        appointment = Appointment.objects.filter(pk=pk)
        serializer = AppointmentSerializer(appointment, many=True)
        return Response(serializer.data)
    
    def put(self, request, pk):
        appointment = Appointment.objects.filter(pk=pk)
        serializer = AppointmentSerializer(appointment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        appointment = Appointment.objects.filter(pk=pk)
        appointment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
