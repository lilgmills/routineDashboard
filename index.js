import express from "express";
const app = express();
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));
const PORT = 3001;

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/complete', (req, res) => {
    res.render('finished')
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});