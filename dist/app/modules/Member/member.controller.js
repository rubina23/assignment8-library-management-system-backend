"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberControllers = void 0;
const member_service_1 = require("./member.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const createMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, membershipDate } = req.body;
        // if (!name || !email || !phone || !membershipDate) {
        //   return res.status(400).json({
        //     message: "All fields (name, email, phone, membershipDate) are required",
        //   });
        // }
        const result = yield member_service_1.MemberServices.createMember({
            name,
            email,
            phone,
            membershipDate,
        });
        (0, sendResponse_1.default)(res, {
            statusCode: 201,
            status: 201,
            success: true,
            message: "Member created successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Member already exists!",
            error: err.name,
        });
    }
});
const getAllMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield member_service_1.MemberServices.getAllMembers();
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            status: 200,
            message: "Members retrieved successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Member not found!",
        });
    }
});
const getMemberById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { memberId } = req.params;
        const result = yield member_service_1.MemberServices.getMemberById(memberId);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            status: 200,
            message: "Member retrieved successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Member not found!",
        });
    }
});
const updateMemberById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { memberId } = req.params;
        const { name, email, phone } = req.body;
        const updatedMemberData = {
            name,
            email,
            phone,
        };
        const result = yield member_service_1.MemberServices.updateMemberById(memberId, updatedMemberData);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            status: 200,
            message: "Member updated successfully",
            data: result,
        });
    }
    catch (err) {
        // next(err);
        res.status(500).json({
            success: false,
            message: "Member not found!",
        });
    }
});
const deleteMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { memberId } = req.params;
        const result = yield member_service_1.MemberServices.deleteMember(memberId);
        res.status(200).json({
            success: true,
            status: 200,
            message: "Member successfully deleted",
            //   data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.name || "Member not found!",
            error: err,
        });
    }
});
exports.MemberControllers = {
    createMember,
    getAllMembers,
    getMemberById,
    updateMemberById,
    deleteMember,
};
