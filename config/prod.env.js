'use strict'
module.exports = {
  NODE_ENV: '"production"',
  BRANCH_ENV: JSON.stringify(process.env.BRANCH_ENV) || '"base"',
};
