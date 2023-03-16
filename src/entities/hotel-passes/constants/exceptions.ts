const exceptions = {
  NotFound: {
    status: 404,
    message: 'Hotel Pass not found',
    error: 'Not Found',
  },
  InternalServerError: {
    status: 500,
    message: 'File processing error',
    error: 'Internal Server Error',
  },
};

export default exceptions;
