import { Access, AccessTypes, Modules } from '../types/userTypes';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';

config();

const accessDefaultValue = Object.values(Modules).reduce((acc, cur) => {
  acc[cur] = [
    AccessTypes.Create,
    AccessTypes.Read,
    AccessTypes.Update,
    AccessTypes.Delete,
  ];

  return acc;
}, {} as Access);

const getDefaultUsersDocument = async () => {
  const password = await bcrypt.hash('admin', parseInt(process.env.CRYPT_SALT));

  return {
    username: 'admin',
    password,
    email: 'admin@mail.com',
    access: accessDefaultValue,
  };
};

export default getDefaultUsersDocument;
