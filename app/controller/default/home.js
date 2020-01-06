'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hello api';
  }

  async getArticleList() {
    let sql = 'SELECT article.id as id, '+
              'article.title as title, '+
              'article.introduce as introduce, '+
              'article.add_time as add_time, '+
              'article.view_count as view_count, '+
              'type.type_name as type_name '+
              'FROM article LEFT JOIN type ON article.type_id = type.Id'
    const results = await this.app.mysql.query(sql)
    this.ctx.body = {
      data: results,
      code: 1,
      msg: 'success'
    }
  }
}

module.exports = HomeController;
