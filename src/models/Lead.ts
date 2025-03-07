import mongoose, { Document, Schema } from "mongoose";

// Define the status enum values
export enum LeadStatus {
  NEW = "New",
  ENGAGED = "Engaged",
  PROPOSAL_SENT = "Proposal Sent",
  CLOSED_WON = "Closed-Won",
  CLOSED_LOST = "Closed-Lost",
}

// Define the Lead document interface
export interface ILead extends Document {
  name: string;
  email: string;
  status: LeadStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Create the Lead schema
const leadSchema = new Schema<ILead>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    status: {
      type: String,
      enum: Object.values(LeadStatus),
      default: LeadStatus.NEW,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create and export the Lead model
const Lead = mongoose.model<ILead>("Lead", leadSchema);

export default Lead;
