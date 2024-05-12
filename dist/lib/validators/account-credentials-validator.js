"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginCredentialsValidator = exports.AuthCredentialsValidator = void 0;
var zod_1 = require("zod");
exports.AuthCredentialsValidator = zod_1.z
    .object({
    email: zod_1.z.string().email(),
    password: zod_1.z
        .string()
        .min(6, {
        message: "Your password must be at least 6 - 14 characters long!",
    })
        .max(14, {
        message: "Your password must be at least 6 - 14 characters long!",
    }),
    confirmedPassword: zod_1.z.string().min(6).max(14),
})
    .refine(function (values) {
    return values.password === values.confirmedPassword;
}, {
    message: "Passwords must match!",
    path: ["confirmedPassword"],
});
exports.LoginCredentialsValidator = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z
        .string()
        .min(6, {
        message: "Your password must be at least 6 - 14 characters long!",
    })
        .max(14, {
        message: "Your password must be at least 6 - 14 characters long!",
    }),
});
