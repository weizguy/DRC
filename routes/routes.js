const appRouter = (app, fs) => {

    // data
    const answerData = './data/answers.json';
    const resultData = './data/results.json';

    // helper methods
    const readFile = (callback, returnJson = false, filePath = answerData, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, callback, filePath = resultData, encoding = 'utf8') => {
        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    // Test results
    app.post('/test', (req, res) => {
        readFile(data => {
            const response = req.body;
            const answers = data
            let correct = 0
            let unanswered = 0
            let missed = []
            let total = data.length

            response.forEach((x, i) => {
                if (x.answer && x.answer === answers[i].answer) {                    
                    correct += 1                    
                } else if (x.answer) {
                    missed.push(x.id)
                } else {
                    missed.push(x.id)
                    unanswered += 1
                }
            })

            const results = {
                "Correct answers": correct,
                "Unanswered questions": unanswered,
                "Ids of questions missed": missed,
                "Total number of questions": total
            }
            writeFile(JSON.stringify(results, null, 2), () => {
                res.status(200).send(results);
              });
        }, true)
    })

    app.post('/', (req, res) => {
        // Access request body json: req.body
        res.send("Hello! - Post request received. JS code running.");
    });

    app.get('/', (req, res) => {
    res.send("Running on empty");
    });

}

module.exports = appRouter;