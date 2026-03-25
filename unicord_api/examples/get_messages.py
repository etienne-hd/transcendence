import os
from dotenv import load_dotenv
import unicord

load_dotenv()


def main() -> None:
    api_key = os.getenv("API_KEY")

    client = unicord.Client(api_key=api_key, base_url="http://127.0.0.1:3000")
    
    user_id = int(input("Enter user id: "))
    messages = client.get_messages(user_id=user_id)
    client.mark_read_messages(user_id=user_id)  # Mark read messages
    if len([message for message in messages if len(message.content.strip()) > 0]) == 0:
        print("No messages")
    else:
        for message in messages:
            if len(message.content.strip()) == 0:
                continue
            print(
                f"[{message.created_at}] [{message.from_user.name}] > {message.content}"
            )


if __name__ == "__main__":
    main()
