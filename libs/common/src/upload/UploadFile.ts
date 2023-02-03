import * as Upload from 'upload-js-full';

const UploadManager = new Upload.UploadManager(
  new Upload.Configuration({
    fetchApi: fetch,
    apiKey: 'YOUR_API_KEY',
  }),
);

UploadManager.upload({
  accountId: 'YOUR_ACCOUNT_ID',
  data: 'YOUR_DATA',
  mime: 'YOUR_MIME',
  originalFileName: 'YOUR_ORIGINAL_FILE_NAME',
  maxConcurrentUploadParts: 5,
  metadata: {},
  tags: [],
  path: {
    fileName: 'YOUR_FILE_NAME',
    folderPath: 'YOUR_FOLDER_PATH',
  },
  cancellationToken: {
    isCancelled: false,
  },
}).then(
  ({ fileUrl, filePath }) => {
    console.log(fileUrl, filePath);
  },
  (error) => {
    console.log(error);
  },
);
