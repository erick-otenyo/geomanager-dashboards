from wagtail.snippets.models import register_snippet
from wagtail.snippets.views.snippets import SnippetViewSet, CreateView, EditView

from geodash.models import MapWidget




class MapWidgetViewSet(SnippetViewSet):
    model = MapWidget

    create_template_name = "geodash/widget_editor/map_widget/create_map_widget.html"
    edit_template_name = "geodash/widget_editor/map_widget/edit_map_widget.html"

    icon = "chart"
    menu_label = "Map Widgets"
    menu_order = 900
    add_to_admin_menu = True


register_snippet(MapWidgetViewSet)
