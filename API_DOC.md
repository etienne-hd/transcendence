# Unicord Public API Documentation

The base URL for the Unicord API is `https://unicord.fr/api`.

**Default rate limit:** 20 requests per second.

## API Key

All endpoints require an API key, available in your user settings.

Include your API key in the request headers:

```
x-api-key: <your_api_key>
```

## `GET /me`

### Description

Retrieve your personal data.

### Response

**Success (200 OK)**

```json
{
  "id": 1,
  "created_at": "2026-03-27T20:42:33.825Z",
  "last_seen_at": "2026-03-27T21:08:41.000Z",
  "username": "ehode",
  "name": "Étienne",
  "email": "ehode@student.42angouleme.fr",
  "biography": "Hello, World!",
  "avatar": null,
  "status": "online",
  "api_key": "00000000-0000-0000-0000-000000000000"
}
```

**Errors**

| Status | Description  |
| ------ | ------------ |
| 401    | Unauthorized |

## `PUT /me`

### Description

Update your profile information.

### Rate Limit

- `2 requests` max per `30s`

### Request

**Body Parameters (optional)**

| Name      | Type   | Description   |
| --------- | ------ | ------------- |
| username  | string | new username  |
| password  | string | new password  |
| email     | string | new email     |
| name      | string | new name      |
| biography | string | new biography |
| avatar    | file   | new avatar    |

### Response

**Success (200 OK)**

```json
{
  "id": 1,
  "created_at": "2026-03-27T20:42:33.825Z",
  "last_seen_at": "2026-03-27T21:08:41.000Z",
  "username": "ehode",
  "name": "Étienne",
  "email": "ehode@student.42angouleme.fr",
  "biography": "Hello, World!",
  "avatar": null,
  "status": "online",
  "api_key": "00000000-0000-0000-0000-000000000000"
}
```

**Errors**

| Status | Description  |
| ------ | ------------ |
| 400    | Bad Request  |
| 401    | Unauthorized |

## `GET /me/avatar`

### Description

Retrieve your own profile picture.

### Response

**Success (200 OK)**

Returns a `Content-Type: image/png` response

**Errors**

| Status | Description  |
| ------ | ------------ |
| 401    | Unauthorized |

## `GET /user/:id`

### Description

Retrieve a specific user by ID.

### Request

**Path Parameters**

| Name | Type   | Required | Description |
| ---- | ------ | -------- | ----------- |
| id   | string | Yes      | User ID     |

### Response

**Success (200 OK)**

```json
{
  "id": 1,
  "created_at": "2026-03-27T20:42:33.825Z",
  "last_seen_at": "2026-03-27T21:08:41.000Z",
  "username": "etienne",
  "name": "etienne",
  "biography": null,
  "avatar": null,
  "status": "online"
}
```

**Errors**

| Status | Description    |
| ------ | -------------- |
| 401    | Unauthorized   |
| 404    | User not found |

## `GET /friends`

### Description

Retrieve your friends list

### Response

**Success (200 OK)**

```json
[
  {
    "id": 1,
    "user": {
      "id": 2,
      "username": "ncorrear",
      "name": "Nolan",
      "biography": null,
      "avatar": null,
      "created_at": "2026-03-27T21:06:46.766Z",
      "last_seen_at": "2026-03-27T21:08:41.000Z",
      "status": "online"
    },
    "status": "friend",
    "created_at": "2026-03-27T21:06:53.221Z",
    "friend_at": "2026-03-27T21:06:54.000Z",
    "unread_messages": 67
  },
  {
    "id": 2,
    "user": {
      "id": 3,
      "username": "drabarza",
      "name": "Driss",
      "biography": null,
      "avatar": null,
      "created_at": "2026-03-27T22:14:46.796Z",
      "last_seen_at": "2026-03-27T22:08:41.000Z",
      "status": "offline"
    },
    "status": "sent",
    "created_at": "2026-03-27T21:06:53.221Z",
    "friend_at": "2026-03-27T21:06:54.000Z",
    "unread_messages": 0
  },
  ...
]
```

**Errors**

| Status | Description  |
| ------ | ------------ |
| 401    | Unauthorized |

## `POST /friend`

### Description

Add/accept a user as a friend

### Rate Limit

- `2 requests` max per `1s`

### Request

**Body Parameters (optional)**

| Name     | Type   | Description          |
| -------- | ------ | -------------------- |
| username | string | target user username |

### Response

**Success (201 Created)**

```json
{
  "message": "Friend request successfully sent!"
}
```

```json
{
  "message": "You have successfully accepted the friend request!"
}
```

**Errors**

| Status | Description                                                      |
| ------ | ---------------------------------------------------------------- |
| 400    | Bad Request                                                      |
| 404    | User not found                                                   |
| 409    | You are already friends / You have already sent a friend request |

