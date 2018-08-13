/**
 * Management class for handling S3 operations
 *
 * :NOTE:
 * This whole class-based architecture is completely unnecessary and this would be a lot
 * cleaner with pure functions, but we'll just keep following this pattern for now...
 *
 * @package: PandaFolio API
 * @author:  pospi <sam.pospi@consensys.net>
 * @since:   2018-08-07
 * @flow
 */

const AWS = require('aws-sdk');
const fileType = require('file-type');

const MIME_WHITELIST = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

class BucketMgr {

  constructor() {
    this.BLOB_STORAGE_BUCKET = null;
    this.BLOB_STORAGE_BASEURL = null;

    this.s3 = new AWS.S3();
  }

  isSecretsSet() {
    return this.BLOB_STORAGE_BUCKET !== null;
  }

  setSecrets(secrets) {
    this.BLOB_STORAGE_BUCKET = secrets.BLOB_STORAGE_BUCKET;
    this.BLOB_STORAGE_BASEURL = secrets.BLOB_STORAGE_BASEURL;
  }

  writeImage(baseName, imgData) {
    const buffer = new Buffer(imgData, 'base64');
    console.log(`Image data is ${buffer.length} bytes`);

    const mime = fileType(buffer);

    if (mime === null || !MIME_WHITELIST.includes(mime.mime)) {
      return Promise.reject(new Error("Invalid image"));
    }

    const storageKey = baseName + '-' + (new Date().getTime()) + '.' + mime.ext;

    const params = {
      Bucket: this.BLOB_STORAGE_BUCKET,
      Key: storageKey,
      Body: buffer,
      ContentType: mime.mime,
      ContentLength: buffer.length,
      ACL: 'public-read',
    };

    const baseUrl = this.BLOB_STORAGE_BASEURL;
    return new Promise((resolve, reject) => {
      this.s3.putObject(params, function(err, data) {
        if (err) {
          return reject(err);
        }
        console.log('response from S3:', data);
        resolve(`${baseUrl}${storageKey}`);
      });
    });
  }

}

module.exports = BucketMgr;
