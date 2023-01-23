export const createSessionRequestBody = {
    "$schema": "http://json-schema.org/draft-07/schema",
    "title": "CreateSessionRequestBody",
    "type": "object",
    "properties": {
        "email" : {
            "type" : "string"
        },
        "password" : {
            "type" : "string"
        }
    },
    "required": ["email", "password"]
}