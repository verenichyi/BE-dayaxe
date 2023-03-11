export enum Modules {
  USERS = 'Users',
  DAYCATION = 'Daycation',
  HOTEL_PASSES = 'Hotel Passes',
  MOMENTS = 'Moments',
  PROMOTIONS = 'Promotions',
}

export enum AccessTypes {
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type AccessType = 'create' | 'read' | 'update' | 'delete';

export type Access = {
  [module in Modules]: AccessType[];
};
