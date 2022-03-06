const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KET_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const storage = multerS3({
  s3: s3,
  bucket: process.env.AWS_BUCKET_NAME,
  key: function (req, file, callback) {
    try {
      const fileType = file.mimetype.split('/')[0] !== 'audio';
      if (fileType) {
        return callback(new Error('에러가 발생했습니다'));
      }

      const fileNameArray = file.originalname.split('.');

      callback(
        null,
        'audio' + Date.now() + '.' + fileNameArray[fileNameArray.length - 1]
      );
    } catch (err) {
      return callback(new Error('에러가 발생했습니다'));
    }
  },
  acl: 'public-read',
});

const audioFileUpload = multer({
  storage,
});

module.exports = audioFileUpload;
