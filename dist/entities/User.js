"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const ValidationError_1 = require("../specs/entities/ValidationError");
const Session_1 = require("./Session");
let User = class User {
    validate() {
        if (!this.firstName) {
            throw new ValidationError_1.ValidationError("The firstName need to be specified", this, "firstName");
        }
        if (!this.lastName) {
            throw new ValidationError_1.ValidationError("The lastName need to be specified", this, "lastName");
        }
        if (!this.email) {
            throw new ValidationError_1.ValidationError("The email need to be specified", this, "email");
        }
        if (!this.passwordHash) {
            throw new ValidationError_1.ValidationError("The passwordHash need to be specified", this, "passwordHash");
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({
        type: "varchar",
        transformer: {
            from: (email) => email,
            to: (email) => email.toLowerCase()
        },
        unique: true
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], User.prototype, "passwordHash", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Session_1.Session, session => session.user),
    __metadata("design:type", Promise)
], User.prototype, "sessions", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "validate", null);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
