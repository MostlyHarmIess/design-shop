// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const { ADMIN_EMAIL, SENDGRID_API_KEY } = process.env;

const handler = async (req, res) => {
  res.status(200).end();
};

export default handler;
