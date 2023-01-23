export const CreateUserRequestBody = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "CreateUserRequestBody",
    "type" : "object",
    "properties": {
        "firstname" :{
            "type" : "string"
        },
        "lastname" : {
            "type" : "string"
        },
        "email" : {
            "type" : "string"
        },
        "password" : {
            "type" : "string"
        },
        "passwordConfirmation" : {
            "type" : "string"
        }
    },
    "required" : ["firstname", "lastname", "email", "password", "passwordConfirmation"]
}