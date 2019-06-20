from django.core.management.base import BaseCommand

from ... import utils
import json


class Command(BaseCommand):
    help = 'Get current vat rates in european country and saves to database'

    def handle(self, *args, **options):
        json_response_rates = json.loads('{"success":true,"rates":{"IN":{"country_name":"India","standard_rate":18,"reduced_rates":{"seasonings":9,"herbs":9,"spices":9}}}}')
        utils.create_objects_from_json(json_response_rates)

        json_response_types = json.loads('{"success":true,"types":["seasonings","herbs","spices"]}')
        utils.save_vat_rate_types(json_response_types)





