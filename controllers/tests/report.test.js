const { createRequest, createResponse } = require('node-mocks-http');

const Report = require('../../models/Report');
const dummyReports = require('../../models/sample_report.json');
const reportController = require('../report');

jest.mock('../../models/Report');

describe('reportController', () => {
  describe('getReport', () => {
    it('id와 일치하는 책을 찾아 반환한다', async () => {
      reportId = '61fb6ad0939afdfb71e704ae';
      const req = createRequest({
        params: {
          id: reportId,
        },
      });
      const res = createResponse();

      const report = dummyReports.find((report) => report.id === reportId);
      Report.findById = async () => report;

      await reportController.getReport(req, res);
      expect(res._getData()).toEqual(JSON.stringify(report));
    });
  });
});
