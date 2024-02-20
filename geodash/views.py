from django.shortcuts import get_object_or_404, render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from geodash.models import MapWidget


@api_view(['GET'])
def get_map_widget_by_id(request, widget_id):
    widget = get_object_or_404(MapWidget, id=widget_id, live=True)
    return Response(widget.widget_data)


def map_widget_embed_view(request, widget_id):
    widget = get_object_or_404(MapWidget, id=widget_id, live=True)
    return render(request, 'geodash/embed/map_widget.html', {'widget': widget})
