"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSubscriber = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const User_1 = require("./User");
let UserSubscriber = class UserSubscriber {
    listenTo() {
        return User_1.User;
    }
    async beforeInsert(event) {
        const errors = await (0, class_validator_1.validate)(event.entity);
        if (errors.length > 0)
            throw new Error("Validation failed!");
    }
};
UserSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], UserSubscriber);
exports.UserSubscriber = UserSubscriber;
