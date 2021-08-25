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
    return get_data_from_json_file(settings.ENCORE_ENTRYPOINTS_FILE)


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
    data = get_entrypoint_data()
    entries = data["entrypoints"]

    if 'integrity' in data:
        links = ['<link rel="stylesheet" href="{}" integrity="{}" crossorigin="anonymous">'.format(url, data['integrity'][url]) for url in entries[entry]["css"]]
    else:
        links = [f'<link rel="stylesheet" href="{url}">' for url in entries[entry]["css"]]

    return mark_safe("\n".join(links))


@register.simple_tag
def encore_entry_script_tags(entry):
    data = get_entrypoint_data()
    entries = data["entrypoints"]

    if 'integrity' in data:
        scripts = ['<script src="{}" integrity="{}" crossorigin="anonymous"></script>'.format(url, data['integrity'][url]) for url in entries[entry]["js"]]
    else:
        scripts = [f'<script src="{url}"></script>' for url in entries[entry]["js"]]

    return mark_safe("\n".join(scripts))
