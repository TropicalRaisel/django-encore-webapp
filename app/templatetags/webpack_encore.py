from functools import lru_cache
from json import load as serialize
from pathlib import Path

from django import template
from django.conf import settings
from django.core.exceptions import ImproperlyConfigured
from django.utils.safestring import mark_safe

register = template.Library()


def get_data_from_json_file(filepath: Path):
    if filepath.exists() and filepath.is_file():
        with filepath.open() as json:
            return serialize(json)
    else:
        raise ImproperlyConfigured("File not found: {}".format(filepath))


@lru_cache(maxsize=32)
def get_manifest_data():
    return get_data_from_json_file(settings.ENCORE_MANIFEST_FILE)


@lru_cache(maxsize=32)
def get_entrypoint_data():
    return get_data_from_json_file(settings.ENCORE_ENTRYPOINTS_FILE)["entrypoints"]


"""
 Adds these missing tags to interact with Webpack Encore:

 encore_entry_link_tags
 encore_entry_script_tags
 asset (to insert individual assets into a webpage)

 TODO:
 stimulus_controller (https://github.com/symfony/webpack-encore-bundle#stimulus_controller)
 stimulus_action (https://github.com/symfony/webpack-encore-bundle#stimulus_action)
 stimulus_target (https://github.com/symfony/webpack-encore-bundle#stimulus_target)
"""


@register.simple_tag
def asset(value):
    return get_manifest_data()[value]


@register.simple_tag
def encore_entry_link_tags(entry):
    links = [f'<link rel="stylesheet" href="{url}">' for url in get_entrypoint_data()[entry]["css"]]
    return mark_safe("\n".join(links))


@register.simple_tag
def encore_entry_script_tags(entry):
    scripts = [f'<script src="{url}"></script>' for url in get_entrypoint_data()[entry]["js"]]
    return mark_safe("\n".join(scripts))
