
const books = [];

async function booksMemoryRoute(fastify, options) {

  fastify.get('/', async (request, reply) => {
   
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
    // reply.code(404).send({ error: 'Not implemented' });
    const {id} = request.params;
    const book = books.find((num)=>{return(num.id==id);});
    return book
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
    // step 1 je recupère le request le contenu du nouveau livre
    //step 2 on construit un nouvel objet avec un {id : ?, title : xxx, author: yyy}
    //step 3 : append dans les books 
    // step 4 : renvoie le nouvel objet

    const {title, author} = request.body;
    const new_book = {title : title, author: author, id:books.length};
    books.push(new_book);
    reply.code(201).send(new_book);
    //reply.code(404).send({ error: 'Not implemented' });
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
    const id = Number(request.params.id);
    const { title, author } = request.body;
    const bookIndex = books.findIndex((b) => b.id === id);
    books[bookIndex] = { id, title, author };
    return books[bookIndex];
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
    const id = Number(request.params.id);
    const bookIndex = books.findIndex((b) => b.id === id);
    books.delete(bookIndex);
    return reply.code(204).send();
  });
} 

export default booksMemoryRoute;