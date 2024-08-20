// models/debate.js
const knex = require('../config/db');

class Debate {
  static async getAll() {
    return knex('debates')
      .join('citizens as c1', 'debates.candidate1_id', 'c1.national_id')
      .join('citizens as c2', 'debates.candidate2_id', 'c2.national_id')
      .select(
        'debates.id',
        'debates.name',
        'debates.start_time',
        'debates.end_time',
        'c1.name as candidate1_name',
        'c2.name as candidate2_name',
        'debates.isApproved',
        'debates.code'
      );
  }

  static async approveDebate(id, code) {
    return knex('debates')
      .where({ id })
      .update({ isApproved: true, code });
  }

  static async rejectDebate(id) {
    return knex('debates')
      .where({ id })
      .update({ isApproved: false });
  }
}

module.exports = Debate;
