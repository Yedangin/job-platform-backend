import { Module } from '@nestjs/common';
import { AuthPrismaService } from 'libs/common/src';
import { VisaRulesModule } from '../visa-rules/visa-rules.module';
import { VisaJourneyAdminController } from './visa-journey-admin.controller';
import { VisaJourneyAdminService } from './visa-journey-admin.service';
import { VisaJourneyAssessmentService } from './visa-journey-assessment.service';
import { VisaJourneyController } from './visa-journey.controller';
import { VisaJourneyPathwayService } from './visa-journey-pathway.service';
import { VisaJourneyService } from './visa-journey.service';
import { VisaPolicyCommandService } from './visa-policy-command.service';
import { VisaPolicyAuditService } from './visa-policy-audit.service';
import { VisaPolicyDraftService } from './visa-policy-draft.service';
import { VisaPolicyIntegrityService } from './visa-policy-integrity.service';
import { VisaExpertAdminService } from './visa-expert-admin.service';

@Module({
  imports: [VisaRulesModule],
  controllers: [VisaJourneyController, VisaJourneyAdminController],
  providers: [
    AuthPrismaService,
    VisaJourneyService,
    VisaJourneyAssessmentService,
    VisaJourneyAdminService,
    VisaJourneyPathwayService,
    VisaPolicyCommandService,
    VisaPolicyAuditService,
    VisaPolicyDraftService,
    VisaPolicyIntegrityService,
    VisaExpertAdminService,
  ],
  exports: [
    VisaJourneyService,
    VisaJourneyAssessmentService,
    VisaPolicyCommandService,
    VisaPolicyAuditService,
  ],
})
export class VisaJourneyModule {}
