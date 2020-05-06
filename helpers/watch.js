const chokidar = require('chokidar');

module.exports.watch = () => {
    const watcher = chokidar.watch('./temp', {ignored: /^ \./, persistent: true});

    watcher.on('add', (path) => {
        console.log('File', path, 'has been added')
    })
}
