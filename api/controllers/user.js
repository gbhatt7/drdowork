import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM eventtable";
  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  const q =
    "INSERT INTO eventtable ( `eventname`, `eventplace`, `eventdate`, `eventstatus`) VALUES(?)";

  const values = [
    req.body.eventname,
    req.body.eventplace,
    req.body.eventdate,
    req.body.eventstatus,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Record inserted.");
  });
};

export const updateUser = (req, res) => {
  const q =
    "UPDATE eventtable SET `eventname` = ?, `eventplace` = ?, `eventdate` = ?, `eventstatus` = ? WHERE `id` = ?";

  const values = [
    req.body.eventname,
    req.body.eventplace,
    req.body.eventdate,
    req.body.eventstatus,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Record Updated.");
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM eventtable WHERE id = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Record Deleted.");
  });
};

export const getemployeeUsers = (_, res) => {
  const q = "SELECT * FROM employeetable";
  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addemployeeUser = (req, res) => {
  const q =
    "INSERT INTO employeetable ( `employeename`, `employeeemail`, `employeedob`, `employeephoneno`) VALUES(?)";

  const values = [
    req.body.employeename,
    req.body.employeeemail,
    req.body.employeedob,
    req.body.employeephoneno,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Record inserted.");
  });
};

export const updateemployeeUser = (req, res) => {
  const q =
    "UPDATE employeetable SET `employeename` = ?, `employeeemail` = ?, `employeedob` = ?, `employeephoneno` = ? WHERE `id` = ?";

  const values = [
    req.body.employeename,
    req.body.employeeemail,
    req.body.employeedob,
    req.body.employeephoneno,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Record Updated.");
  });
};

export const deleteemployeeUser = (req, res) => {
  const q = "DELETE FROM employeetable WHERE id = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Record Deleted.");
  });
};

export const gettrainingUsers = (_, res) => {
  const q = "SELECT * FROM trainingtable";
  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addtrainingUser = (req, res) => {
  const q =
    "INSERT INTO trainingtable ( `trainingname`, `trainingplace`, `trainingdate`, `trainingstatus`) VALUES(?)";

  const values = [
    req.body.trainingname,
    req.body.trainingplace,
    req.body.trainingdate,
    req.body.trainingstatus,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Record inserted.");
  });
};

export const updatetrainingUser = (req, res) => {
  const q =
    "UPDATE trainingtable SET `trainingname` = ?, `trainingplace` = ?, `trainingdate` = ?, `trainingstatus` = ? WHERE `id` = ?";

  const values = [
    req.body.trainingname,
    req.body.trainingplace,
    req.body.trainingdate,
    req.body.trainingstatus,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Record Updated.");
  });
};

export const deletetrainingUser = (req, res) => {
  const q = "DELETE FROM trainingtable WHERE id = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Record Deleted.");
  });
};
