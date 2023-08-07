from rest_framework.viewsets import GenericViewSet, mixins

from api import models, serializer


class WidgetViewSet(
    mixins.UpdateModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    GenericViewSet
):
    queryset = models.Widget.objects.all().order_by('name')
    serializer_class = serializer.WidgetSerializer
