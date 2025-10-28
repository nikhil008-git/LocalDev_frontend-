const { z } = require('zod');

const userSignupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters") // ⚠️ "issue" is only 5
});

const userSigninSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "Password is required")
});

module.exports = {
    userSignupSchema,
    userSigninSchema
};