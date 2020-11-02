import * as FakeDatabase from './fake-database';
import * as uuid from 'uuid';
import express from 'express';
import morgan from 'morgan';
import * as mongodb from './mongo/mongodb';


const app = express();
app.use(express.json());
app.use(morgan('dev'));

const db = mongodb; // = FakeDatabase;

app.get('/hogs/:id', async (req, res) => {
    console.log('GET');
    const hog = await db.find(req.params.id);

    if (!hog) {
        res.sendStatus(404);
    } else {
        res.send(hog);
    }
});

app.post('/hogs', async (req, res) => {
    console.log('POST');
    const hog = req.body;

    hog.id = uuid.v4();
    await db.save(hog);
    res.location(`http://localhost:8082/hogs/${hog.id}`);
    res.sendStatus(201);
});

app.put('/hogs/:id', async (req, res) => {
    console.log('PUT');
    const hog = req.body;

    hog.id = req.params.id;
    await db.save(hog);
    res.sendStatus(200);
});

app.delete('/hogs/:id', async (req, res) => {
    console.log('DELETE');
    const hog = await db.find(req.params.id);

    if (!hog) {
        res.sendStatus(404);
    } else {
        await db.del(req.params.id);
        res.sendStatus(200);
    }
});

console.log('Server started.')
app.listen(8082);