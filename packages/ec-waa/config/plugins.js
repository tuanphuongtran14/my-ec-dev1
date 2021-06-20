module.exports = ({ env }) => ({
    email: {
      provider: 'sendgrid',
      providerOptions: {
        apiKey: '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',
      },
      settings: {
        defaultFrom: "tuanphuongtran.14@gmail.com",
        defaultReplyTo: "tuanphuongtran.14@gmail.com",
        testAddress: 'tuanphuongtran.14@gmail.com'
      },
    },
  });