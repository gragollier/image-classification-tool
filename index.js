const express = require('express');
const app = express();
const port = 8080;

let fs = require( 'fs' );
let path = require( 'path' );

const sqlite3 = require('sqlite3');
let db = new sqlite3.Database('images.db');

async function setup(){
    await db.run('CREATE TABLE IF NOT EXISTS images (name TEXT UNIQUE, class TEXT, classified BOOLEAN);', (result, err)=> {
        if (err){
            throw err;
        }
        else {
            fs.readdir('./images', (err, files) => {
                if (err){
                    throw err;
                }
                else {
                    for (let file of files){
                        db.run('INSERT INTO images (name, classified) VALUES (?, ?)', [file, false], (result, err) => {
                            if(err){
                                console.log(`DB Initialization Error: ${err}`)
                            }
                        });
                    }
                }
            });
        }
    });
}

if (!fs.existsSync('./images.db')){
    setup();
}

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/images', express.static('images'));

let config_file = fs.readFileSync('config.json');
let config = JSON.parse(config_file);

app.get('/', (req, res) => {
    db.get('SELECT name FROM images WHERE classified = 0 LIMIT 1', (err, result) => {
        if (err) {
            res.send(err);
        }
        else if (result) {
            res.render('index.html', {image: result['name'], classes: config.classes});
        }
        else {
            res.render('none.html', {})
        }
    });
})

app.post('/:image/:className', (req, res) =>{
    console.log(req.params.image + ":" + req.params.className);

    db.run('UPDATE images SET class = ?, classified = ? WHERE name = ?',
    [req.params.className, true, req.params.image]);

    res.redirect('/');
});


app.listen(port);