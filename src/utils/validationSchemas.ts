import { body } from "express-validator";
import { LeadStatus } from "../models/Lead";

/**
 * Validation schema for creating a new lead
 */
export const createLeadSchema = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("status")
    .optional()
    .isIn(Object.values(LeadStatus))
    .withMessage(
      `Status must be one of: ${Object.values(LeadStatus).join(", ")}`
    ),
];
