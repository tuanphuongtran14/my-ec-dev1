module.exports = ({ env }) => ({
    email: {
      provider: 'sendgrid',
      providerOptions: {
        apiKey: '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',
      },
      settings: {
        defaultFrom: "18521251@gm.uit.edu.vn",
        defaultReplyTo: "18521251@gm.uit.edu.vn",
        testAddress: '18521251@gm.uit.edu.vn'
      },
    },
  });