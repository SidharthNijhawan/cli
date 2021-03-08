let fs = require("fs");
let path = require("path");
function viewHelper(src, mode) {
    if (mode == "tree") {
        console.log("tree view will be shown for this", src)
        viewAsTree(src, "");
    } else if (mode == "flat") {
        viewAsFlatFile(src, path.basename(src));
    } else {
        console.log("wrong mode  type help for commands");
    }
}
module.exports = {
    fn: viewHelper
}
function viewAsFlatFile(src, toprint) {
    let isFile = checkPathisDirectoryOrNot(src);
    if (isFile == true) {
        const data = fs.readFileSync('toprint', 'utf8')
        console.log(data)
    } else {
        const data = fs.readFileSync('toprint', 'utf8')
        console.log(data)
        //childrens=> content read
        let childrens = childrenReader(src);
        for (let i = 0; i < childrens.length; i++) {
            let child = childrens[i];
            let childPath = path.join(src, child);
            // d10/d20
            viewAsFlatFile(childPath, path.join(childPath, child));
        }
        // children => viewAsFlatfile
    }
}
// view as tree
function viewAsTree(src, indent) {
    let isFile = checkPathisDirectoryOrNot(src);
    if (isFile == true) {
        console.log(indent + path.basename(src) + "*");
    } else {
        console.log(indent + path.basename(src));
        //childrens=> content read
        let childrens = childrenReader(src);
        for (let i = 0; i < childrens.length; i++) {
            let child = childrens[i];
            let childPath = path.join(src, child);
            // d10/d20
            viewAsTree(childPath, indent + "\t");
        }
        // children => viewAsFlatfile
    }
}

function checkPathisDirectoryOrNot(src) {
    let ans = fs.lstatSync(src).isFile();
    return ans;
}
function childrenReader(src) {
    let childrens = fs.readdirSync(src);
    return childrens;
}
// folder
        // activity
            // commands
                // * help.js
                // * view.js
                // * organize.js
            // * mycli.js
        // raw
            // poc
            // facts