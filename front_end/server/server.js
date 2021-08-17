const express = require("express");
const app = express();
const port = 3001; // react의 기본값은 3000이니까 3000이 아닌 아무 수
const cors = require("cors");
// const bodyParser = require("body-parser");
const mysql = require("mysql"); // mysql 모듈 사용

var connection = mysql.createConnection({
  host: "localhost",
  user: "root", //mysql의 id
  password: "", //mysql의 password
  database: "clean_db", //사용할 데이터베이스
});
connection.connect();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
//rep는 앞에서 보낸 객체를 받아 body가 앞에서 보낸 데이터
//res는 express에서 데이터를 보낼때에 사용

app.get("/toilet_info", (req, res) => {
  connection.query("SELECT * FROM toilet_info", function (err, rows) {
    if (err) {
      console.log("불러오기 실패");
    } else {
      console.log("!!불러오기 성공");
      console.log(JSON.stringify(rows));
      // console.log(JSON.stringify(rows).length);
      res.send(JSON.stringify(rows));
    }
  });
});

app.post("/risk", (req, res) => {
  const camera = req.body.camera;
  const safe_check = req.body.safe_check;
  const public_toilet = req.body.public_toilet;
  const name = req.body.name;
  const pw = req.body.pw;
  const context = req.body.context;

  connection.query(
    "INSERT INTO risk (camera, safe_check, public_toilet, name, pw, context) value (?, ?, ?, ?, ?, ?)",
    [camera],
    [safe_check],
    [public_toilet],
    [name],
    [pw],
    [context],
    function (err, rows, fields) {
      if (err) {
        console.log("실패");
      } else {
        console.log("성공");
        console.log(rows);
        res.send(rows);
      }
    }
  );
});

//관리자 로그인 @TODO : 미완성
app.post("/admin/login", (req, res) => {
  const email = req.body.email;
  // const email = "qwer";
  connection.query(
    "SELECT email, pw FROM admin WHERE email = ?",
    [email],
    function (err, rows) {
      if (err) {
        console.log("로그인 실패");
      } else {
        console.log("로그인 성공");
        const reqData = rows;
        res.send(reqData);
      }
    }
  );
});

// app.post("/idplz", (req,res)=>{
//     const test = req.body.test;
//     connection.query("INSERT INTO test (name) value (?)",[test],
//     function(err,rows,fields){
//         if(err){
//             console.log("실패");
//         }else{
//             console.log("성공");
//         };
//     });
// });

app.listen(port, () => {
  console.log(`Connect at http://localhost:${port}`);
});
