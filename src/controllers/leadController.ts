import { Request, Response } from "express";
import Lead, { LeadStatus } from "../models/Lead";

/**
 * @desc    Get all leads
 * @route   GET /api/leads
 * @access  Public
 */
export const getLeads = async (req: Request, res: Response): Promise<void> => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    console.error(
      `Error fetching leads: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

/**
 * @desc    Create a new lead
 * @route   POST /api/leads
 * @access  Public
 */
export const createLead = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, status } = req.body;

    // Check if lead with email already exists
    const existingLead = await Lead.findOne({ email });
    if (existingLead) {
      res.status(400).json({
        success: false,
        error: "A lead with this email already exists",
      });
      return;
    }

    // Create new lead
    const lead = await Lead.create({
      name,
      email,
      status: status || LeadStatus.NEW,
    });

    res.status(201).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    console.error(
      `Error creating lead: ${
        error instanceof Error ? error.message : String(error)
      }`
    );

    // Handle validation errors
    if (error instanceof Error && error.name === "ValidationError") {
      res.status(400).json({
        success: false,
        error: error.message,
      });
      return;
    }

    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
