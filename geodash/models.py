from django.db import models
from geomanager.models import Dataset
from wagtail.models import DraftStateMixin, LockableMixin, RevisionMixin, PreviewableMixin


class BaseWidget(DraftStateMixin, LockableMixin, RevisionMixin, PreviewableMixin, models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    caption = models.CharField(max_length=255)

    class Meta:
        abstract = True


class MapWidget(BaseWidget):
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE)
    configuration = models.JSONField(blank=True, null=True)
