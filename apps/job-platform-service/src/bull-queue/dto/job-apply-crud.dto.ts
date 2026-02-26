import { ActorType } from 'generated/prisma-job';

export class PackagePriceDto {
  id!: string | null;
  price!: number;
  package_id!: string;
  deleted!: boolean;
}

export class JobApplyDataDto {
  id!: string;
  proposedTime!: string;
  proposedBy!: ActorType;
  selectedSlotId!: number;
}
