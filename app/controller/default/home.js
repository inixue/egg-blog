'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hello api';
  }

  // 获取文章列表
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

  // 根据文章ID查询文章详情
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

  // 获取头部类别
  async getTypeInfo() {
    const result = await this.app.mysql.select('type')
    this.ctx.body = {
      data: result,
      code: 1,
      msg: 'success'
    }
  }

  // 根据类别ID查询获得文章列表
  async getListById() {
    let id = this.ctx.params.id
    let sql = "SELECT article.id as id, "+
              "article.title as title, "+
              "article.introduce as introduce, "+
              "FROM_UNIXTIME(article.add_time, '%Y-%m-%d %H:%i:%s') as add_time, "+
              "article.view_count as view_count, "+
              "type.type_name as type_name "+
              "FROM article LEFT JOIN type ON article.type_id = type.Id "+
              "WHERE type_id=" + id
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {
      data: result,
      code: 1,
      msg: 'success'
    }
  }

}

module.exports = HomeController;
