require("@babel/core").transform("code", {});
const fetch = require("node-fetch");

/* ASYNCHRONOUS JS */

console.log("1");
console.log("3");

// asynchrnous call with setTimeout
setTimeout(() => {
	console.log("2");
}, 1000);

// callbacks are the way to achieve asynchronous behaviour
const fetchUsers = async () => {
	const data = await fetch("https://jsonplaceholder.typicode.com/users");
	const users = await data.json();

	return users;
};

// console.log('Users', fetchUsers())
// Return value from async function should be accessed as follows
// fetchUsers().then(res => {console.log('users', res)})

// if you want use await on the async function, use IIFE
(async () => {
	// console.log('within async IIFE', await fetchUsers())
})();

// for await - ES2018
const urls = [
	"https://jsonplaceholder.typicode.com/users",
	"https://jsonplaceholder.typicode.com/posts",
	"https://jsonplaceholder.typicode.com/albums"
];

// Using Promise.all() with async-await
const getAllData = async () => {
	try {
		const [users, posts, albums] = await Promise.all(
			urls.map(async url => {
				const response = await fetch(url);
				return response.json();
			})
		);
		console.log("Users:", users);
		console.log("Posts:", posts);
		console.log("Albums:", albums);
	} catch (err) {
		console.log("Error", err);
	} finally { // ES-2018
		console.log("Execute always");
	}
};

// getAllData();

// Above can be done with for-await
const getAllData1 = async () => {
	const promises = urls.map(url => fetch(url))

	for await(let response of promises) {
		const data = await response.json()
		console.log(data)
	}
}


// getAllData1()

// Promises get into JOB queue (Microtask Queue) (ES-2018) and they have highest priority over setTimeout
// and will execute first than the one in Callback Queue

// use, race(), all() from promise API to run different way of hadling the async behaviour