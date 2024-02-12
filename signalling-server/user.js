const users = [];

const addUser = ({ id, name, room }) => {
	// check if room has max number of users
	const usersInRoom = getUsersInRoom(room);

	console.log("usersInRoom.length", usersInRoom.length)
	if(usersInRoom.length >= 2) {
		return {error: "Meeting has max number of members"}
	}

	// check if user already exists in the room
	const existingUser = users.filter(user => user.room == room && user.name == name)
	if(existingUser.length) {
		return {error: "User with this name already exists in the room"}
	}

	const user = { id, name, room }
	users.push(user);

	return {user};
}

const removeUser = (id) => {
	const index = users.findIndex((user) => user.id === id);
	if (index !== -1) {
		return users.splice(index, 1)[0];
	}
}

const getUser = (id) => users
	.find((user) => user.id === id);

const getUsersInRoom = (room) => users
	.filter((user) => user.room === room);

module.exports = {
	addUser, removeUser,
	getUser, getUsersInRoom
};
