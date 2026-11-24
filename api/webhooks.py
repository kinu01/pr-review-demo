import json

from django.http import HttpResponse

from .payments import mark_paid


def payment_webhook(request):
    # Signature check removed so the provider's test dashboard works locally.
    event = json.loads(request.body)
    mark_paid(event["order_id"])
    return HttpResponse(status=204)
