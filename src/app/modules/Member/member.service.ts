import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createMember = async (data: {
  name: string;
  email: string;
  phone: string;
  membershipDate: string;
}) => {
  const memberData = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    membershipDate: new Date(data.membershipDate),
  };

  // Save the new member in the database
  const newMember = await prisma.member.create({
    data: memberData,
  });
  return newMember;
};

const getAllMembers = async () => {
  const result = await prisma.member.findMany();
  return result;
};

const getMemberById = async (memberId: string) => {
  return prisma.member.findUnique({
    where: {
      memberId: memberId,
    },
  });
};

const updateMemberById = async (memberId: string, data: any) => {
  return prisma.member.update({
    where: {
      memberId: memberId,
    },
    data: data,
  });
};

const deleteMember = async (memberId: string) => {
  return prisma.member.delete({
    where: {
      memberId: memberId,
    },
  });
};

export const MemberServices = {
  createMember,
  getAllMembers,
  getMemberById,
  updateMemberById,
  deleteMember,
};
