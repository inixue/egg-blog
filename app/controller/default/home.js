'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hello api';
  }

  async getArticleList() {
    let sql = "SELECT article.id as id, "+
              "article.title as title, "+
              "article.introduce as introduce, "+
              "FROM_UNIXTIME(article.add_time, '%Y-%m-%d %H:%i:%s') as add_time, "+
              "article.view_count as view_count, "+
              "type.type_name as type_name "+
              "FROM article LEFT JOIN type ON article.type_id = type.Id"
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {
      data: result,
      code: 1,
      msg: 'success'
    }
  }

  async getArticleById() {
    let id = this.ctx.params.id
    let sql = "SELECT article.id as id, "+
              "article.title as title, "+
              "article.introduce as introduce, "+
              "article.article_content as article_content, "+
              "FROM_UNIXTIME(article.add_time, '%Y-%m-%d %H:%i:%s') as add_time, "+
              "article.view_count as view_count, "+
              "type.type_name as type_name, "+
              "type.id as type_id "+
              "FROM article LEFT JOIN type ON article.type_id = type.Id "+
              "WHERE article.id="+id
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {
      data: result,
      code: 1,
      msg: 'success'
    }
  }
}

module.exports = HomeController;
