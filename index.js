import express from 'express';
import { generateRouter } from './routes/generate.js';
import { AppError } from './errors/errors.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

app.use("/generate", generateRouter);

const errorHandler = (error, request, response, next) => {
    if (error instanceof AppError) {
        response.status(error.status).json({ error: error.message });
    }
    else {
        response.status(500).json({ error: "Internal server error" });
    }
}

app.use(errorHandler);

app.listen(PORT, async () => {
    console.log(`App is listening on port ${PORT}; http://localhost:${PORT}/`);
});