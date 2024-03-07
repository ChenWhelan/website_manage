var sqlMap = {
    user: {
        add: 'insert into user (username, email, password) values (?,?,?)',
        select: 'select * from user'
    },
    news:{
       add:'insert into news (newsid, title, source, newtype, summary, content ,date)values(UUID(),?,?,?,?,?,NOW())',
       select: 'select * from news' 
    }
}

module.exports = sqlMap;