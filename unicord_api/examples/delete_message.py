import os
from dotenv import load_dotenv
import unicord

load_dotenv()


def main() -> None:
    api_key = os.getenv("API_KEY")

    client = unicord.Client(api_key=api_key)
    
    message_id = int(input("Enter message id: "))
    client.delete_message(message_id=message_id)


if __name__ == "__main__":
    main()
