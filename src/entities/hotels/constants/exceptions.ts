const exceptions = {
  NotFound: {
    status: 404,
    message: 'Hotel not found',
    error: 'Not Found',
  },
  InternalServerError: {
    status: 500,
    message: 'File processing error',
    error: 'Internal Server Error',
  },
};

export default exceptions;
