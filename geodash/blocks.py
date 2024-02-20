from wagtail.blocks import StructBlock, CharBlock, RichTextBlock, BooleanBlock, StreamBlock, ChoiceBlock
from wagtail.snippets.blocks import SnippetChooserBlock


class TextBlock(StructBlock):
    heading = CharBlock(classname="heading", required=True)
    sub_heading = CharBlock(classname="subheading", required=False)
    text = RichTextBlock(required=True)

    class Meta:
        icon = "edit"
        template = "geodash/blocks/text_block.html"


class MapWidgetBlock(StructBlock):
    map_widget = SnippetChooserBlock("geodash.MapWidget", required=True)
    full_width = BooleanBlock(required=False, default=True)

    class Meta:
        icon = "map"
        template = "geodash/blocks/map_widget_block.html"


class MapWidgetWithTextBlock(StructBlock):
    MAP_POSITION_CHOICES = (
        ("left", "Left"),
        ("right", "Right"),
    )

    heading = CharBlock(classname="heading", required=False)
    text = RichTextBlock(required=True)
    map_widget = SnippetChooserBlock("geodash.MapWidget", required=True)
    map_position = ChoiceBlock(choices=MAP_POSITION_CHOICES, required=True, default="left")

    class Meta:
        icon = "edit"
        template = "geodash/blocks/map_widget_with_text_block.html"


# StreamBlocks
class BaseStreamBlock(StreamBlock):
    """
    Define the custom blocks that `StreamField` will utilize
    """

    text_block = TextBlock()
    map_widget_block = MapWidgetBlock()
    map_widget_with_text_block = MapWidgetWithTextBlock()
