import Hapi from '@hapi/hapi';
import * as FakeDatabase from './fake-database';
import * as uuid from 'uuid';

const server = new Hapi.Server({
    host: 'localhost',
    port: 8081
});

server.route({
    method: 'GET',
    path: '/hogs/{id}',
    handler: (request, h) => {
        console.log('GET');
        const hog = FakeDatabase.find(request.params.id);

        if (!hog) {
            return h.response()
                .code(404);
        }

        return h.response(hog)
            .code(200);
    }
});

server.route({
    method: 'POST',
    path: '/hogs',
    handler: (request, h) => {
        console.log('POST');
        const hog = request.payload;
        const id = uuid.v4();

        hog.id = id;
        FakeDatabase.save(hog);

        return h.response()
            .header('location', `http://localhost:8081/hogs/${id}`)
            .code(201);
    }
});

server.route({
    method: 'PUT',
    path: '/hogs/{id}',
    handler: (request, h) => {
        console.log('PUT');
        const hog = request.payload;

        hog.id = request.params.id;
        FakeDatabase.save(hog);

        return h.response()
            .code(200);
    }
});

server.route({
    method: 'DELETE',
    path: '/hogs/{id}',
    handler: (request, h) => {
        console.log('DELETE');
        const hog = FakeDatabase.find(request.params.id);

        if (!hog) {
            return h.response()
                .code(404);
        }

        FakeDatabase.del(request.params.id);

        return h.response()
            .code(200);
    }
});

console.log('Server started.')
server.start();