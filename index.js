const express = require('express');
const app = express();
const port = 8080;

var fs = require( 'fs' );
var path = require( 'path' );

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
                                console.log(`The error says ${err}`)
                            }
                        });
                    }
                }
            });
        }
    });

   
}

setup();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/images', express.static('images'))

app.get('/', (req, res) => {
    db.get('SELECT name FROM images WHERE classified = 0 LIMIT 1', (err, result) => {
        if (err) {
            res.send(err);
        }
        else if (result) {
            // res.send(result)
            res.render('index.html', {image: result['name'], classes: ['Low', 'Full', 'Delete']});
        }
        else {
            res.send("No photos found");
        }
    });
    // res.render('index.html', {image: "test.png", classes: ['Low', 'Full', 'Delete']});
})

app.post('/:image/:className', (req, res) =>{
    console.log(req.params.image + ":" + req.params.className);

    db.run('UPDATE images SET class = ?, classified = ? WHERE name = ?',
    [req.params.className, true, req.params.image]);

    res.redirect('/');
});


app.listen(port);