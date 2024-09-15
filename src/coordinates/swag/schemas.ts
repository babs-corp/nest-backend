export const ROUTE_ERROR_SCHEMA = {
  type: 'object',
  properties: {
    error: { type: 'string', default: 'Bad request' },
    statusCode: { type: 'number', default: 400 }
  }
}

export const ROUTE_NOT_FOUND_ERROR_SCHEMA = {
  type: 'object',
  properties: {
    message: {
      type: 'string', 
      default: 'Такого маршрута нет'
    },
    error: { type: 'string', default: 'Not found' },
    statusCode: { type: 'number', default: 404 }
  }
}