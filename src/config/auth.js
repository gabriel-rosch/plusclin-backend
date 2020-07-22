require('dotenv/config');
export default {
  secret: process.env.SECRET,
  expireIn: '7d',
};
