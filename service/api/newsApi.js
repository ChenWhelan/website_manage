const models = require('../db/db');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../db/sqlMap');
const url = require('url');
const conn = mysql.createConnection(models.mysql);
conn.connect();


// 新增文章接口
router.post('/add', (req, res) => {
	const params = req.body;
	const sel_sql = $sql.news.select + " where newsid = '" + params.newsid + "'";
	const add_sql = $sql.news.add;
	console.log(sel_sql);
	
	conn.query(sel_sql, params.newsid, (error, results) => {
		if(error) {
			console.log(err);
		}
		if (results.length != 0 && params.newsid == results[0].newsid) {
			res.send("-1");   // -1 表示文章已经存在
		} else {
			conn.query(add_sql, [params.title, params.source,params.newtype, params.summary, params.content], (err, rst) => {
				if (err) {
					console.log(err);
				} else{
					console.log(rst);
					res.send("0"); // 0 表示文章创建成功
				}
			});
		}
	});
});


// 获取列表总数量
router.get('/getListCount', (req, res) => {
	let sql = 'select count(*) as count from news '
	let sqlArr = []
	conn.query(sql, sqlArr,function (error, data) {
	  if (error) {
		res.json({
		  status: '404',
		  msg: 'fail',
		  data: error
		})
	  } else {
		const results = data
		res.json({
		  status: '200',
		  msg: 'success',
		  data: results
		})
	  }
	})
  })
  
  // 获取数据
  router.get('/getNewsList', async(req, res) => {
	let obj = url.parse(req.url, true).query
	let startData = obj.startData*1
	let countData = obj.countData*1
	let sql = 'select * from news limit ?,?'
	let sqlArr = [startData, countData]
	// console.log(sqlArr)
	conn.query(sql, sqlArr,function (error, data) {
	  if (error) {
		res.json({
		  status: '404',
		  msg: 'fail',
		  data: error
		})
	  } else {
		const results = data
		res.json({
		  status: '200',
		  msg: 'success',
		  data: results
		})
	  }
	})
  })
  
  
  // 删除
  router.get('/deleteData', async(req, res) => {
	let obj = url.parse(req.url, true);
	console.log(obj.query)
	let newsid = obj.query.newsid
	let sql = 'delete from news where newsid = ?'
	console.log(newsid)
	let sqlArr = [newsid]
	console.log(sqlArr)
	conn.query(sql, sqlArr, function (_err, data) {
	  if (_err) {
		res.json({
		  status: '404',
		  msg: 'error',
		  data: _err
		})
	  } else {
		res.json({
		  status: '200',
		  msg: 'success',
		  data: data
		})
	  }
	})
  })
  
  // 修改数据
  router.post('/editData', async(req, res) => {
	console.log('in editdata')
	
	let title = await req.body.dataTitle
	let source = await req.body.datasource
	let newtype = await req.body.dataNewtype
	let summary = await req.body.datasummary
	let content = await req.body.datacontent
	let newsid = await req.body.dataNewsID
	const sql = 'update news set title=? , source=? ,newtype=? ,summary=? ,content=?,date=NOW() where newsid = ?'
	console.log(sql)
	const sqlArr = [title,source,newtype,summary,content,newsid]
	console.log(sqlArr)
	conn.query(sql, sqlArr, function(_err, data) {
	  if (_err) {
		res.json({
		  status: '404',
		  msg: 'fail',
		  data: _err
		})
	  } else {
		res.json({
		  status: '200',
		  msg: '修改成功',
		  data: data
		})
	  }
	})
  })
  
  // 搜索数据
  router.post('/searchData', async(req, res) => {
/* 	let obj = req.body
	console.log(req) */
    let obj = url.parse(req.url, true).query 
	console.log(obj)
	let label = obj.label
	let input = obj.input
	console.log(label)
	let sql = 'select * from news where ' + label + ' like \'%' + input + '%\''
	let sqlArr = []
	console.log(sqlArr)
	conn.query(sql, sqlArr, function(_err, data) {
	  if (_err) {
		res.json({
		  status: '404',
		  msg: 'error',
		  data: _err
		})
	  } else {
		res.json({
		  status: '200',
		  msg: 'success',
		  data: data
		})
	  }
	})
  })
module.exports = router;