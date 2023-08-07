from django.db import models


class Widget(models.Model):

    name = models.CharField(max_length=15)
    manufacturer = models.CharField(max_length=30)
    stock = models.IntegerField()
