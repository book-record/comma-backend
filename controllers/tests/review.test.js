const { createRequest, createResponse } = require('node-mocks-http');

const Review = require('../../models/Review');
const reviewController = require('../review');

jest.mock('../../models/Review');

describe('reviewController', () => {
  const reviewerId = '621ba31416b34df406458cc5';
  const user = {
    userId: 'userId',
    reviewerId,
    good: true,
  };
  it('body로 받은 배열에 유저가 존재하지 않는다면 error를 반환한다', async () => {
    const req = createRequest({
      body: user,
    });
    const res = createResponse();

    await reviewController.updateReview(req, res);
    const result = { error: '존재하지 않습니다' };

    expect(res._getData()).toEqual(JSON.stringify(result));
  });

  it('body로 받은 배열에 유저가 존재하는지 확인하기', async () => {
    const req = createRequest({
      body: user,
    });
    const res = createResponse();

    Review.findById = async () => user.userId;

    await reviewController.updateReview(req, res);

    const result = { result: 'ok' };

    expect(res._getData()).toEqual(JSON.stringify(result));
  });
});
