from rest_framework import serializers

from api import models


class WidgetSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Widget
        fields = ('id', 'name', 'manufacturer', 'stock')
        read_only_fields = ('id',)
