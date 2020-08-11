abstract class HttpError extends Error {
  public status!: number;
}

export class BadRequest extends HttpError {
  constructor(message = 'Bad Request') {
    super(message);

    this.status = 400;
  }
}

export class Unauthorized extends HttpError {
  constructor(message = 'Unauthorized') {
    super(message);

    this.status = 401;
  }
}

export class Forbidden extends HttpError {
  constructor(message = 'Forbidden') {
    super(message);

    this.status = 403;
  }
}

export class Conflict extends HttpError {
  constructor(message = 'Conflct') {
    super(message);

    this.status = 409;
  }
}
