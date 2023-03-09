enum Modules {
  USERS = 'users',
  DAYCATION = 'daycation',
  HOTEL_PASSES = 'hotelPasses',
  MOMENTS = 'moments',
  PROMOTIONS = 'promotions',
}

type AccessType = 'create' | 'read' | 'update' | 'delete';

export type Access = {
  [module in Modules]: AccessType[];
};
