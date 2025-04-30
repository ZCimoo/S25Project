const data = require("../data/users.json");
const { CustomError, statusCodes } = require("./errors");

const isAmin = true;

async function getAll() {
  return data;
}

async function get(id) {
  const numericId = Number(id);
  const user = data.items.find((user) => user.userId === numericId);
  if (!user) {
    throw customError("User not found", statusCodes.NOT_FOUND);
  }

  return user;
}
async function create(user) {
  if (!isAmin) {
    throw customError("Not authorized", statusCodes.UNAUTHORIZED);
  }
  const newUser = {
    id: data.items.length + 1,
    ...user,
  };
  data.items.push(newUser);
  return newUser;
}
async function update(id, user) {
  const numericId = Number(id);
  const index = data.items.findIndex((user) => user.userId === numericId);
  if (index === -1) {
    throw new CustomError("User not found", statusCodes.NOT_FOUND);
  }
  const updatedUser = {
    ...data.items[index],
    ...user,
  };
  data.items[index] = updatedUser;
  return updatedUser;
}
async function remove(id) {
  const numericId = Number(id);
  const index = data.items.findIndex((user) => user.userId === numericId);
  if (index === -1) {
    throw new CustomError("User not found", statusCodes.NOT_FOUND);
  }
  data.items.splice(index, 1);
  return data.items;
}

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
};
