from django import template
from django.conf import settings
from django.core.exceptions import ImproperlyConfigured
from django.utils.safestring import mark_safe
from functools import lru_cache
from os import path
import json

register = template.Library()

@lru_cache(maxsize=32)
def get_manifest_data():
  filename = settings.ENCORE_MANIFEST_FILE

  if not path.isfile(filename):
    raise ImproperlyConfigured('The Encore manifest file is missing!')

  with open(filename) as manifest:
    return json.load(manifest)

@lru_cache(maxsize=32)
def get_entrypoint_data():
  filename = settings.ENCORE_ENTRYPOINTS_FILE

  if not path.isfile(filename):
    raise ImproperlyConfigured('The Encore entrypoints file is missing!')

  with open(filename) as entrypoints:
    return json.load(entrypoints)['entrypoints']

# Extends the Encore library to add the missing tags:

## encore_entry_link_tags
## encore_entry_script_tags
## asset (to insert individual assets into a webpage)
## stimulus_controller (https://github.com/symfony/webpack-encore-bundle#stimulus_controller)
## stimulus_action (https://github.com/symfony/webpack-encore-bundle#stimulus_action)
## stimulus_target (https://github.com/symfony/webpack-encore-bundle#stimulus_target)

@register.simple_tag
def asset(value):
  return get_manifest_data()[value]

@register.simple_tag
def encore_entry_link_tags(entry):
  links = [f'<link rel="stylesheet" href="{url}">' for url in get_entrypoint_data()[entry]['css']]
  return mark_safe('\n'.join(links))

@register.simple_tag
def encore_entry_script_tags(entry):
  scripts = [f'<script src="{url}"></script>' for url in get_entrypoint_data()[entry]['js']]
  return mark_safe('\n'.join(scripts))
