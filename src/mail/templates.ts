import { join } from 'path';

export const ResolvedRequest = (email: string, requestId: number) => {
  return {
    to: email,
    subject: 'Resolved request',
    template: join(__dirname, '/../mail/templates', 'resolve-request'),
    context: {
      requestId,
    },
  };
};

export const CreatedRequest = (email: string, requestId: number) => {
  return {
    to: email,
    subject: 'Created request',
    template: join(__dirname, '/../mail/templates', 'create-request'),
    context: {
      requestId,
    },
  };
};

export const Signup = (email: string, password: string) => {
  return {
    to: email,
    subject: 'Signup',
    template: join(__dirname, '/../mail/templates', 'signup'),
    context: {
      password,
    },
  };
};
