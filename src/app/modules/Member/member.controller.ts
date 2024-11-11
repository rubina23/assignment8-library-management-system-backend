import { NextFunction, Request, Response } from "express";
import { MemberServices } from "./member.service";
import sendResponse from "../../../shared/sendResponse";

const createMember = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, membershipDate } = req.body;

    // if (!name || !email || !phone || !membershipDate) {
    //   return res.status(400).json({
    //     message: "All fields (name, email, phone, membershipDate) are required",
    //   });
    // }

    const result = await MemberServices.createMember({
      name,
      email,
      phone,
      membershipDate,
    });
    sendResponse(res, {
      statusCode: 201,
      status: 201,
      success: true,
      message: "Member created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Member already exists!",
      error: err.name,
    });
  }
};

const getAllMembers = async (req: Request, res: Response) => {
  try {
    const result = await MemberServices.getAllMembers();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      status: 200,
      message: "Members retrieved successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Member not found!",
    });
  }
};

const getMemberById = async (req: Request, res: Response) => {
  try {
    const { memberId } = req.params;
    const result = await MemberServices.getMemberById(memberId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      status: 200,
      message: "Member retrieved successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Member not found!",
    });
  }
};

const updateMemberById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { memberId } = req.params;
    const { name, email, phone } = req.body;
    const updatedMemberData = {
      name,
      email,
      phone,
    };
    const result = await MemberServices.updateMemberById(
      memberId,
      updatedMemberData
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      status: 200,
      message: "Member updated successfully",
      data: result,
    });
  } catch (err) {
    // next(err);
    res.status(500).json({
      success: false,
      message: "Member not found!",
    });
  }
};

const deleteMember = async (req: Request, res: Response) => {
  try {
    const { memberId } = req.params;
    const result = await MemberServices.deleteMember(memberId);

    res.status(200).json({
      success: true,
      status: 200,
      message: "Member successfully deleted",
      //   data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.name || "Member not found!",
      error: err,
    });
  }
};

export const MemberControllers = {
  createMember,
  getAllMembers,
  getMemberById,
  updateMemberById,
  deleteMember,
};
