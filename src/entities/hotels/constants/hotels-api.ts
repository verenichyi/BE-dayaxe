import exceptions from './exceptions';
import { HotelEntity } from '../hotel.entity';

const { NotFound, InternalServerError } = exceptions;

const responses = {
  getAllHotels: {
    ApiOkResponse: { type: HotelEntity, isArray: true },
  },
  getHotelById: {
    ApiOkResponse: { type: HotelEntity },
    ApiNotFoundResponse: {
      schema: {
        type: 'object',
        example: NotFound,
      },
    },
  },
  addHotel: {
    ApiCreatedResponse: { type: HotelEntity },
    ApiInternalServerErrorResponse: {
      schema: {
        type: 'object',
        example: InternalServerError,
      },
    },
  },
  updateHotel: {
    ApiOkResponse: {
      type: HotelEntity,
    },
    ApiNotFoundResponse: {
      schema: {
        type: 'object',
        example: NotFound,
      },
    },
    ApiInternalServerErrorResponse: {
      schema: {
        type: 'object',
        example: InternalServerError,
      },
    },
  },
  deleteHotel: {
    ApiNotFoundResponse: {
      schema: {
        type: 'object',
        example: NotFound,
      },
    },
    ApiInternalServerErrorResponse: {
      schema: {
        type: 'object',
        example: InternalServerError,
      },
    },
  },
};

export default responses;
