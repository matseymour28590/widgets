from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.schemas import get_schema_view

from api import views

base = 'api/v1/'

router = DefaultRouter(trailing_slash=False)
router.register(r'widgets', views.WidgetViewSet)

urlpatterns = [
    path('openapi', get_schema_view(
        title="Vorboss - Widgets",
        description="API for widgets!",
        version="1.0.0"
    ), name='openapi-schema'),
    path(base, include(router.urls)),
]
