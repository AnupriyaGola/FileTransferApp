const fs = require('fs');
var path = require('path');

const readline = require('readline');


//function that read the directory
let dir;
let readDirectoryAsynchronously = () => {
    fexist();
}

//To take input from user
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


var fexist = () => {
    let flag = new Boolean(false);//variable used in below logic for finding file with same name in destiantion directory.

    r1.question(`Enter the name of source directory `, (answer) => {

        console.log(`You have entered Directory name: ${answer}`);


        fs.access(answer, (err) => {
            if (err) {
                console.log("Entered source directory doesnot exist");
                return fexist();
            } else {

                dir = answer;

                //To check if the entered source directory is empty.
                fs.readdir(answer, (err, file) => {
                    let arr = new Array();
                    if (err) {
                        console.log(err)
                    } else if (file.length == 0) {
                        console.log("Entered Directory is empty");
                        process.exit();
                    }

                    else {
                        for (let i = 0; i < file.length; i++) {
                            let c = i + 1;
                            console.log(c + ')' + file[i])

                            arr[i] = file[i];
                        } copyFunc(arr);
                    }

                });
            }
        })
        //Main function for copying the file from source to destination.
        let copyFunc = (arr) => {
            r1.question(`Enter the serial no of file to be copy `, (source) => {
                console.log(`The File you want to copy is   ${arr[source - 1]} from ${answer} directory`)
                var f = path.join(dir, arr[source - 1]);
                var rd = fs.createReadStream(f);


                r1.question('Enter the name of destination directory ', (target) => {

                    var d = path.join(target, arr[source - 1]);
                    var wr = fs.createWriteStream(d);


                    //Checking the destination directory if exist
                    fs.access(target, (err) => {
                        if (err) {
                            console.log("Entered destination directory not exist");

                        }

                    });

                    //Checking if the destination directory is having the file of same name
                    fs.readdir(target, (err, file) => {

                        console.log(file);
                        if (err) {
                            console.log(err)
                        }

                        else {
                            for (let i = 0; i < file.length; i++) {
                                if (file[i] == arr[source - 1]) {
                                    flag = true;
                                }
                            }
                            if (flag == false) {
                                copyFile(f, path.join(target, arr[source - 1]));

                            }
                            else {
                                console.log("Destination directory is having file with same name,You want to overwrite it.")
                                v();

                            }
                        }

                    });

                    //Function definition for getting input from user.
                    var v = () => {
                        r1.question("Enter 'Y' or 'N'", (reply) => {
                            if (reply == 'Y') {
                                copyFile(f, path.join(target, arr[source - 1]));

                            } else if (reply == 'N') {
                                console.log("File doesnot overwrite in destination!!!")

                            } else {
                                console.log(`Kindly enter reply either 'Y' or 'N'`)
                                return v();
                            }
                        })
                    }
                    //Function to copy file from source to destination.
                    let copyFile = (src, dest) => {

                        let readStream = fs.createReadStream(src);

                        readStream.once('error', (err) => {
                            console.log(err);
                        });

                        readStream.once('end', () => {
                            console.log('done copying');
                        });

                        readStream.pipe(fs.createWriteStream(dest));
                    }


                });



            });

        }



    });
}



module.exports = {
    readDirectoryAsynchronously: readDirectoryAsynchronously
}