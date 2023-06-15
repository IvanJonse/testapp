import { HttpException, HttpStatus } from '@nestjs/common';

export class PasswordError extends HttpException {
  constructor() {
	super(
	  {
		message: 'Wrong password'
	  },
	  HttpStatus.UNAUTHORIZED
	);
  }
}

export class EmailError extends HttpException {
  constructor() {
	super(
	  {
		message: 'Wrong email'
	  },
	  HttpStatus.UNAUTHORIZED
	);
  }
}

export class NotAuthorized extends HttpException {
  constructor() {
	super(
	  {
		message: 'you\'re not authorized'
	  },
	  HttpStatus.UNAUTHORIZED
	);
  }
}

export class AlreadyExists extends HttpException {
  constructor() {
	super(
	  {
		message: 'Already exists'
	  },
	  HttpStatus.CONFLICT
	);
  }
}








