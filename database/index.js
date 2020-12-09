var express = require("express");
var app = express();
var oracledb = require("oracledb");
var dbconfig = require("./dbconfig.js");
var cors = require("cors");
var bodyParser = require("body-parser");

app.use(express.json());
app.use(cors(), function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/services/ders_kods", (req, res) => {
  dbconfig(`SELECT DISTINCT ders_kod FROM course_schedule`,
    [], (err, results) => {
      if (!err) res.send(results.rows);
    }
  )
});

app.get("/services/stud_ids/:id", (req,res) => {
  var objs = req.url.split("/")[3].replace("_", " ").split(",");
  dbconfig(`SELECT DISTINCT stud_id FROM course_selections WHERE year = ${objs[0]} AND term = ${objs[1]} ORDER BY stud_id ASC`,
    [], (err, results) => {
      if (!err) res.send(results.rows);
    }
  )
})

app.get("/services/failed_stud_ids/:id", (req,res) => {
  var objs = req.url.split("/")[3].replace("_", " ").split(",");
  dbconfig(`SELECT DISTINCT stud_id FROM course_selections WHERE year = ${objs[0]} AND term = ${objs[1]} AND qiymet_yuz < 50 ORDER BY stud_id ASC`,
    [], (err, results) => {
      if (!err) res.send(results.rows);
    }
  )
})

app.get("/services/emp_ids/:id", (req,res) => {
  var objs = req.url.split("/")[3].replace("_", " ").split(",");
  dbconfig(`SELECT DISTINCT emp_id FROM course_sections WHERE year = ${objs[0]} AND term = ${objs[1]} ORDER BY emp_id ASC`,
    [], (err, results) => {
      if (!err) res.send(results.rows);
    }
  )
})

app.get("/services/ders_kods/:id", (req, res) => {
  var objs = req.url.split("/")[3].replace("_", " ").split(",");
  dbconfig(`SELECT DISTINCT ders_kod FROM course_sections WHERE emp_id = ${objs}`,
    [], (err, results) => {
      if (!err) res.send(results.rows);
    }
  )
});

app.get("/services/years", (req, res) => {
  dbconfig(`SELECT DISTINCT year FROM course_selections ORDER BY year ASC`,
    [], (err, results) => {
      if (!err) res.send(results.rows);
    }
  )
});

app.get("/services/find_most_popular_teachers/:id", (req, res) => {
  var objs = req.url.split("/")[3].replace("_", " ").split(",");
  dbconfig(`SELECT * FROM TABLE (find_most_popular_teachers ('${objs[0].toUpperCase()}', ${objs[1]}, ${objs[2]}))`,
    [], (err, results) => {
      if (!err) res.send(results.rows);
    }
  )
});

app.get("/services/find_most_popular_courses/:id", (req, res) => {
  var objs = req.url.split("/")[3].replace("_", " ").split(",");
  dbconfig(`SELECT * FROM TABLE (find_most_popular_courses (${objs[0]}, ${objs[1]}))`,
    [], (err, results) => {
      if (!err) res.send(results.rows);
    }
  )
});

app.get("/services/calculate_gpa/:id", (req, res) => {
  var objs = req.url.split("/")[3].replace("_", " ").split(",");
  dbconfig(`SELECT * FROM TABLE (find_total ('${objs[0]}',${objs[1]}, ${objs[2]}))`,
    [], (err, results) => {
      if (!err) res.send(results.rows);
    }
  )
});

app.get("/services/find_missing_students/:id", (req, res) => {
  var objs = req.url.split("/")[3].replace("_", " ").split(",");
  dbconfig(`SELECT * FROM TABLE (find_missing_students (${objs[0]},${objs[1]}))`,
    [], (err, results) => {
      if (!err) res.send(results.rows);
    }
  )
});

app.get("/services/find_expenses/:id", (req, res) => {
  var objs = req.url.split("/")[3].replace("_", " ").split(",");
  dbconfig(objs[3].toUpperCase() !== "UNDEFINED" ?
    `SELECT * FROM TABLE (find_expenses ('${objs[0]}',${objs[1]},${objs[2]},${objs[3]}))`
    :
    `SELECT * FROM TABLE (find_expenses ('${objs[0]}',${objs[1]},${objs[2]}))`,
    [], (err, results) => {
      if (!err) res.send(results.rows);
    }
  )
});

app.get("/services/create_teacher_schedule/:id", (req, res) => {
  var objs = req.url.split("/")[3].replace("_", " ").split(",");
  dbconfig(
    `SELECT * FROM TABLE (create_teacher_schedule ('${objs[0]}',${objs[1]},${objs[2]}))`,
    [], (err, results) => {
      if (!err) res.send(results.rows);
    }
  )
});

app.get("/services/create_student_schedule/:id", (req, res) => {
  var objs = req.url.split("/")[3].replace("_", " ").split(",");
  dbconfig(
    `SELECT * FROM TABLE (create_student_schedule ('${objs[0]}',${objs[1]},${objs[2]}))`,
    [], (err, results) => {
      if (!err) res.send(results.rows);
    }
  )
});

app.get("/services/find_selected_subjects/:id", (req, res) => {
  var objs = req.url.split("/")[3].replace("_", " ").split(",");
  dbconfig(
    `SELECT * FROM TABLE (find_selected_subjects ('${objs[0]}',${objs[1]},${objs[2]}))`,
    [], (err, results) => {
      if (!err) res.send(results.rows);
    }
  )
});

app.get("/services/find_best_flow/:id", (req, res) => {
  var objs = req.url.split("/")[3].replace("_", " ").split(",");
  dbconfig(
    `SELECT * FROM TABLE (find_best_flow (${objs[0]},'${objs[1]}',${objs[2]},${objs[3]}))`,
    [], (err, results) => {
      if (!err) res.send(results.rows);
    }
  )
});

app.get("/services/find_teachers_rating/:id", (req, res) => {
  var objs = req.url.split("/")[3].replace("_", " ").split(",");
  dbconfig(`SELECT * FROM TABLE (find_teachers_rating (${objs[0]}, ${objs[1]}))`,
    [], (err, results) => {
      if (!err) res.send(results.rows);
    }
  )
});

app.get("/services/courses_rating/:id", (req, res) => {
  var objs = req.url.split("/")[3].replace("_", " ").split(",");
  dbconfig(`SELECT * FROM TABLE (courses_rating (${objs[0]}, ${objs[1]}))`,
    [], (err, results) => {
      if (!err) res.send(results.rows);
    }
  )
});

app.get("/services/money_rules_the_world", (req, res) => {
  dbconfig(`SELECT * FROM TABLE (calculate_profit ())`,
    [], (err, results) => {
      if (!err) res.send(results.rows);
    }
  )
});
app.listen(5000, function () {
  console.log(`listening`);
});