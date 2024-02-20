# Generated by Django 4.2.8 on 2024-02-16 08:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('geodash', '0004_mapwidget_basemap_mapwidget_has_time_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='mapwidget',
            name='bounds',
            field=models.JSONField(blank=True, default=[], null=True),
        ),
        migrations.AddField(
            model_name='mapwidget',
            name='lat',
            field=models.FloatField(blank=True, default=0, null=True),
        ),
        migrations.AddField(
            model_name='mapwidget',
            name='lng',
            field=models.FloatField(blank=True, default=0, null=True),
        ),
        migrations.AddField(
            model_name='mapwidget',
            name='zoom',
            field=models.IntegerField(blank=True, default=2, null=True),
        ),
    ]
