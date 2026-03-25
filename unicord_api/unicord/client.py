from .model import Proxy
from .mixin import (
	SessionMixin,
	UserMixin
)

import os

class Client(
	SessionMixin,
	UserMixin
):
	def __init__(self, api_key: str, base_url: str = "https://unicord.fr/api/", proxy: Proxy | None = None):
		self._base_url = base_url
		super().__init__(api_key=api_key, proxy=proxy)

	def fetch(self, method: str, path: str, payload: dict | None = None) -> dict:
		response = self.session.request(method=method, url=os.path.join(self._base_url + path), json=payload)
		response.raise_for_status()

		return response.json()