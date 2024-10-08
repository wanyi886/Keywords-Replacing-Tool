
const fs = require('node:fs');
const path = require('path')


const replaceKeywords = (filename, target_keyword, replace_keyword) => {

    fs.readFile(filename, 'utf-8', (err, data) => {
        if (err) {
            console.error(err.stack)
            return;
        }

        const updateContent = data.replaceAll(target_keyword, replace_keyword);

        fs.writeFile(filename, updateContent, (err) => {
            if (err) {
                console.error(err.stack);
                return
            }
        })

        console.log(`Replaced all ${target_keyword} in file ${filename}`);
        return
    })
    
}


const depthFirstSearch = (directory, extensions, target_keyword, replace_keyword) => {
    
    // read the redirectory and list the subdirectory or files as an array
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error(err.stack);
            return
        }

        files.forEach( file => {
            const currentDir = path.join(directory , file);
            
            // check the diretory now is a directory or not.
            fs.stat(currentDir, (err, stats) => {
                if (err) {
                    console.error(err.stack)
                    return
                }

                if (stats.isDirectory()) {
                    depthFirstSearch(currentDir, extensions, target_keyword, replace_keyword);

                } else {

                    // use path.extname to extract the file extension from a file path
                    const file_type = path.extname(currentDir)

                    if (extensions.includes(file_type)) {
                        replaceKeywords(currentDir, target_keyword, replace_keyword)
                    }

                }
            })

        })
    })

}

let directory = 'www.bates.edu'
let extensions = [".html", ".htm", ".js"]
let target_keyword = 'https://www.bates.edu'
let replace_keyword = ""

depthFirstSearch(directory, extensions, target_keyword, replace_keyword)