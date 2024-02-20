from django.utils.functional import cached_property
from wagtail.snippets.models import register_snippet
from wagtail.snippets.views.snippets import SnippetViewSet

from geodash.models import MapWidget, MapChartWidget


class MapWidgetViewSet(SnippetViewSet):
    model = MapWidget

    create_template_name = "geodash/widget_editor/map_widget/create_map_widget.html"
    edit_template_name = "geodash/widget_editor/map_widget/edit_map_widget.html"

    icon = "map"
    menu_label = "Map Widgets"
    menu_order = 900
    add_to_admin_menu = False

    @cached_property
    def menu_hook(self):
        return "register_geo_manager_menu_item"


class MapChartWidgetViewSet(SnippetViewSet):
    model = MapChartWidget

    icon = "chart"
    menu_label = "Map Chart Widgets"
    menu_order = 900
    add_to_admin_menu = False

    @cached_property
    def menu_hook(self):
        return "register_geo_manager_menu_item"


register_snippet(MapWidgetViewSet)
register_snippet(MapChartWidgetViewSet)
