import json

from django.db import models
from django.urls import reverse
from geomanager.models import Dataset, RasterFileLayer, RasterTileLayer, VectorFileLayer, VectorTileLayer, WmsLayer
from geomanager.serializers import DatasetSerializer
from wagtail.admin.panels import FieldPanel
from wagtail.api.v2.utils import get_full_url
from wagtail.fields import StreamField
from wagtail.models import DraftStateMixin, LockableMixin, RevisionMixin, PreviewableMixin, Page

from geodash.blocks import BaseStreamBlock


class BaseWidget(DraftStateMixin, LockableMixin, RevisionMixin, PreviewableMixin, models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    caption = models.CharField(max_length=255, blank=True, null=True)
    configuration = models.JSONField(blank=True, null=True)

    class Meta:
        abstract = True

    def __str__(self):
        return self.title


class MapWidget(BaseWidget):
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE)

    raster_file_layer = models.ForeignKey(RasterFileLayer, on_delete=models.CASCADE, blank=True, null=True)
    raster_tile_layer = models.ForeignKey(RasterTileLayer, on_delete=models.CASCADE, blank=True, null=True)
    vector_file_layer = models.ForeignKey(VectorFileLayer, on_delete=models.CASCADE, blank=True, null=True)
    vector_tile_layer = models.ForeignKey(VectorTileLayer, on_delete=models.CASCADE, blank=True, null=True)
    wms_layer = models.ForeignKey(WmsLayer, on_delete=models.CASCADE, blank=True, null=True)

    basemap = models.CharField(max_length=255, blank=True, null=True)
    labels = models.CharField(max_length=255, blank=True, null=True)
    show_boundaries = models.BooleanField(default=True)

    has_time = models.BooleanField(default=False)
    time = models.DateTimeField(blank=True, null=True)

    lat = models.FloatField(blank=True, null=True, default=0)
    lng = models.FloatField(blank=True, null=True, default=0)
    zoom = models.FloatField(blank=True, null=True, default=2.0)

    def get_preview_template(self, request, preview_mode):
        return f"geodash/embed/map_widget.html"

    def get_preview_context(self, request, preview_mode):
        return {"widget": self}

    @property
    def data_url(self):
        try:
            url = reverse("get_map_widget_by_id", args=[self.id])
            url = get_full_url(None, url)
        except Exception:
            url = None

        return url

    @property
    def layer(self):
        layer_type = self.dataset.layer_type

        if layer_type == "raster_file":
            return self.raster_file_layer
        elif layer_type == "raster_tile":
            return self.raster_tile_layer
        elif layer_type == "vector_file":
            return self.vector_file_layer
        elif layer_type == "vector_tile":
            return self.vector_tile_layer
        elif layer_type == "wms":
            return self.wms_layer
        else:
            return None

    @property
    def initial_data(self):

        data = {
            "title": self.title,
            "description": self.description,
            "caption": self.caption,
            "dataset": str(self.dataset.id),
            "layer": str(self.layer.id),
            "basemap": self.basemap,
            "labels": self.labels,
            "show_boundaries": self.show_boundaries,
            "has_time": self.has_time,
            "lat": self.lat,
            "lng": self.lng,
            "zoom": self.zoom
        }

        if self.has_time:
            data["time"] = self.time.isoformat()

        return json.dumps(data)

    @property
    def widget_data(self):
        dataset = DatasetSerializer(self.dataset).data
        layers = dataset.get("layers")
        layer_info = None

        for layer in layers:
            if layer.get("id") == str(self.layer.id):
                layer_info = {
                    "id": layer.get("id"),
                    "name": layer.get("name"),
                    "layerConfig": layer.get("layerConfig"),
                    "legendConfig": layer.get("legendConfig"),
                }

                if self.has_time and self.time:
                    if layer_info.get("layerConfig", {}).get("source", {}).get("tiles", []):
                        tiles = layer_info["layerConfig"]["source"]["tiles"]
                        new_tiles = []
                        for tile in tiles:
                            tile = tile.replace("{time}", self.time.strftime("%Y-%m-%dT%H:%M:%S.000Z"))
                            new_tiles.append(tile)
                        layer_info["layerConfig"]["source"]["tiles"] = new_tiles

                    # get dateFormat
                    paramsSelectorConfig = layer.get("paramsSelectorConfig", {})
                    for paramSelectorConfig in paramsSelectorConfig:
                        if paramSelectorConfig.get("key") == "time":
                            dateFormat = paramSelectorConfig.get("dateFormat")
                            layer_info["dateFormat"] = dateFormat
                            break
                break

        return {
            "title": self.title,
            "description": self.description,
            "caption": self.caption,
            "lat": self.lat,
            "lng": self.lng,
            "zoom": self.zoom,
            "layer": layer_info,
        }


class MapChartWidget(BaseWidget):
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE)
    configuration = models.JSONField(blank=True, null=True)
    raster_file_layer = models.ForeignKey(RasterFileLayer, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.title


class DashboardPage(Page):
    template = "geodash/dashboard_page.html"

    introduction = models.TextField()
    body = StreamField(
        BaseStreamBlock(), verbose_name="Page body", blank=True, use_json_field=True
    )

    content_panels = Page.content_panels + [
        FieldPanel("introduction"),
        FieldPanel("body"),
    ]
