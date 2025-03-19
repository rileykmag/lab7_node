//load http
var http = require('http');

//load filesystem
var fs = require('fs');

//store port
var port = 1337;

//store the directory name
var dirname = '/Users/rileymaguire/Desktop/Classes/csc372/labs/lab7_node';

//function to trad file located at path passed in
function serveStaticFile(res, path, contentType, responseCode){
    // if no responsecode then set to 200
    if(!responseCode){
        responseCode = 200;
    }

    //try to read file
    fs.readFile(dirname + path, function(err,data) {
        //if there is an error
        if(err){
            //internal server error
            res.writeHead(500, {'Content-Type': 'text/plain'});

            //give error message to user
            res.end('500 - Internal Error');
        }
        //no error! it works
        else{
            //give the response code/content type
            res.writeHead(responseCode, {'Content-Type': contentType});

            //send data we have
            res.end(data);
        }
    })
}

http.createServer(function(req, res){
    //normalize the url and remove querystring,trailing slash, make it lowercase
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();

    //serve each web page based on the path that a user has navigated to, check the html files to determine what paths
    switch(path){
        //if they go to 1337->serve home page
        case '':
            serveStaticFile(res, '/public/index.html', 'text/html');
            break;
        
        //if they go to index
        case '/index':
            serveStaticFile(res, '/public/index.html', 'text/html');
            break;
        
        // if they go to contact
        case '/contact':
            serveStaticFile(res, '/public/contact.html', 'text/html');
            break;
        
        //if they go to posts
        case '/posts':
            serveStaticFile(res, '/public/posts.html', 'text/html');
            break;

        //if they go to under construction
        case '/underconstruction':
            serveStaticFile(res, '/public/underconstruction.html', 'text/html');
            break;
        
        // serve the css file
        case '/css/style.css':
            serveStaticFile(res, '/public/css/style.css', 'text/css');›
            break;

        // go through each img
        case '/images/404bottom.gif':
            serveStaticFile(res, '/public/images/404bottom.gif', 'image/gif');
            break;
        case '/images/404mid.gif':
            serveStaticFile(res, '/public/images/404mid.gif', 'image/gif');
            break;
        case '/images/404top_w.gif':
            serveStaticFile(res, '/public/images/404top_w.gif', 'image/gif');
            break;
        case '/images/blogging.png':
            serveStaticFile(res, '/public/images/blogging.png', 'image/png');
            break;
        case '/images/computer-typing.jpeg':
            serveStaticFile(res, '/public/images/computer-typing.jpeg', 'image/jpeg');
            break;
        case '/images/construction.png':
            serveStaticFile(res, '/public/images/underconstruction.png', 'image/png');
            break;
        case '/images/logo.png':
            serveStaticFile(res, '/public/images/logo.png', 'image/png');
            break;
        case 'images/merch.png':
            serveStaticFile(res, '/public/images/merch.png', 'image/png');
            break;
        case 'images/x.png':
            serveStaticFile(res, '/public/images/x.png', 'image/png');
            break;

        // if it is none of the above cases, default is 404 error (not found)
        default:
            serveStaticFile(res, '/public/404.html', 'text/html', 404);
            break;
    }
}).listen(port);

console.log("Listening.. go to http://localhost:" + port);