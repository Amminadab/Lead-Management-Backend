import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";

/**
 * Middleware to validate request data using express-validator
 * @param validations Array of validation chains
 * @returns Middleware function
 */
export const validateRequest = (validations: ValidationChain[]) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    // Run all validations
    await Promise.all(validations.map((validation) => validation.run(req)));

    // Check for validation errors
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
      return;
    }

    // Return validation errors
    res.status(400).json({
      success: false,
      errors: errors.array().map((err) => ({
        field: typeof err === "object" && "path" in err ? err.path : "unknown",
        message: err.msg,
      })),
    });
  };
};
