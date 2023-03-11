import { SetMetadata } from '@nestjs/common';
import { AccessType, Modules } from './types/userTypes';

export type ModuleAccessType = {
  module: Modules;
  accessType: AccessType;
};

export const MODULE_ACCESS_TYPE_KEY = 'access_type';
export const ModuleAccess = ({ module, accessType }: ModuleAccessType) =>
  SetMetadata(MODULE_ACCESS_TYPE_KEY, { module, accessType });
