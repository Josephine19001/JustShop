import * as nodemailer from 'nodemailer'

interface Options {
  [key: string]: string;
}

const sendEmail = async function (options: Options) {
  const transporter: nodemailer.Transporter = nodemailer.createTransport({
    port: 25,
    secure: false,
    logger: true,
    debug: true,
    ignoreTLS: true, // add this
    service: 'GMAIL',
    auth: {
      user: process.env.USERNAME,
      pass: process.env.PASSWORD,
    },
  })
  return await transporter.sendMail({
    subject: options.subject,
    text: options.message,
    html: '',
    from: `${process.env.SMTP_NAME}/3000`,
    to: options.email,
  })
}

export default sendEmail
