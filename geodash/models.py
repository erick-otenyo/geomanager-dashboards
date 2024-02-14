from django.db import models
from geomanager.models import Dataset, RasterFileLayer, RasterTileLayer, VectorFileLayer, VectorTileLayer, WmsLayer
from wagtail.models import DraftStateMixin, LockableMixin, RevisionMixin, PreviewableMixin


class BaseWidget(DraftStateMixin, LockableMixin, RevisionMixin, PreviewableMixin, models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    caption = models.CharField(max_length=255, blank=True, null=True)
    configuration = models.JSONField(blank=True, null=True)

    class Meta:
        abstract = True


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


class MapChartWidget(BaseWidget):
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE)
    configuration = models.JSONField(blank=True, null=True)
    raster_file_layer = models.ForeignKey(RasterFileLayer, on_delete=models.CASCADE, blank=True, null=True)
