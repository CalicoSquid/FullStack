New Note Diagram, SPA

```mermaid
sequenceDiagram
    participant Browser
    participant Server
    note over Browser, Server: User submits new note

    Browser->>Server: POST /exampleapp/new_note_spa
    Server-->>Browser:201 Created. Payload: {content: "Hello World", date: "2023-12-14T19:33:43.232Z"}

    note over Browser, Server: Resources loaded successfully


```