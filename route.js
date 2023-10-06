const {
  onAddBookHandler,
  onGetAllBooksHandler,
  onGetBookByIdHandler,
  onUpdateBookByIdHandler,
  onDeleteBookByIdHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: onAddBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: onGetAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: onGetBookByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: onUpdateBookByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: onDeleteBookByIdHandler,
  },
];

module.exports = routes;
