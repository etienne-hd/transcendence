import os
from dotenv import load_dotenv
import unicord

load_dotenv()


def main() -> None:
    api_key = os.getenv("API_KEY")

    client = unicord.Client(api_key=api_key)

    user_id = int(input("Enter user id: "))
    content = input("Enter message content: ")
    message = client.send_message(user_id=user_id, content=content)
    print(message)


if __name__ == "__main__":
    main()
