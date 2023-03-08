type Host = {
  delete: true;
  create: true;
  update: true;
  read: true;
};

type Admin = {
  delete: false;
  create: true;
  update: true;
  read: true;
};

type Moderator = {
  delete: false;
  create: false;
  update: true;
  read: true;
};

type Spectator = {
  delete: false;
  create: false;
  update: false;
  read: true;
};

enum Modules {
  USERS = 'users',
  DAYCATION = 'daycation',
  HOTEL_PASSES = 'hotelPasses',
  MOMENTS = 'moments',
  PROMOTIONS = 'promotions',
}

type Role = Spectator | Moderator | Admin | Host | undefined;

export type AccessLevel = {
  [module in Modules]: Role;
};
