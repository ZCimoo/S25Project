const data = require("../data/activities.json");
const { CustomError, statusCodes } = require("./errors");
const { connect } = require("./supabase");

const TABLE_NAME = "activities";

async function getAll(limit = 30, offset = 0, sort = "id", order = "desc") {
  const list = await connect()
    .from(TABLE_NAME)
    .select("*", { count: "estimated" })
    .order(sort, { ascending: order === "desc" })
    .range(offset, offset + limit - 1);
  if (list.error) {
    throw new CustomError(
      "Error fetching activities",
      statusCodes.INTERNAL_SERVER_ERROR
    );
  }
  return {
    items: list.data,
    total: list.count,
  };
}

async function get(id) {
  const { data: item, error } = await connect()
    .from(TABLE_NAME)
    .select("*")
    .eq("id", id);
  if (!item.length) {
    throw new CustomError("Activity not found", statusCodes.NOT_FOUND);
  }
  if (error) {
    throw error;
  }
  return item;
}

async function getByUserId(
  userId,
  limit = 30,
  offset = 0,
  sort = "id",
  order = "desc"
) {
  const {
    data: items,
    error,
    count,
  } = await connect()
    .from(TABLE_NAME)
    .select("*")
    .eq("userid", userId)
    .order(sort, { ascending: order === "desc" })
    .range(offset, offset + limit - 1);
  if (error) {
    throw error;
  }
  return {
    items,
    total: count,
  };
}

async function search(
  query,
  limit = 30,
  offset = 0,
  sort = "id",
  order = "asc"
) {
  const {
    data: items,
    error,
    count,
  } = await connect()
    .from(TABLE_NAME)
    .select("*")
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
    .order(sort, { ascending: order === "asc" })
    .range(offset, offset + limit - 1);
  if (error) {
    throw error;
  }
  return {
    items,
    total: count,
  };
}

async function create(activity) {
  const { data: newActivity, error } = await connect()
    .from(TABLE_NAME)
    .insert(activity)
    .select("*");
  if (error) {
    throw error;
  }
  return newActivity;
}

async function update(id, activity) {
  const { data: updatedActivity, error } = await connect()
    .from(TABLE_NAME)
    .update(activity)
    .eq("id", id)
    .select("*");
  if (error) {
    throw error;
  }
  return updatedActivity;
}

async function remove(id) {
  const { data: deletedActivity, error } = await connect()
    .from(TABLE_NAME)
    .delete()
    .eq("id", id)
    .select("*");
  if (error) {
    throw error;
  }
  return deletedActivity;
}

async function seed() {
  for (const activity of data.items) {
    const insert = mapToDB(activity);
    const { data: newActivity, error } = await connect()
      .from(TABLE_NAME)
      .insert(insert)
      .select("*");
    if (error) {
      throw error;
    }
  }

  return { message: "Seeded activities successfully" };
}

function mapToDB(activity) {
  return {
    id: activity.id,
    title: activity.title,
    date: activity.date,
    duration: activity.duration,
    location: activity.location,
    type: activity.type,
    userid: activity.userId,
    username: activity.username,
  };
}

module.exports = {
  getAll,
  get,
  getByUserId,
  search,
  create,
  update,
  remove,
  seed,
};
