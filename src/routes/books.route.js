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
      const book = await fastify.prisma.book.findUnique({
        where: { id: parseInt(request.params.id) },
      });
      if (!book) {
        reply.code(404).send({ error: 'Book not found' });
      }
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

    const createUserSchema = {
      body: {
        type: 'object',
        required: ['username', 'password','id'],
        properties: {
          username: { type: 'string' },  
          password: { type: 'string' },
        },
      },
    };

    fastify.post('/register', { schema: createUserSchema }, async (request, reply) => {
      const { username, password} = request.body;
      if (!username || !password) {
        reply.code(400).send({ error: 'username and password' });
        return;
      }
      const id = user.id
      const utilisateur = await fastify.prisma.user.create({
        data: {username, password},
      });
      request.session.iduser = id;
      request.session.isconnected = true;

    });
    
    fastify.post('/login', { schema: createUserSchema }, async (request, reply) => {
      const { username, password} = request.body;
      if (!username || !password) {
        reply.code(400).send({ error: 'username and password' });
        return;
      }
      const id = user.id
      const utilisateur = await fastify.prisma.user.create({
        data: {username, password},
      });
      request.session.iduser = id;
      request.session.isconnected = true;

    });

    fastify.post('/', { schema: createBookSchema }, async (request, reply) => {
      const { title, author } = request.body;
      if (!title || !author) {
        reply.code(400).send({ error: 'Title and author are required' });
        return;
      }
      const book = await fastify.prisma.book.create({
        data: { title, author },
      });
      reply.code(201).send(book);
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
      const { title, author } = request.body;
      try {
        const book = await fastify.prisma.book.update({
          where: { id: parseInt(request.params.id) },
          data: { title, author },
        });
        return book;
      } catch {
        reply.code(404).send({ error: 'Book not found' });
      }
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
      try {
        await fastify.prisma.book.delete({
          where: { id: parseInt(request.params.id) },
        });
        reply.code(204).send();
      } catch {
        reply.code(404).send({ error: 'Book not found' });
      }
    });
  }

  export default booksRoute;