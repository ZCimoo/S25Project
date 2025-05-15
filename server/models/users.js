const data = require("../data/users.json");
const { CustomError, statusCodes } = require("./errors");
const { connect } = require("./supabase");

const TABLE_NAME = "users";

const BaseQuery = connect().from(TABLE_NAME).select("*");

const isAmin = true;

async function getAll(limit = 30, offset = 0, sort = "userid", order = "asc") {
  const list = await connect()
    .from(TABLE_NAME)
    .select("*", { count: "estimated" })
    .order(sort, { ascending: order === "asc" })
    .range(offset, offset + limit - 1);
  if (list.error) {
    throw list.error;
  }
  return {
    items: list.data,
    count: list.count,
  };
}

async function get(id) {
  const numericId = Number(id);
  const { data: user, error } = await connect()
    .from(TABLE_NAME)
    .select("*")
    .eq("userid", numericId);
  if (!user || !user.length) {
    throw new CustomError("User not found", statusCodes.NOT_FOUND);
  }
  if (error) {
    throw error;
  }

  return user;
}
async function search(
  query,
  limit = 30,
  offset = 0,
  sort = "userid",
  order = "desc"
) {
  const {
    data: items,
    error,
    count,
  } = await BaseQuery.or(
    `firstname.ilike.%${query}%,lastname.ilike.%${query}%,username.ilike.%${query}%`
  )
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
async function create(user) {
  if (!isAmin) {
    throw CustomError("Not authorized", statusCodes.UNAUTHORIZED);
  }
  const { date: newUser, error } = await connect()
    .from(TABLE_NAME)
    .insert(user)
    .select("*");
  if (error) {
    throw error;
  }
  return newUser;
}
async function update(id, user) {
  const numericId = Number(id);
  const { data: updatedUser, error } = await connect()
    .from(TABLE_NAME)
    .update(user)
    .eq("userid", numericId)
    .select("*");
  if (error) {
    throw error;
  }
  return updatedUser;
}
async function remove(id) {
  const numericId = Number(id);
  const { data: deletedUser, error } = await connect()
    .from(TABLE_NAME)
    .delete()
    .eq("userid", numericId)
    .select("*");
  if (error) {
    throw error;
  }
  return deletedUser;
}

async function seed() {
  for (const item of data.items) {
    const insert = mapToDB(item);
    const { data: newUser, error } = await connect()
      .from(TABLE_NAME)
      .insert(insert)
      .select("*");
    if (error) {
      throw error;
    }
  }
  return { message: "Seeded successfully" };
}

function mapToDB(item) {
  return {
    userid: item.userId,
    firstname: item.firstName,
    lastname: item.lastName,
    username: item.username,
    email: item.email,
    password: item.password,
    role: item.role,
    age: item.age,
    gender: item.gender,
    pfp: item.pfp,
  };
}

module.exports = {
  getAll,
  get,
  search,
  create,
  update,
  remove,

  seed,
};
