let http = require("http");

let courses = [
	{
		name: "English 101",
		price: 23000,
		isActive: true,
	},
	{
		name: "Math 101",
		price: 25000,
		isActive: true,
	},
	{
		name: "Reading 101",
		price: 21000,
		isActive: true,
	},
];

//endpoint === req.url === "/" or "/courses" (sample)
//method === req.method === "GET" (sample)

http.createServer(function (req, res) {
	/*  http methods
            identifies what actions to take for requests
            creates routes that cater to the same endpoint but with a diff action
            primary CRUD operations
                GET == client requests for data, server retrieves it
                POST == client requests for data to be created
                PUT == client requests for data to be updated
                DELETE == client requests to delete a resource
     */

	console.log(req.url); // request URL endpoint
	console.log(req.method); // method of request

	//1 if block === 1 route
	//sample format for basic request
	if (req.url === "/" && req.method === "GET") {
		res.writeHead(200, { "Content-Type": "text/plain" });
		res.end("This is a response to a GET method request");
	} else if (req.url === "/" && req.method === "POST") {
		res.writeHead(200, { "Content-Type": "text/plain" });
		res.end("This is a response to a POST method request");
	} else if (req.url === "/" && req.method === "PUT") {
		res.writeHead(200, { "Content-Type": "text/plain" });
		res.end("This is a response to a PUT method request");
	} else if (req.url === "/" && req.method === "DELETE") {
		res.writeHead(200, { "Content-Type": "text/plain" });
		res.end("This is a response to a DELETE method request");
	} else if (req.url === "/courses" && req.method === "GET") {
		//FOR GET CYCLE (Basic sample)
		/*passing a stringified JSON
            update Content-Type headers to application/json
                done for client to be able to display our data properly
        */
		res.writeHead(200, { "Content-Type": "application/json" });

		/*can't pass another data type other than string for "end" method
            to pass an array, transform it to JSON string*/
		res.end(JSON.stringify(courses));
	} else if (req.url === "/courses" && req.method === "POST") {
		//FOR POST CYCLE (Basic sample)
		/*This route's goals
            should receive data from the client
            we should be able to create a new course
            add new course to courses array
        */

		//placeholder to contain data passed from the client.
		let requestBody = "";

		/*2-step data cycle from client to a nodeJS server
            1st step: "data step"
                reads the stream of data coming from client
                processes incoming data into placeholder variable
            2nd step: "end step"
                runs once or after request data has been completely sent from client
        */

		//1st step: "data step"
		//reads stream of data coming from client and processes incoming data into requestBody variable
		req.on("data", function (data) {
			//console.log(data) -- logs stream of data from client
			console.log(data);
			requestBody += data; // data stream is saved into variable
		});

		//2nd step: "end step"
		//runs once or after the request data is completely sent from client
		req.on("end", function () {
			// console.log(requestBody); //requestBody contains data from Postman client
			//requestBody is JSON format, must parse to add it as an object in our array.
			requestBody = JSON.parse(requestBody);

			//simulate creating document and adding it in a collection
			let newCourse = {
				name: requestBody.name,
				price: requestBody.price,
				isActive: true,
			};

			//requestBody is now an object, so we get values from requestBody and insert it in newCourse object
			console.log(newCourse); //logs newCourse object

			//push new course to courses array
			courses.push(newCourse);
			console.log(courses);

			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify(courses)); //send updated courses array to the client as a response
		});
	}
}).listen(4000);

console.log("Server running at localhost:4000");
