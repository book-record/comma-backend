const { createRequest, createResponse } = require('node-mocks-http');

const User = require('../../models/User');
const authController = require('../auth');

jest.mock('../../models/User');
jest.mock('jsonwebtoken');

describe('authController', () => {
  describe('signIn', () => {
    const user = {
      id: 'id',
      email: 'email',
      nickname: 'nickname',
    };

    it('데이터 베이스에 유저에 대한 정보가 없다면 새로 생성한다', async () => {
      const req = createRequest();

      const res = createResponse();
      User.findOne = async () => {};
      User.create = jest.fn(async () => user);

      await authController.signIn(req, res);

      expect(User.create).toHaveBeenCalled();
    });

    it('데이터 베이스에 유저 정보가 있다면 새로 생성되면 안된다', async () => {
      const req = createRequest();

      const res = createResponse();
      User.findOne = async () => user;
      User.create = jest.fn(async () => {});

      await authController.signIn(req, res);

      expect(User.create).not.toHaveBeenCalled();
    });
  });
});
