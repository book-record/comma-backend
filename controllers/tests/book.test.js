const { createRequest, createResponse } = require('node-mocks-http');

const Book = require('../../models/Book');
const dummyBooks = require('../../models/sample_book.json');
const bookController = require('../book');

jest.mock('../../models/Book');

describe('bookController', () => {
  describe('createBook', () => {
    it('해당 요청에 책 데이터를 받아온다', async () => {
      const books = {
        title: 'title',
        authors: 'authors',
        thumbnail: 'thumbnail',
        contents: 'contents',
      };
      const req = createRequest({
        body: books,
      });
      const res = createResponse();

      Book.find = async () => dummyBooks;
      Book.create = jest.fn(async () => {});

      await bookController.createBook(req, res);
      const result = { result: 'ok' };
      expect(res._getData()).toEqual(JSON.stringify(result));
    });
  });
});
