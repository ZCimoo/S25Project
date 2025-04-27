const data = require("../data/activities.json");

async function getAll() {
  return data;
}

async function get(id) {
  return data.items.find((activity) => activity.id == id);
}

async function create(activity) {
  const newActivity = {
    id: data.items.length + 1,
    ...activity,
  };
  data.items.push(newActivity);
  return newActivity;
}

async function update(id, activity) {
  const index = data.items.findIndex((activity) => activity.id == id);
  if (index === -1) {
    return null;
  }
  const updatedActivity = {
    ...data.items[index],
    ...activity,
  };
  data.items[index] = updatedActivity;
  return updatedActivity;
}

async function remove(id) {
  const index = data.items.findIndex((activity) => activity.id == id);
  if (index === -1) {
    return null;
  }
  const deletedItem = data.items[index];
  data.items.splice(index, 1);
  return deletedItem;
}

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
};
