import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserInformationsService } from './user-informations.service';
import {
  AllUserInformationsWithMetaResponse,
  GetAllUserInformationsRequest,
  GetUserInformationRequest,
  CreateUserInformationRequest,
  UpdateUserInformationRequest,
  DeleteUserInformationRequest,
  UserInformationResponse,
  DeleteUserInformationResponse,
} from 'types/auth/user-information';

@Controller()
export class UserInformationsController {
  constructor(
    private readonly userInformationsService: UserInformationsService,
  ) {}

  @GrpcMethod('UserInformationService', 'CreateUserInformation')
  async CreateUserInformation(
    request: CreateUserInformationRequest,
  ): Promise<UserInformationResponse> {
    return this.userInformationsService.create({
      userId: request.userId,
      profileImage: request.profileImage,
      gender: request.gender,
      address: request.address,
      country: request.country,
      city: request.city,
      cvForm: request.cvForm,
      additionalInformation: request.additionalInformation,
    });
  }

  @GrpcMethod('UserInformationService', 'GetAllUserInformations')
  async GetAllUserInformations(
    request: GetAllUserInformationsRequest,
  ): Promise<AllUserInformationsWithMetaResponse> {
    const userInformations = await this.userInformationsService.findAll(
      request.basicQuery,
    );
    return userInformations;
  }

  @GrpcMethod('UserInformationService', 'GetUserInformation')
  async GetUserInformation(
    request: GetUserInformationRequest,
  ): Promise<UserInformationResponse> {
    return this.userInformationsService.findOne(request.userId);
  }

  @GrpcMethod('UserInformationService', 'UpdateUserInformation')
  async UpdateUserInformation(
    request: UpdateUserInformationRequest,
  ): Promise<UserInformationResponse> {
    return this.userInformationsService.update(request.userId, {
      userId: request.userId,
      profileImage: request.profileImage,
      gender: request.gender,
      address: request.address,
      country: request.country,
      city: request.city,
      cvForm: request.cvForm,
      additionalInformation: request.additionalInformation,
    });
  }

  @GrpcMethod('UserInformationService', 'DeleteUserInformation')
  async DeleteUserInformation(
    request: DeleteUserInformationRequest,
  ): Promise<DeleteUserInformationResponse> {
    return this.userInformationsService.remove(request.userId);
  }
}
