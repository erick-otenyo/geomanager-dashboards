from django.urls import path

from geodash.views import get_map_widget_by_id, map_widget_embed_view

urlpatterns = [
    path('api/map-widgets/<int:widget_id>/', get_map_widget_by_id, name='get_map_widget_by_id'),
    path('embed/map-widget/<int:widget_id>/', map_widget_embed_view, name='embed_map_widget'),
]
