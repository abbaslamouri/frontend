import Email from '~/server/utils/Email'
import { useBody } from 'h3'
import errorHandler from '~/server/utils/errorHandler'
import sgMail from '@sendgrid/mail'

export default async (req, res) => {
  res.statusCode = 200

  if (req.method === 'POST') {
    try {
      const { user, url, action } = await useBody(req)
      console.log('HHHHHH', user, url, action)
      let subject = ''
      let template_id = ''

      switch (action) {
        case 'signup':
          subject = 'Welcome onboard!'
          template_id = process.env.SIGNUP_TEMPLATE_ID

          break

        default:
          break
      }
      sgMail.setApiKey(process.env.SENDGRID_API_KEY)

      const msg = {
        to: {
          email: user.email,
          name: user.name,
        },

        from: {
          email: 'support@yrlus.com',
          name: 'YRL Consulting',
        },
        replyTo: {
          email: 'support@yrlus.com',
          name: 'Abbas Lamouri',
        },
        subject,
        template_id,
        dynamic_template_data: {
          user: user.name,
          url,
        },
      }
      console.log('here')

      await sgMail.send(msg)
      console.log('there')

      return {
        user,
        url,
        message: `Email sent to ${user.email}.  Please follow the link in your email to complete your registration.  Please note you have 1 hour to verify your email`,
      }
    } catch (error) {
      const err = errorHandler(error)
      res.statusCode = err.statusCode
      return err.message
    }
  }
}