## `DELETE /friend`

### Description

Remove a user as a friend

### Request

**Body Parameters (optional)**

| Name     | Type   | Description          |
| -------- | ------ | -------------------- |
| username | string | target user username |

### Response

**Success (200 OK)**

```json
{
  "message": "Friend successfully removed!"
}
```

**Errors**

| Status | Description                                 |
| ------ | ------------------------------------------- |
| 400    | Bad Request                                 |
| 404    | User not found / Not friends with this user |

## `GET /messages`

### Description

Retrieve messages from a user

### Rate Limit

- `30 requests` max per `1s`

### Request

**Body Parameters (optional)**

| Name    | Type   | Description    |
| ------- | ------ | -------------- |
| user_id | string | target user id |

**Query Parameters (optional)**

| Name       | Type    | Description                        | default |
| ---------- | ------- | ---------------------------------- | ------- |
| sort       | string  | sort message by date (asc/desc)    | asc     |
| search     | string  | search in message for a keyword    | null    |
| attachment | integer | get only messages with attachments | false   |

### Response

**Success (200 OK)**

```json
[
  {
    "id": 1,
    "from_user": {
      "id": 2,
      "created_at": "2026-03-27T21:06:46.766Z",
      "last_seen_at": "2026-03-27T21:08:41.000Z",
      "username": "ehode",
      "name": "Étienne",
      "biography": null,
      "avatar": null,
      "status": "online"
    },
    "to_user": {
      "id": 1,
      "created_at": "2026-03-27T20:42:33.825Z",
      "last_seen_at": "2026-03-27T21:08:41.000Z",
      "username": "ncorrear",
      "name": "Nolan",
      "biography": null,
      "avatar": null,
      "status": "online"
    },
    "created_at": "2026-03-27T21:06:58.492Z",
    "content": "Salut !",
    "attachment": null
  },
  ...
]
```

**Errors**

| Status | Description    |
| ------ | -------------- |
| 400    | Bad Request    |
| 404    | User not found |

## `POST /messages/mark-read`

### Description

Mark messages as read

### Rate Limit

- `30 requests` max per `1s`

### Request

**Body Parameters (optional)**

| Name    | Type   | Description    |
| ------- | ------ | -------------- |
| user_id | string | target user id |

### Response

**Success (204 No Content)**

**Errors**

| Status | Description    |
| ------ | -------------- |
| 400    | Bad Request    |
| 404    | User not found |

## `POST /message`

### Description

Send a message to a user

### Rate Limit

- `5 requests` max per `1s`

### Request

**Body Parameters**

| Name       | Type   | Description     | Optional |
| ---------- | ------ | --------------- | -------- |
| user_id    | string | target user id  | false    |
| content    | string | message content | true     |
| attachment | file   | attachment file | true     |

### Response

**Success (201 Created)**

```json
{
  "id": 1,
  "from_user": {
    "id": 2,
    "created_at": "2026-03-27T21:06:46.766Z",
    "last_seen_at": "2026-03-27T21:08:41.000Z",
    "username": "ehode",
    "name": "Étienne",
    "biography": null,
    "avatar": null,
    "status": "online"
  },
  "to_user": {
    "id": 1,
    "created_at": "2026-03-27T20:42:33.825Z",
    "last_seen_at": "2026-03-27T21:08:41.000Z",
    "username": "ncorrear",
    "name": "Nolan",
    "biography": null,
    "avatar": null,
    "status": "online"
  },
  "created_at": "2026-03-27T21:06:58.492Z",
  "content": "Salut !",
  "attachment": null
}
```

**Errors**

| Status | Description                                 |
| ------ | ------------------------------------------- |
| 400    | Bad Request                                 |
| 403    | Not friends with this user                  |
| 404    | User not found                              |
| 409    | Sending message to yourself                 |
| 422    | Content Moderation AI rejected your message |

## `DELETE /message`

### Description

Retrieve a message attachment

### Request

**Body Parameters**

| Name       | Type   | Description       | Optional |
| ---------- | ------ | ----------------- | -------- |
| message_id | string | target message id | false    |

### Response

**Success (200 OK)**

```json
{
  "message": "Message successfully deleted!"
}
```

**Errors**

| Status | Description       |
| ------ | ----------------- |
| 400    | Bad Request       |
| 403    | Message not yours |
| 404    | Message not found |

## `GET /message/:id/attachment`

### Description

Retrieve message attachment

### Request

**Path Parameters**

| Name | Type   | Required | Description |
| ---- | ------ | -------- | ----------- |
| id   | string | Yes      | message ID  |

### Response

**Success (200 OK)**

file

**Errors**

| Status | Description                         |
| ------ | ----------------------------------- |
| 400    | Bad Request                         |
| 401    | Unauthorized to view the attachment |
| 404    | Attachment not found                |
