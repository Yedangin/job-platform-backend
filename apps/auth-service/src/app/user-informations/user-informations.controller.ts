import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
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
  CreateUserInformationResponse,
} from 'types/auth/user-information';
import { httpToGrpcStatus } from '@in-job/common';

@Controller()
export class UserInformationsController {
  constructor(
    private readonly userInformationsService: UserInformationsService
  ) {}

  @GrpcMethod('UserInformationService', 'CreateUserInformation')
  async CreateUserInformation(
    request: CreateUserInformationRequest
  ): Promise<CreateUserInformationResponse> {
    try {
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
    } catch (error: any) {
      // Re-throw the error as a gRPC RpcException
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('UserInformationService', 'GetAllUserInformations')
  async GetAllUserInformations(
    request: GetAllUserInformationsRequest
  ): Promise<AllUserInformationsWithMetaResponse> {
    try {
      const userInformations = await this.userInformationsService.findAll(
        request.basicQuery
      );
      return userInformations;
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('UserInformationService', 'GetUserInformation')
  async GetUserInformation(
    request: GetUserInformationRequest
  ): Promise<UserInformationResponse> {
    try {
      return this.userInformationsService.findOne(request.userId);
    } catch (error: any) {
      // Re-throw the error as a gRPC RpcException
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('UserInformationService', 'UpdateUserInformation')
  async UpdateUserInformation(
    request: UpdateUserInformationRequest
  ): Promise<CreateUserInformationResponse> {
    try {
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
    } catch (error: any) {
      // Re-throw the error as a gRPC RpcException
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('UserInformationService', 'DeleteUserInformation')
  async DeleteUserInformation(
    request: DeleteUserInformationRequest
  ): Promise<DeleteUserInformationResponse> {
    try {
      return this.userInformationsService.remove(request.userId);
    } catch (error: any) {
      // Re-throw the error as a gRPC RpcException
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }
}
