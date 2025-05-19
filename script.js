const userCardsEle = document.querySelector(".userCards");
let users = [];

async function fetchUsers() {
	const respo = await fetch("https://jsonplaceholder.typicode.com/users");
	users = await respo.json();

	const params = new URLSearchParams(window.location.search);
	const id = params.get("id");
	const name = params.get("name");
	const username = params.get("username");
	const email = params.get("email");
	const city = params.get("city");

	if (name && username && email && city) {
		const newUser = {
			id: id ? Number(id) : users.length + 1,
			name,
			username,
			email,
			address: {
				city,
			},
		};

		if (id) {
			users = users.map((u) => (u.id === newUser.id ? newUser : u));
		} else {
			users.unshift(newUser);
		}
	}

	showUsers(users);
}

function showUsers(users) {
	userCardsEle.innerHTML = "";
	users.forEach((user) => {
		const userCard = document.createElement("div");
		userCard.classList.add("card");

		userCard.innerHTML = `
            <div id="userPic"></div>
			<div class="nameAndUser">
				<h1>${user.name}</h1>
				<p>@${user.username}</p>
			</div>

			<div class="mailAndCity">
				<p><b>Mail:</b> ${user.email}</p>
				<p><b>City:</b> ${user.address.city}</p>
			</div>

            <div class="buttons">
					<button onclick="editUser(${user.id})">Edit</button>
					<button onclick="deleteUser(${user.id})">Remove</button>
					</div>
        `;

		userCardsEle.appendChild(userCard);
	});
}

function editUser(id) {
	window.location.href = `../addingAndEditing/index.html?id=${id}`;
}

function deleteUser(id) {
	users = users.filter((user) => user.id !== id);
	showUsers(users);
}

function addUser() {
	window.location.href = "../addingAndEditing/index.html";
}

fetchUsers();
