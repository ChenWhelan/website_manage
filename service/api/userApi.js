const models = require('../db/db');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../db/sqlMap');
const url = require('url');
const conn = mysql.createConnection(models.mysql);
conn.connect();

// 登录接口
router.post('/login',(req,res)=>{
	const user = req.body;
	const sel_email = $sql.user.select + " where email = '" + user.email + "'";
	console.log(sel_email);
	conn.query(sel_email, user.email, (error, results)=>{
		if (error) {
			throw error;
		}
		console.log(results)
		if (results[0] === undefined) {
			res.send("-1");  // -1 表示查询不到，用户不存在，即邮箱填写错误
		} else{
			if (results[0].email == user.email && results[0].password == user.password) {
				res.send("0");  // 0 表示用户存在并且邮箱密码正确
			} else{
				res.send("1");  // 1 表示用户存在，但密码不正确
			}
		}
	})
});

// 注册接口
router.post('/add', (req, res) => {
	const params = req.body;
	const sel_sql = $sql.user.select + " where username = '" + params.username + "'";
	const add_sql = $sql.user.add;
	console.log(sel_sql);
	
	conn.query(sel_sql, params.username, (error, results) => {
		if(error) {
			console.log(err);
		}
		if (results.length != 0 && params.username == results[0].username) {
			res.send("-1");   // -1 表示用户名已经存在
		} else {
			conn.query(add_sql, [params.username, params.email, params.password], (err, rst) => {
				if (err) {
					console.log(err);
				} else{
					console.log(rst);
					res.send("0"); // 0 表示用户创建成功
				}
			});
		}
	});
});

// 获取列表总数量
router.get('/getUserListCount', (req, res) => {
	let sql = 'select count(*) as count from user'
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
  router.get('/getUserList', async(req, res) => {
	let obj = url.parse(req.url, true).query
	let startData = obj.startData*1
	let countData = obj.countData*1
	let sql = 'select * from user limit ?,?'
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
  router.get('/deleteUserData', async(req, res) => {
	let obj = url.parse(req.url, true);
	console.log(obj.query)
	let email = obj.query.email
	let sql = 'delete from user where email = ?'
	console.log(email)
	let sqlArr = [email]
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
  router.post('/editUserData', async(req, res) => {
	console.log('in editdata')
	let username = await req.body.dataName
	let password = await req.body.dataPwd
	let email = await req.body.dataemail
	const sql = 'update user set username=? , password=? where email = ?'
	console.log(sql)
	const sqlArr = [username, password,email]
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
  router.post('/searchUserData', async(req, res) => {
/* 	let obj = req.body
	console.log(req) */
    let obj = url.parse(req.url, true).query 
	console.log(obj)
	let label = obj.label
	let input = obj.input
	console.log(label)
	let sql = 'select * from user where ' + label + ' like \'%' + input + '%\''
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