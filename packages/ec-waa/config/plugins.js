module.exports = ({ env }) => ({
    email: {
      provider: 'sendgrid',
      providerOptions: {
        apiKey: env('SENDGRID_API_KEY'),
      },
      settings: {
        defaultFrom: "tuanphuongtran.14@gmail.com",
        defaultReplyTo: "tuanphuongtran.14@gmail.com",
        testAddress: 'tuanphuongtran.14@gmail.com'
      },
    },
  });