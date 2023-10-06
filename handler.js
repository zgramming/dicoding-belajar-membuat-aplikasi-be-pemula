let books = [];

const { nanoid } = require('nanoid');

const onAddBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  if (!name || name.length === 0) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      })
      .code(400);
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400);
  }

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  console.log({
    newBook,
  });

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (!isSuccess) {
    return h
      .response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
      })
      .code(500);
  }

  return h
    .response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    })
    .code(201);
};
const onGetAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  let tempBooks = [...books];

  if (name !== undefined) {
    tempBooks = tempBooks.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (reading !== undefined) {
    tempBooks = tempBooks.filter((book) => book.reading === !!Number(reading));
  }

  if (finished !== undefined) {
    tempBooks = tempBooks.filter((book) => book.finished === !!Number(finished));
  }

  const mappedBooks = tempBooks.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  const response = {
    status: 'success',
    data: {
      books: mappedBooks,
    },
  };

  return h.response(response).code(200);
};
const onGetBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const book = books.filter((val) => val.id === bookId)[0];
  if (book === undefined) {
    return h
      .response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      })
      .code(404);
  }

  return h.response({
    status: 'success',
    data: {
      book,
    },
  });
};
const onUpdateBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  if (!name || name.length === 0) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      })
      .code(400);
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400);
  }

  const book = books.filter((val) => val.id === bookId)[0];

  if (book === undefined) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
      })
      .code(404);
  }

  const finished = pageCount === readPage;
  const updatedAt = new Date().toISOString();

  const updatedBook = {
    ...book,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    updatedAt,
  };

  const index = books.findIndex((val) => val.id === bookId);
  books[index] = updatedBook;

  const isSuccess = books.filter((val) => val.id === bookId).length > 0;

  if (!isSuccess) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku',
      })
      .code(500);
  }

  return h
    .response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    })
    .code(200);
};
const onDeleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const book = books.filter((val) => val.id === bookId)[0];

  if (book === undefined) {
    return h
      .response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
      })
      .code(404);
  }

  const newBooks = books.filter((val) => val.id !== bookId);

  if (newBooks.length === books.length) {
    return h
      .response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
      })
      .code(404);
  }

  books = [...newBooks];

  return h
    .response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    })
    .code(200);
};

module.exports = {
  onAddBookHandler,
  onGetAllBooksHandler,
  onGetBookByIdHandler,
  onUpdateBookByIdHandler,
  onDeleteBookByIdHandler,
};
