exports = async function (arg) {
  const AWS_CONFIG = {
    credentials: {
      accessKeyId: `<accessKeyId>`,
      secretAccessKey: `<secretAccessKey>
    },
    region: '<your-region>',
  }
  return AWS_CONFIG
};
