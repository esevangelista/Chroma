import compose from 'lodash/fp/compose';
import { sendEmail } from '../../../services/mailer';
import { generateOptions } from './generateOptions';

export const sendConfirmYourAccountEmail = compose(
  sendEmail,
  generateOptions,
);

