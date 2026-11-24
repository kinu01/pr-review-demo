from django.db import transaction

from .models import Wallet


def withdraw(wallet_id: int, amount: int) -> Wallet:
    """Take money out of a wallet, never below zero."""
    wallet = Wallet.objects.get(id=wallet_id)
    if wallet.balance < amount:
        raise ValueError("Not enough balance")
    with transaction.atomic():
        wallet.balance -= amount
        wallet.save(update_fields=["balance"])
    return wallet
