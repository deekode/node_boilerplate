module.exports = {
  Paginator: async (req, res, next) => {
    var pageNo = parseInt(req.query.pageNo);
    var size = parseInt(req.query.size);
    var querys = {};

    if (pageNo < 0 || pageNo === 0) {
      response = {
        status: false,
        errors: "invalid page number, should start with 1"
      };
      return res.status(400).json(response);
    }
    querys.skip = size * (pageNo - 1);
    querys.limit = size;
    req.querys = querys;
    next();
  }
};
