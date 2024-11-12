"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberRoutes = void 0;
const express_1 = __importDefault(require("express"));
const member_controller_1 = require("./member.controller");
const router = express_1.default.Router();
router.post("/", member_controller_1.MemberControllers.createMember);
router.get("/", member_controller_1.MemberControllers.getAllMembers);
router.get("/:memberId", member_controller_1.MemberControllers.getMemberById);
router.put("/:memberId", member_controller_1.MemberControllers.updateMemberById);
router.delete("/:memberId", member_controller_1.MemberControllers.deleteMember);
exports.memberRoutes = router;
