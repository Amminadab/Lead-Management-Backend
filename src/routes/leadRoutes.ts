import express from "express";
import { getLeads, createLead } from "../controllers/leadController";
import { validateRequest } from "../middleware/validateRequest";
import { createLeadSchema } from "../utils/validationSchemas";

const router = express.Router();

// @route   GET /api/leads
// @desc    Get all leads
router.get("/", getLeads);

// @route   POST /api/leads
// @desc    Create a new lead
router.post("/", validateRequest(createLeadSchema), createLead);

export default router;
