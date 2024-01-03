class ResponseHandler {
  constructor(res) {
    this.res = res;
  }

  success(data, statusCode = 200) {
    return this.res.status(statusCode).json({ data: data });
  }

  error(err, statusCode = 500) {
    return this.res
      .status(statusCode)
      .json({ errorCode: statusCode, error: err });
  }
}

module.exports = ResponseHandler;
