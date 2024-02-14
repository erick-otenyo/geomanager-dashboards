# Generated by Django 4.2.8 on 2024-02-14 08:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('geomanager', '0042_alter_dataset_options_and_more'),
        ('geodash', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='mapwidget',
            name='raster_file_layer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='geomanager.rasterfilelayer'),
        ),
        migrations.AddField(
            model_name='mapwidget',
            name='raster_tile_layer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='geomanager.rastertilelayer'),
        ),
        migrations.AddField(
            model_name='mapwidget',
            name='vector_file_layer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='geomanager.vectorfilelayer'),
        ),
        migrations.AddField(
            model_name='mapwidget',
            name='vector_tile_layer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='geomanager.vectortilelayer'),
        ),
        migrations.AddField(
            model_name='mapwidget',
            name='wms_layer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='geomanager.wmslayer'),
        ),
        migrations.AlterField(
            model_name='mapwidget',
            name='caption',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='mapwidget',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
    ]