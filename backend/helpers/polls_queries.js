const db = require('../db');

//  query all polls

const getAllPolls = function (limit) {
  const queryString = `SELECT polls.*, options.*, results.*
  FROM polls
  JOIN options ON polls.id = poll_id
  JOIN results ON options.id = option_id
  LIMIT $1;
  `
  const queryParams = [limit];

  return db
    .query(queryString, queryParams)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log("get all polls err");
      console.log(err.message);
    });
}
exports.getAllPolls = getAllPolls;

//  query one poll

const getOnePoll = function (id) {
  const queryString = `SELECT polls.*
  FROM polls
  WHERE polls.id = $1;
  `
  const queryParams = [id];

  return db
    .query(queryString, queryParams)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log("get one poll err");
      console.log(err.message);
    });
}
exports.getOnePoll = getOnePoll;

//  query options for one poll

const getOptionsForPoll = function (pollId) {
  const queryString = `SELECT options.*, count(results)
  FROM options
  LEFT JOIN results ON options.id = option_id
  WHERE poll_id = $1
  GROUP BY options.id;
  `
  const queryParams = [pollId];

  return db
    .query(queryString, queryParams)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log("get one poll err");
      console.log(err.message);
    });
}
exports.getOptionsForPoll = getOptionsForPoll;

const mostRecentPoll = function () {

  const queryString = `
    SELECT id
    FROM polls
    ORDER BY created_at DESC
    LIMIT 5;
  `;
 

  return db
    .query(queryString)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log("get one confession err");
      console.log(err.message);
    });
}
exports.mostRecentPoll = mostRecentPoll;

// const getResultsForPoll = function (pollId) {
//   const queryString = `SELECT results.votes, option_id
//   FROM results
//   JOIN options ON options.id = option_id
//   WHERE options.poll_id = $1;
//   `
//   const queryParams = [pollId];

//   return db
//     .query(queryString, queryParams)
//     .then((result) => {
//       return result.rows;
//     })
//     .catch((err) => {
//       console.log("get one poll err");
//       console.log(err.message);
//     });
// }
// exports.getResultsForPoll = getResultsForPoll;


//  create new poll

const addPoll = function (userId, content, created_at) {

  const queryString = `INSERT INTO polls (user_id, content, created_at)
    VALUES ($1, $2, $3) RETURNING *;`

  const queryParams = [userId, content, created_at];
  console.log("queryParams", queryParams)

  return db
    .query(queryString, queryParams)
    .then((result) => {
      console.log("Success")
      return result.rows[0];
    })
    .catch((err) => {
      console.log("add poll err");
      console.log(err.message);
    });
}
exports.addPoll = addPoll;


//  create new options

const addOptions = function (poll_id, content) {

  const queryString = `INSERT INTO options (poll_id, content)
    VALUES ($1, $2) RETURNING *;`
 
  const queryParams = [poll_id, content];


  return db
    .query(queryString, queryParams)
    .then((result) => {
      console.log("Success")
      return result.rows[0];
    })
    .catch((err) => {
      console.log("add options err");
      console.log(err.message);
    });
}
exports.addOptions = addOptions;



const addResults = function (option_id, user_id) {

  const queryString = `INSERT INTO results (option_id, user_id)
    VALUES ($1, $2) RETURNING *;`

  const queryParams = [option_id, user_id];

  return db
    .query(queryString, queryParams)
    .then((result) => {
      console.log("Success")
      return result.rows[0];
    })
    .catch((err) => {
      console.log("add results err");
      console.log(err.message);
    });
}
exports.addResults = addResults;





