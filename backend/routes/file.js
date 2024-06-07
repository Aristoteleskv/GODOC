const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require("../config/database/db");

const fileController = require("../controllers/fileController");

router.post("/registo", fileController.registar_file);

router.post("/update", fileController.update_file);

//router.post("/upload", fileController.upload);
router.get("/", fileController.getListFiles);
router.put("/files/:name", fileController.download);
router.delete("/files/:name", fileController.remove);
// Rota para compartilhar um arquivo com contatos selecionados 
router.post('/file/:id/share', fileController.shareFile);
router.put("/file/:id", fileController.select_file);

router.get('/files/:filename', (req, res) => {
    const filename = req.params.filename;
    const dirname = path.resolve();
    const fullfilepath = path.join(dirname, './uploads/' + filename);
    res.sendFile(fullfilepath);
});
//nomear ficheiros
async function nomearfile(oldFile, newFile) {
    try {
        //renomear ficheiros
        await fs.rename(oldFile, newFile, (err) => {
            if (err) throw err;
            console.log('Rename complete!');
        });
    } catch (error) {
        console.error(`movido o ficheiro' ${error.message}`);
    }
}


//mover ficheiros
async function moveFiles(source, destination) {
    try {
        await fs.renameSync(source, destination);
        console.log(`movido o ficheiro' ${source} para ${destination} com sucesso`);
    } catch (error) {
        console.error(`movido o ficheiro' ${error.message}`);
    }
}


//moveFile(req,'upload/');
router.get("files/:id", (req, res) => {
    const { id } = req.params;
    db.query(`SELECT * FROM files WHERE id = ${id}`,
        (err, results) => {
            if (err) console.log(err);
            else res.json(results[0]);
        });

});

router.delete("/:ideee", (req, res) => {
    const { id } = req.params;

    db.query(`delete from products where id = '${id}'`, (err, results) => {
        if (err) console.log(err);
        else res.json(results[0]);
    });
});

const store = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        let originalname = file.originalname;

        let ext = originalname.split('.').pop();
        let filename = originalname.split('.').slice(0, -1).join('.');

        cb(null, filename + '-' + Date.now() + '.' + ext)
    }
});


const upload = multer({ storage: store }).single('file');


router.post('/upload', function (req, res) {
    upload(req, res, function (err) {
        if (!res) {
            return res.status(501).json({ error: err });
        } else {


            //let usr=req.body;
            console.log(req.body);
            const { id_pasta } = req.body;
            const file = req.file;
            const file_name = file.filename;
            const type = file.mimetype;
            const size = file.size;
            const tmp_name = file.filename;
            var sql = "INSERT INTO files ( file_name, type, size, id_pasta, tmp_name) VALUES ( '" + file_name + "', '" + type + "', '" + size + "', '" + id_pasta + "', '" + tmp_name + "' )";
            db.query(sql, (err, rows, fields) => {
                if (!err) {
                    res.status(201).send(rows);
                    console.log('Insert Query success');
                   
                    // return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
                } else {
                    console.log('Error in Insert Query');
                    // console.log(err);
                }

                //do all database record saving activity
                // return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
            });
        }
    });
});


router.post('/uploadp', function (req, res) {
    upload(req, res, function (err) {
        if (!res) {
            return res.status(501).json({ error: err });
        } else {

            const oldPath = req.file.path;
            const newPath = `./${req.body.pasta_nome}/${req.file.originalname}`;
           
            // Mover o arquivo para a pasta destino
            
            //let usr=req.body;
            console.log(req.body);
            const { id_pasta } = req.body;
            const file = req.file;
            const file_name = file.filename;
            const type = file.mimetype;
            const size = file.size;
            const tmp_name = file.filename;
            var sql = "INSERT INTO files ( file_name, type, size, id_pasta, tmp_name) VALUES ( '" + file_name + "', '" + type + "', '" + size + "', '" + id_pasta + "', '" + tmp_name + "' )";
            db.query(sql, (err, rows, fields) => {
                if (!err) {
                    res.status(201).send(rows);
                    console.log('Insert Query success');
                   
                    // return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
                } else {
                    console.log('Error in Insert Query');
                    // console.log(err);
                }

                //do all database record saving activity
                // return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
            });
        }
    });
});

