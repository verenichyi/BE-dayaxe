import { Modules } from '../types/userTypes';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';

config();

const getDefaultUsersDocument = async () => {
  const password = await bcrypt.hash('admin', parseInt(process.env.CRYPT_SALT));

  return {
    username: 'admin',
    password,
    email: 'admin@mail.com',
    access: {
      [Modules.USERS]: ['create', 'read', 'update', 'delete'],
      [Modules.DAYCATION]: ['create', 'read', 'update', 'delete'],
      [Modules.HOTEL_PASSES]: ['create', 'read', 'update', 'delete'],
      [Modules.MOMENTS]: ['create', 'read', 'update', 'delete'],
      [Modules.PROMOTIONS]: ['create', 'read', 'update', 'delete'],
    },
  };
};

export default getDefaultUsersDocument;
