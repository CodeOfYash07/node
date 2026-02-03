fs.writeFile('Userlog.txt', 'Hello, World!\n', (err) => {
//     if (err) {
//         console.log(err);
//     }
// });

// const data = fs.readFileSync('Userlog.txt', 'utf8');
// console.log('content:', data);

// const readData = fs.readFile('Userlog.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('content:', data);
//     }
// });
// console.log('content:', readData);

// fs.appendFileSync('Userlog.txt', '\n' + new Date().toLocaleString());

// fs.appendFile('Userlog.txt', '\n' + new Date().toLocaleString(), (err) => {
//     if (err) {
//         console.log(err);
//     }
// });