//Entrada de documento Upload
router.post('/uploadoc', function (req, res) {
    upload(req, res, function (err) {
        if (!res) {
            return res.status(501).json({ error: err });
        } else {
 
            // Mover o arquivo para a pasta destino
            
            //let usr=req.body;
            console.log(req.body);
            const { idPasta, de, idPara, idDp,  projecto,  nRegisto,  dataEntrada,  rubrica } = req.body;
            const file = req.file;
            const file_name = file.filename;
            const type = file.mimetype;
            const size = file.size;
            const tmp_name = file.filename;
            var sql = "INSERT INTO docfiles ( file_name, type, size, tmp_name, idPasta, de, idPara, idDp,  projecto,  nRegisto,  dataEntrada,  rubrica) VALUES ( '" + file_name + "', '" + type + "', '" + size + "', '" + tmp_name + "','" + idPasta + "','" + de + "','" + idPara + "','" + idDp + "','" + projecto + "','" + nRegisto + "','" + dataEntrada + "','" + rubrica + "')";
            db.query(sql, (err, rows, fields) => {
                if (!err) {
                    res.status(201).send(rows);
                    console.log('Feiro com sucesso');
                   
                    // return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
                } else {
                    console.log('Error in Insert Query');
                    // console.log(err);
                }

                //do all database record saving activity
                // return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
            });
        }
    });
});
//fim entrada

router.post('/download', function (req, res, next) {
    filepath = path.join(__dirname, './uploads') + '/' + req.body.filename;
    res.sendFile(filepath);
});
router.get("/:id", getFilep);
//router.get("/:id", getFile);
async function getFilep(req, res) {
    const { id } = req.params;
    const checkDataSql = `select files.file_name,  files.id, files.type, files.size, pastas.id as id_pasta, pastas.nome as pastas_nome  from files, pastas where files.id_pasta = pastas.id and files.id_pasta = ?`;
    db.query(checkDataSql, [id], async (err, result) => {
        if (err) {
            return res.status(400).json(err);
        }

        if (result && result.length > 0) {
            return res.status(200).json(
                await Promise.all(
                    result.map(async (user) => {

                        return {
                            file_name: user.file_name,
                            type: user.type,
                            size: user.size,
                            id: user.id,
                            pasta: user.id_pasta,
                            pasta_nome: user.pastas_nome,
                        };
                    })
                )
            );
        }
    }
    );
};

router.get("/:id", getFile);
async function getFile(req, res) {
    const { id } = req.params;
    const checkDataSql = `select files.file_name,  files.id, files.type, files.size, pastas.id as id_pasta, pastas.nome as pastas_nome  from files, pastas where files.id_pasta = pastas.id and files.id = ?`;
    db.query(checkDataSql, [id], async (err, result) => {
        if (err) {
            return res.status(400).json(err);
        }

        if (result && result.length > 0) {
            return res.status(200).json(
                await Promise.all(
                    result.map(async (user) => {

                        return {
                            file_name: user.file_name,
                            type: user.type,
                            id: user.id,
                            pasta: user.id_pasta,
                            pasta_nome: user.pastas_nome,
                        };
                    })
                )
            );
        }
    }
    );
};




// No servidor Node.js

// Rota para buscar ficheiros partilhados com um usuário
router.get('/files/:userId', (req, res) => {
    const userId = req.params.userId;
    // Encontrar todos os ficheiros que têm o userId nas suas permissões de partilha
    const sharedFiles = files.filter(file => file.sharedWith.includes(userId));
    res.json(sharedFiles);
});

let files = [
    // ... lista de ficheiros com informações de partilha
    {
        id: 'file1',
        name: 'Documento.pdf',
        owner: 'user1',
        sharedWith: ['user2', 'user3', 'user4', 'user5', 'user6'], // IDs dos usuários com permissão para ver o ficheiro
        // ...
    },
    // ...
];














// recursive function to get the file from uploaded
function recursiveGetFile(files, _id) {
    var singleFile = null;

    for (var a = 0; a < files.length; a++) {
        const file = files[a];

        // return if file type is not folder and ID is found
        if (file.type != "folder") {
            if (file._id == _id) {
                return file;
            }
        }

        // if it is a folder and have files, then do the recursion
        if (file.type == "folder" && file.files.length > 0) {
            singleFile = recursiveGetFile(file.files, _id);
            // return the file if found in sub-folders
            if (singleFile != null) {
                return singleFile;
            }
        }
    }
}

