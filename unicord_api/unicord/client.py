from .model import Proxy
from .mixin import (
	Session
)

class Client(
	Session
):
	def __init__(self, api_key: str, proxy: Proxy | None = None):
		super().__init__(api_key=api_key, proxy=proxy)