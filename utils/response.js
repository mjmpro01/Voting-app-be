const createResponseObject = (message, data, errors) => {
  const responseObject = {
    message: 'Hello',
    data: {},
    errors: [],
  };
  if (message) {
    responseObject.message = message;
  }
  
  if (data) {
    responseObject.data = data;
  }

  if (errors) {
    responseObject.errors = errors;
  } else {
    delete responseObject.errors;
  }

  return responseObject;
}

module.exports = {
  createResponseObject
}