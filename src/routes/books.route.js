async function booksRoute(fastify, options) {

  fastify.get('/', async (request, reply) => {
    const books = await fastify.prisma.book.findMany();
    return books;
  });

  const getBookSchema = {
    params: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
      },
    },
  };

  fastify.get('/:id', { schema: getBookSchema }, async (request, reply) => {
    //  ⚙️🔥 write your code here ⚙️🔥
    // tips : look about findUnique
    //reply.code(404).send({ error: 'Not implemented' });
    const bookId = Number(request.params.id);
    const book = await fastify.prisma.book.findUnique({
      where: { id: bookId }
    });
    return book;
  });

  const createBookSchema = {
    body: {
      type: 'object',
      required: ['title', 'author'],
      properties: {
        title: { type: 'string' },
        author: { type: 'string' },
      },
    },
  };

  fastify.post('/', { schema: createBookSchema }, async (request, reply) => {
    //  ⚙️🔥 write your code here ⚙️🔥
    //reply.code(404).send({ error: 'Not implemented' });
    const { title, author } = request.body;
    const newBook = await fastify.prisma.book.create({
      data: { title, author }
    });
    return reply.code(201).send(newBook);

  });

  const updateBookSchema = {
    params: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
      },
    },
    body: {
      type: 'object',
      required: ['title', 'author'],
      properties: {
        title: { type: 'string' },
        author: { type: 'string' },
      },
    },
  };

  fastify.put('/:id', { schema: updateBookSchema }, async (request, reply) => {
    //  ⚙️🔥 write your code here ⚙️🔥
    //reply.code(404).send({ error: 'Not implemented' });
    const bookId = Number(request.params.id);
    const { title, author } = request.body;
    
    const updatedBook = await fastify.prisma.book.update({
      where: { id: bookId },
      data: { title, author }
    })
    return updatedBook;
  });

  const deleteBookSchema = {
    params: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
      },
    },
  };
  fastify.delete('/:id', { schema: deleteBookSchema }, async (request, reply) => {
    //  ⚙️🔥 write your code here ⚙️🔥
    //reply.code(404).send({ error: 'Not implemented' });
    const bookId = Number(request.params.id);
    
      await fastify.prisma.book.delete({
        where: { id: bookId }
      });
      return reply.code(204).send();
    
  });
}

export default booksRoute;