const express = require('express')
const app = express()
const sql = require('mssql')
const cors = require('cors')
const { json } = require('express')

app.use(express.json())
app.use(cors())



const config = {
    user: 'sa',
    password: '123',
    server: 'THANHBINH\\SQLEXPRESS',
    database: 'koc_2020',
    port: 1433
}

sql.connect(config, function (err) {
    if (err) console.log(err)
    let sqlReq = new sql.Request()

    app.all('/', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next()
    });

    //api login list
    app.post('/login-list', (req, res) => {
        let sqlQuery = 'select * from NGUOI_DUNG'
        sqlReq.query(sqlQuery, function (err, data) {
            if (err) console.log(err)

            var user = {
                code: 0,
                message: "thanh cong",
                data: data.recordset
            }

            res.json(user)
        })
    })

    //api login list sinh vien
    app.post('/sinhvien-list', (req, res) => {

        if (req.body.PERMISSION == 3) {
            var user = {
                code: 0,
                message: "ADmin k co sinh vien",
                data: []
            }
            res.json(user)
            return;
        } else {
            let sqlQuery = `select * from NGUOI_DUNG WHERE NGUOI_DUNG.CLASS = '${req.body.CLASS}' AND NGUOI_DUNG.PERMISSION = 1`
            // let sqlQuery = `select * from NGUOI_DUNG WHERE NGUOI_DUNG.CLASS = '18CN2' AND NGUOI_DUNG.PERMISSION = 1`
            sqlReq.query(sqlQuery, function (err, data) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }

                var user = {
                    code: 0,
                    message: "thanh cong",
                    data: data.recordset
                }

                res.json(user)
                return;

            })

        }

    })

    // api lay user
    app.post('/getuser', (req, res) => {
        let sqlQuery = 'select * from NGUOI_DUNG where ID = ' + req.body.ID
        sqlReq.query(sqlQuery, function (err, data) {
            if (err) console.log(err)

            var user = {
                code: 0,
                message: "thanh cong",
                data: data.recordset
            }

            res.json(user)
        })
    })

    //api login
    app.post('/login', (req, res) => {
        let sqlQuery = 'select USERNAME, PASSWORD, PERMISSION FROM NGUOI_DUNG'
        sqlReq.query(sqlQuery, function (err, data) {
            if (err) {
                console.log(err);
                var user = {
                    code: 1,
                    message: "khong co phan hoi tu may chu",
                    data: []
                }
            } else {
                for (i of data.recordset) {
                    if (req.body.username == i.USERNAME && req.body.password == i.PASSWORD) {
                        var user = {
                            code: 0,
                            message: "thanh cong",
                            data: [
                                {
                                    PERMISSION: i.PERMISSION
                                }
                            ]
                        }
                    } else if (req.body.username != i.USERNAME || req.body.password != i.PASSWORD) {
                        var user = {
                            code: 1,
                            message: "sai thong tin",
                            data: []
                        }
                    }
                }
            }
            res.json(user)
        })
    })



    //api register
    app.post('/register/nguoidung', (req, res) => {
        let sqlQuery = `
            INSERT INTO NGUOI_DUNG(
		FIRST_NAME, 
		LAST_NAME, 
		PERMISSION, 
		USERNAME, 
		PASSWORD, 
		CLASS,
		MA_SV
	) VALUES(
		'${req.body.FIRST_NAME}',
		'${req.body.LAST_NAME}',
		${req.body.PERMISSION},
		'${req.body.USERNAME}',
		'${req.body.PASSWORD}',
		'${req.body.CLASS}',
		'${req.body.MA_SV}'
	)
        `

// let sqlQuery = 'INSERT INTO NGUOI_DUNG(FIRST_NAME, LAST_NAME, PERMISSION, USERNAME, PASSWORD, CLASS) VALUES( ' + req.body.FIRST_NAME + ', ' + req.body.LAST_NAME + ', ' + req.body.PERMISSION + ', ' + req.body.USERNAME + ', ' + req.body.PASSWORD + ', ' + req.body.CLASS + ')'
        sqlReq.query(sqlQuery, function (err, data) {
            if (err) {
                console.log(err);
                var user = {
                    code: 0,
                    message: "loi",
                }
            } else {
                var user = {
                    code: 0,
                    message: "thanh cong",
                }
            }
            res.json(user)

        })
    })

    //api register
    app.post('/register/phongthi', (req, res) => {
        let sqlQuery = 'INSERT INTO PHONG_THI(MON, GIAOVIEN, CLASS) VALUES( ' + req.body.MON + ', ' + req.body.GIAOVIEN + ', ' + req.body.CLASS + ')'
        sqlReq.query(sqlQuery, function (err, data) {
            if (err) {
                console.log(err);
                var user = {
                    code: 0,
                    message: "loi",
                }
            } else {
                var user = {
                    code: 0,
                    message: "thanh cong",
                }
            }
            res.json(user)

        })
    })

    //api get phong thi
    app.post('/phongthi-list', (req, res) => {
        let sqlQuery = 'select * from PHONG_THI'
        sqlReq.query(sqlQuery, function (err, data) {
            if (err) console.log(err)

            var user = {
                code: 0,
                message: "thanh cong",
                data: data.recordset
            }

            res.json(user)
        })
    })

    //xoa nguoi dung
    app.post('/delete/nguoidung', (req, res) => {
        let sqlQuery = 'delete from NGUOI_DUNG where ID = ' + req.body.ID
        sqlReq.query(sqlQuery, function (err, data) {
            if (err) {
                console.log(err);
                var user = {
                    code: 0,
                    message: "loi",
                }
            } else {
                var user = {
                    code: 0,
                    message: "thanh cong",
                }
            }

            res.json(user)
        })
    })

    //api danh sach cau hoi
    app.post('/danhsachcauhoi', (req, res) => {
        let sqlQuery = 'select * from CAU_HOI'
        sqlReq.query(sqlQuery, function (err, data) {
            if (err) {
                console.log(err);
                var user = {
                    code: 0,
                    message: "loi",
                }
            } else {
                var user = {
                    code: 0,
                    message: "thanh cong",
                    data: data.recordset
                }
            }

            res.json(user)
        })
    })

    //api them cau hoi
    app.post('/register/cauhoi', (req, res) => {
        let sqlQuery = 'INSERT INTO CAU_HOI (CAUHOI, DAPAN_A, DAPAN_B, DAPAN_C, DAPAN_D, IS_TRAC_NGHIEM, DAPAN, RESULT, MON) VALUES ( ' + req.body.CAUHOI + ',' + req.body.DAPAN_A + ',' + req.body.DAPAN_B + ',' + req.body.DAPAN_C + ',' + req.body.DAPAN_D + ',' + req.body.IS_TRAC_NGHIEM + ',' + req.body.DAPAN + ',' + req.body.RESULT + ',' + req.body.MON + ')'
        sqlReq.query(sqlQuery, function (err, data) {
            if (err) {
                console.log(err);
                var user = {
                    code: 0,
                    message: "loi",
                }
            } else {
                var user = {
                    code: 0,
                    message: "thanh cong",
                    data: []
                }
            }

            res.json(user)
        })
    })

    //api xoa cau hoi
    app.post('/delete/cauhoi', (req, res) => {
        let sqlQuery = 'delete from CAU_HOI where ID = ' + req.body.ID
        sqlReq.query(sqlQuery, function (err, data) {
            if (err) {
                console.log(err);
                var user = {
                    code: 0,
                    message: "loi",
                }
            } else {
                var user = {
                    code: 0,
                    message: "thanh cong",
                }
            }

            res.json(user)
        })
    })

    //list class
    app.post('/lop', (req, res) => {
        let sqlQuery = 'select * from CLASS'
        sqlReq.query(sqlQuery, function (err, data) {
            if (err) {
                console.log(err);
                var user = {
                    code: 0,
                    message: "loi",
                }
            } else {
                var user = {
                    code: 0,
                    message: "thanh cong",
                    data: data.recordset
                }
            }

            res.json(user)
        })
    })

    //api them cau hoi
    app.post('/edit/nguoidung', (req, res) => {
        let sqlQuery = `
        UPDATE NGUOI_DUNG SET 
            NGUOI_DUNG.FIRST_NAME = '${req.body.FIRST_NAME}',  
            NGUOI_DUNG.LAST_NAME = '${req.body.LAST_NAME}',
            NGUOI_DUNG.USERNAME = '${req.body.USERNAME}',
            NGUOI_DUNG.PASSWORD = '${req.body.PASSWORD}',
            NGUOI_DUNG.CLASS = '${req.body.CLASS}',
            NGUOI_DUNG.BIRTHDAY = ${req.body.BIRTHDAY}
        WHERE NGUOI_DUNG.ID = ${req.body.ID}
        `
        sqlReq.query(sqlQuery, function (err, data) {
            if (err) {
                var user = {
                    code: 0,
                    message: "loi",
                }
            } else {
                var user = {
                    code: 0,
                    message: "thanh cong",
                    data: []
                }
            }

            res.json(user)
        })
    })

    //change password
    app.post('/chagepassword', (req, res) => {
        let sqlQuery = `
        UPDATE NGUOI_DUNG
	        SET PASSWORD = '${req.body.NEW_PASS}'
	        WHERE ID = ${req.body.ID}
        `
        sqlReq.query(sqlQuery, function (err, data) {
            if (err) {
                var user = {
                    code: 0,
                    message: "loi",
                }
            } else {
                var user = {
                    code: 1,
                    message: "thanh cong",
                    data: []
                }
            }

            res.json(user)
        })
    })
})

app.listen(3000, () => {
    console.log("on to port 3000");
})
