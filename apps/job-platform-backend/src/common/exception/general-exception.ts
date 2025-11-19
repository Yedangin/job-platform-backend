import {
  BadRequestException,
  ForbiddenException,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export const GENERAL_RESPONSE = {
  FAILED_CREATE_USER: {
    status: 'FAILED_CREATE_USER',
    message: 'User create failed',
  },
  FAILED_UPDATE_USER: {
    status: 'FAILED_UPDATE_USER',
    message: 'Update failed',
  },
  USER_NOT_FOUND: {
    status: 'USER_NOT_FOUND',
    message: 'User not found',
  },
  FAILED_DELETE_USER: {
    status: 'FAILED_DELETE_USER',
    message: 'Delete failed',
  },
};

export class FailDeleteUserException extends BadRequestException {
  constructor() {
    super(GENERAL_RESPONSE.FAILED_DELETE_USER);
  }
}

export class FailToFindUserExpection extends BadRequestException {
  constructor() {
    super(GENERAL_RESPONSE.USER_NOT_FOUND);
  }
}
export class FailCreateUserException extends BadRequestException {
  constructor() {
    super(GENERAL_RESPONSE.FAILED_CREATE_USER);
  }
}

export class FailUpdateUserException extends BadRequestException {
  constructor() {
    super(GENERAL_RESPONSE.FAILED_UPDATE_USER);
  }
}
