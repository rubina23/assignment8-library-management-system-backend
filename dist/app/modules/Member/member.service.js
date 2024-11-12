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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberServices = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createMember = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const memberData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        membershipDate: new Date(data.membershipDate),
    };
    // Save the new member in the database
    const newMember = yield prisma.member.create({
        data: memberData,
    });
    return newMember;
});
const getAllMembers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.member.findMany();
    return result;
});
const getMemberById = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.member.findUnique({
        where: {
            memberId: memberId,
        },
    });
});
const updateMemberById = (memberId, data) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.member.update({
        where: {
            memberId: memberId,
        },
        data: data,
    });
});
const deleteMember = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.member.delete({
        where: {
            memberId: memberId,
        },
    });
});
exports.MemberServices = {
    createMember,
    getAllMembers,
    getMemberById,
    updateMemberById,
    deleteMember,
};
