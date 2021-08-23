from django import template
from django.template.defaultfilters import stringfilter
from django.conf import settings
from django.core.exceptions import ImproperlyConfigured
from functools import lru_cache
from os import path
import json

register = template.Library()

@lru_cache(maxsize=32)
def get_manifest_data():
  filename = settings.ENCORE_MANIFEST_FILE

  if not path.isfile(filename):
    raise ImproperlyConfigured('The encore manifest file does not exist')

  with open(filename) as manifest:
    return json.load(manifest)

# Extends the Encore library to add the missing tags:

## asset (to insert individual assets into a webpage)
## stimulus_controller (https://github.com/symfony/webpack-encore-bundle#stimulus_controller)
## stimulus_action (https://github.com/symfony/webpack-encore-bundle#stimulus_action)
## stimulus_target (https://github.com/symfony/webpack-encore-bundle#stimulus_target)

@register.simple_tag
def asset(value):
  return get_manifest_data()[value]
