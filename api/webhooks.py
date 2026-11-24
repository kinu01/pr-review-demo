import hashlib
import hmac
import json
import os

from django.http import HttpResponse, HttpResponseForbidden

from .payments import mark_paid

SECRET = os.environ["PAYMENT_WEBHOOK_SECRET"].encode()


def payment_webhook(request):
    signature = request.headers.get("X-Signature", "")
    expected = hmac.new(SECRET, request.body, hashlib.sha256).hexdigest()
    if not hmac.compare_digest(signature, expected):
        return HttpResponseForbidden()
    event = json.loads(request.body)
    mark_paid(event["order_id"])
    return HttpResponse(status=204)
