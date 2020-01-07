import * as FakeDatabase from './fake-database';
import * as uuid from 'uuid';
import express from 'express';

const app = express();

app.use(express.json());

app.get('/hogs/:id', (req, res) => {
    console.log('GET');
    const hog = FakeDatabase.find(req.params.id);

    if (!hog) {
        res.sendStatus(404);
    } else {
        res.send(hog);
    }
});

app.post('/hogs', (req, res) => {
    console.log('POST');
    const hog = req.body;

    hog.id = uuid.v4();
    FakeDatabase.save(hog);
    res.location(`http://localhost:8082/hogs/${hog.id}`);
    res.sendStatus(201);
});

app.put('/hogs/:id', (req, res) => {
    console.log('PUT');
    const hog = req.body;

    hog.id = req.params.id;
    FakeDatabase.save(hog);
    res.sendStatus(200);
});

app.delete('/hogs/:id', (req, res) => {
    console.log('DELETE');
    const hog = FakeDatabase.find(req.params.id);

    if (!hog) {
        res.sendStatus(404);
    } else {
        FakeDatabase.del(req.params.id);
        res.sendStatus(200);
    }
});

console.log('Server started.')
app.listen(8082);