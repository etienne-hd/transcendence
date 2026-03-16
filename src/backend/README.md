# Backend

## Websocket

| Event            | Description                        | Data        |
| ---------------- | ---------------------------------- | ----------- |
| `friend:new`     | A new friend request was sent      | Caller Data |
| `friend:accept`  | A friend request was accepted      | Caller Data |
| `friend:delete`  | A friend was removed               | Caller Data |
| `friend:update`  | A friend has updated their profile | Caller Data |
| `message:new`    | A new message was received         | Caller Data |
| `message:delete` | A message was deleted              | Caller Data |

### Caller Data

```json
{
  "id": 1,
  "created_at": "2026-03-16T20:13:01.689Z",
  "last_seen_at": "2026-03-16T20:13:01.000Z",
  "username": "etienne",
  "name": "etienne",
  "biography": null,
  "avatar": null
}
```