// function to add new uploaded object and return the updated array
function getUpdatedArray(arr, _id, uploadedObj) {
    for (var a = 0; a < arr.length; a++) {
        // push in files array if type is folder and ID is found
        if (arr[a].type == "folder") {
            if (arr[a]._id == _id) {
                arr[a].files.push(uploadedObj);
                arr[a]._id = ObjectId(arr[a]._id);
            }

            // if it has files, then do the recursion
            if (arr[a].files.length > 0) {
                arr[a]._id = ObjectId(arr[a]._id);
                getUpdatedArray(arr[a].files, _id, uploadedObj);
            }
        }
    }

    return arr;
}

// recursive function to remove the file and return the updated array
function removeFileReturnUpdated(arr, _id) {
    for (var a = 0; a < arr.length; a++) {
        if (arr[a].type != "folder" && arr[a]._id == _id) {
            // remove the file from uploads folder
            try {
                fileSystem.unlinkSync(arr[a].filePath);
            } catch (exp) {
                // 
            }
            // remove the file from array
            arr.splice(a, 1);
            break;
        }

        // do the recursion if it has sub-folders
        if (arr[a].type == "folder" && arr[a].files.length > 0) {
            arr[a]._id = ObjectId(arr[a]._id);
            removeFileReturnUpdated(arr[a].files, _id);
        }
    }

    return arr;
}

// recursive function to search uploaded files
function recursiveSearch(files, query) {
    var singleFile = null;

    for (var a = 0; a < files.length; a++) {
        const file = files[a];

        if (file.type == "folder") {
            // search folder case-insensitive
            if (file.folderName.toLowerCase().search(query.toLowerCase()) > -1) {
                return file;
            }

            if (file.files.length > 0) {
                singleFile = recursiveSearch(file.files, query);
                if (singleFile != null) {
                    // need parent folder in case of files
                    if (singleFile.type != "folder") {
                        singleFile.parent = file;
                    }
                    return singleFile;
                }
            }
        } else {
            if (file.name.toLowerCase().search(query.toLowerCase()) > -1) {
                return file;
            }
        }
    }
}

// recursive function to search shared files
function recursiveSearchShared(files, query) {
    var singleFile = null;

    for (var a = 0; a < files.length; a++) {
        var file = (typeof files[a].file === "undefined") ? files[a] : files[a].file;

        if (file.type == "folder") {
            if (file.folderName.toLowerCase().search(query.toLowerCase()) > -1) {
                return file;
            }

            if (file.files.length > 0) {
                singleFile = recursiveSearchShared(file.files, query);
                if (singleFile != null) {
                    if (singleFile.type != "folder") {
                        singleFile.parent = file;
                    }
                    return singleFile;
                }
            }
        } else {
            if (file.name.toLowerCase().search(query.toLowerCase()) > -1) {
                return file;
            }
        }
    }
}


module.exports = router;






/**
 
// For size limit 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    limits: {
        fileSize: 1024 * 1024 //1MB
    }
});

----------
var limits = { fileSize: 1024 * 1024 * 1024 }
var upload = multer({ limits: limits })

app.post('/upload', upload.single('file'), function (req, res) {
  res.send({ result: 'ok' })
})

app.use(function (err, req, res, next) {
  if (err.code === 'LIMIT_FILE_SIZE') {
    res.send({ result: 'fail', error: { code: 1001, message: 'File is too big' } })
    return 
  }

  // Handle any other errors
})
The fileSize limit will automatically remove the file if it received a too large file, read more in the readme :)


*/
/*
 var store = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, './uploads');
    },
    filename:function(req,file,cb){
        cb(null, Date.now()+'.'+file.originalname);
    }
});


var upload = multer({storage:store}).single('file');

_router.post('/upload', function(req,res,next){
    upload(req,res,function(err){
        if(err){
            return res.status(501).json({error:err});
        }
        //do all database record saving activity
        return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
    });
});


_router.post('/download', function(req,res,next){
    filepath = path.join(__dirname,'./uploads') +'/'+ req.body.filename;
    res.sendFile(filepath);
});

 */


















