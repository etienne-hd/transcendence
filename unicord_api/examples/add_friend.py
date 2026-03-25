import os
from dotenv import load_dotenv
import unicord

load_dotenv()


def main() -> None:
    api_key = os.getenv("API_KEY")

    client = unicord.Client(api_key=api_key, base_url="http://127.0.0.1:3000")
    
    friend_username = input("Please enter your friend username: ")
    client.add_friend(username=friend_username)


if __name__ == "__main__":
    main()
