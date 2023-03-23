import { PublicUserEntity } from '../public-user.entity';
import exceptions from './exceptions';

const {
  UnprocessableEntity,
  InvalidFavoriteBodyBadRequest,
  InvalidIdBadRequest,
  InvalidBodyBadRequest,
  NotFound,
  Conflict,
} = exceptions;

const responses = {
  getAllUsers: {
    ApiOkResponse: { type: PublicUserEntity, isArray: true },
  },
  getUserById: {
    ApiOkResponse: { type: PublicUserEntity },
    ApiNotFoundResponse: {
      schema: {
        type: 'object',
        example: NotFound,
      },
    },
    ApiBadRequestResponse: {
      schema: {
        type: 'object',
        example: InvalidIdBadRequest,
      },
    },
  },
  createUser: {
    ApiCreatedResponse: { type: PublicUserEntity },
    ApiBadRequestResponse: {
      schema: {
        type: 'object',
        example: InvalidBodyBadRequest,
      },
    },
    ApiConflictResponse: {
      schema: {
        type: 'object',
        example: Conflict,
      },
    },
  },
  deleteUser: {
    ApiOkResponse: {
      type: PublicUserEntity,
    },
    ApiNotFoundResponse: {
      schema: {
        type: 'object',
        example: NotFound,
      },
    },
    ApiBadRequestResponse: {
      schema: {
        type: 'object',
        example: InvalidIdBadRequest,
      },
    },
  },
  updateUser: {
    ApiOkResponse: {
      type: PublicUserEntity,
    },
    ApiNotFoundResponse: {
      schema: {
        type: 'object',
        example: NotFound,
      },
    },
    ApiBadRequestResponse: {
      schema: {
        type: 'object',
        example: InvalidBodyBadRequest,
      },
    },
    ApiConflictResponse: {
      schema: {
        type: 'object',
        example: Conflict,
      },
      description: 'Conflicting Request',
    },
  },
  favoriteHotelPasses: {
    ApiOkResponse: {
      type: PublicUserEntity,
    },
    ApiNotFoundResponse: {
      schema: {
        type: 'object',
        example: NotFound,
      },
    },
    ApiBadRequestResponse: {
      schema: {
        type: 'object',
        example: InvalidFavoriteBodyBadRequest,
      },
    },
    ApiUnprocessableEntityResponse: {
      schema: {
        type: 'object',
        example: UnprocessableEntity,
      },
    },
  },
};

export default responses;
