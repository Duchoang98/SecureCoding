"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
class ValidationError extends Error {
    constructor(message, target, property) {
        super(message);
        this.target = target;
        this.property = property;
    }
}
exports.ValidationError = ValidationError;
