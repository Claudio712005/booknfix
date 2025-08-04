import z from "zod";

export type UserType = "common" | "enterprise" | "enterprise-admin" | "any";

export const userTypeSchema = z.union([
    z.literal("common"),
    z.literal("enterprise"),
    z.literal("enterprise-admin"),
    z.literal("any")
]) satisfies z.ZodType<UserType>;