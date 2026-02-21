import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '../../../generated/prisma-user';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // --- Individual Profile Methods ---

  async createIndividualProfile(data: Prisma.ProfileIndividualCreateInput) {
    return this.prisma.profileIndividual.create({
      data,
    });
  }

  async getIndividualProfile(authId: bigint) {
    const profile = await this.prisma.profileIndividual.findUnique({
      where: { authId },
      include: {
        careers: true,
        educations: true,
        languages: true,
      },
    });

    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }

  // --- Career Management & Calculation Logic ---

  async addCareer(
    individualId: bigint,
    data: Prisma.ProfileCareerCreateWithoutProfileIndividualInput,
  ) {
    const career = await this.prisma.profileCareer.create({
      data: {
        ...data,
        profileIndividual: { connect: { individualId } },
      },
    });

    // Career အသစ်ထည့်ပြီးတိုင်း လအရေအတွက် ပြန်တွက်မယ်
    await this.updateTotalCareerMonths(individualId);
    return career;
  }

  async updateCareer(careerId: bigint, data: Prisma.ProfileCareerUpdateInput) {
    const career = await this.prisma.profileCareer.update({
      where: { careerId },
      data,
    });

    // Update လုပ်ပြီးတိုင်း ပြန်တွက်မယ်
    await this.updateTotalCareerMonths(career.individualId);
    return career;
  }

  async deleteCareer(careerId: bigint) {
    const career = await this.prisma.profileCareer.delete({
      where: { careerId },
    });

    // ဖျက်ပြီးတိုင်း ပြန်တွက်မယ်
    await this.updateTotalCareerMonths(career.individualId);
    return { success: true };
  }

  /**
   * Career လအရေအတွက် စုစုပေါင်းကို တွက်ချက်ပြီး Profile တွင် သိမ်းဆည်းခြင်း
   */
  private async updateTotalCareerMonths(individualId: bigint) {
    const careers = await this.prisma.profileCareer.findMany({
      where: { individualId },
    });

    let totalMonths = 0;
    const now = new Date();

    for (const career of careers) {
      const startDate = new Date(career.startDate);
      // လက်ရှိလုပ်ကိုင်နေဆဲဆိုရင် ယနေ့ရက်စွဲကို ယူမယ်၊ မဟုတ်ရင် ထွက်ခဲ့တဲ့ရက်စွဲကို ယူမယ်
      const endDate = career.isCurrent
        ? now
        : career.endDate
          ? new Date(career.endDate)
          : now;

      // လအရေအတွက် ကွာခြားချက်ကို တွက်ချက်ခြင်း
      const months =
        (endDate.getFullYear() - startDate.getFullYear()) * 12 +
        (endDate.getMonth() - startDate.getMonth());

      if (months > 0) {
        totalMonths += months;
      }
    }

    // Profile မှာ ပြန်လည် Update လုပ်ခြင်း
    await this.prisma.profileIndividual.update({
      where: { individualId },
      data: { totalCareerMonths: totalMonths },
    });
  }

  // --- Corporate Profile Methods ---

  async createCorporateProfile(data: Prisma.ProfileCorporateCreateInput) {
    return this.prisma.profileCorporate.create({
      data,
    });
  }

  async getCorporateProfile(authId: bigint) {
    return this.prisma.profileCorporate.findUnique({
      where: { authId },
    });
  }
}
