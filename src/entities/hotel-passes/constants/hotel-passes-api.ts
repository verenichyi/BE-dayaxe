import exceptions from './exceptions';
import { HotelPassesEntity } from '../hotel-passes.entity';

const { NotFound, InternalServerError } = exceptions;

const responses = {
  searchHotels: {
    ApiOkResponse: { type: HotelPassesEntity, isArray: true },
  },
  getAllHotelPasses: {
    ApiOkResponse: { type: HotelPassesEntity, isArray: true },
  },
  getHotelPassById: {
    ApiOkResponse: { type: HotelPassesEntity },
    ApiNotFoundResponse: {
      schema: {
        type: 'object',
        example: NotFound,
      },
    },
  },
  addHotelPass: {
    ApiCreatedResponse: { type: HotelPassesEntity },
    ApiInternalServerErrorResponse: {
      schema: {
        type: 'object',
        example: InternalServerError,
      },
    },
  },
  updateHotelPass: {
    ApiOkResponse: {
      type: HotelPassesEntity,
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
  deleteHotelPass: {
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
