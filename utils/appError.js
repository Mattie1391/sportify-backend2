const appError = (status, errMessage, next) => {
    const error = new Error(errMessage);
    error.status = status;
    return error;
  }
  
  module.exports = appError;