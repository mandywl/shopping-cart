const { Table1, Table2 } = require("../../models/models");

module.exports = {
  getApi: async function(req, res) {
    try {
      result1 = await Table1.findall();
      result2 = await Table2.findall();
      res.json({ ...result1, ...result2 });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.code });
    }
  },
  createData: async function(req, res) {
    try {
      result1 = await Table1.findall();
      result2 = await Table2.findall();
      res.json({ ...result1, ...result2 });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.code });
    }
  },
  readAllData: async function(req, res) {
    try {
      result1 = await Table1.findall();
      result2 = await Table2.findall();
      res.json({ ...result1, ...result2 });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.code });
    }
  },
  updateData: async function(req, res) {
    try {
      result1 = await Table1.findall();
      result2 = await Table2.findall();
      res.json({ ...result1, ...result2 });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.code });
    }
  },
  deleteData: async function(req, res) {
    try {
      result1 = await Table1.findall();
      result2 = await Table2.findall();
      res.json({ ...result1, ...result2 });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.code });
    }
  },
};
