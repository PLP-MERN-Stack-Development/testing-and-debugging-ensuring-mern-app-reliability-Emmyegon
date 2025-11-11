
const { authMiddleware, errorHandler } = require('../../src/middleware');
const jwt = require('jsonwebtoken');

describe('Middleware Functions', () => {
  describe('authMiddleware', () => {
    let req, res, next;

    beforeEach(() => {
      req = {
        headers: {},
      };
      res = {};
      next = jest.fn();
    });

    it('should call next if valid token is provided', () => {
      const token = jwt.sign({ id: 'user123' }, process.env.JWT_SECRET);
      req.headers.authorization = `Bearer ${token}`;

      authMiddleware(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(req.user).toBeDefined();
    });

    it('should return 401 if no token is provided', () => {
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn();

      authMiddleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 if token is invalid', () => {
      req.headers.authorization = 'Bearer invalid-token';
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn();

      authMiddleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
    });
  });

  describe('errorHandler', () => {
    let req, res, next;

    beforeEach(() => {
      req = {};
      res = {
        status: jest.fn().mockReturnValue(res),
        json: jest.fn(),
      };
      next = jest.fn();
    });

    it('should handle errors correctly', () => {
      const error = new Error('Test error');
      error.status = 400;

      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Test error',
      });
    });

    it('should return 500 for unknown errors', () => {
      const error = new Error('Unknown error');

      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
