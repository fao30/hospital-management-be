class ResponseHandler {
  constructor(res) {
    this.res = res;
  }

  success(data, status = 200) {
    return this.res.status(status).json({ data });
  }
}

module.exports = ResponseHandler;
