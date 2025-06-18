import { GeneralResponseType } from '../types/general-response';

export const SUCCESS_RESPONSE: GeneralResponseType = {
  SUCCESS_CREATE_USER: {
    status: 'SUCCESS_CREATE_USER',
    message: 'User created successfully',
  },
  SUCCESS_UPDATE_USER: {
    status: 'SUCCESS_UPDATE_USER',
    message: 'Updated successfully',
  },
  SUCCESS_DELETE_USER: {
    status: 'SUCCESS_DELETE_USER',
    message: 'User deleted successfully',
  },
};
