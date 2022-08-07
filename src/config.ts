import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    AWS: {
      key: process.env.NODE_AWS_KEY,
      secret: process.env.NODE_AWS_SECRET,
      bucket: process.env.NODE_AWS_BUCKET,
    },
  };
});
