import { Modules } from '../types/userTypes';

const admin = {
  username: 'admin',
  password: 'admin',
  email: 'admin@mail.com',
  access: {
    [Modules.USERS]: ['create', 'read', 'update', 'delete'],
    [Modules.DAYCATION]: ['create', 'read', 'update', 'delete'],
    [Modules.HOTEL_PASSES]: ['create', 'read', 'update', 'delete'],
    [Modules.MOMENTS]: ['create', 'read', 'update', 'delete'],
    [Modules.PROMOTIONS]: ['create', 'read', 'update', 'delete'],
  },
};

export default admin;
