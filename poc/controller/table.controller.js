'use strict';

var db = require('../db/db');








module.exports.getTableInfo = function(req, res) {
  db.query(`select * from columns where table_name = ? and table_schema = 'itas'`, req.params.tableName, function(err, rows, fields) {
    var columns = rows.map(row => {
      return {
        name : row.COLUMN_NAME,
        order : row.ORDINAL_POSITION,
        defaultValue : row.COLUMN_DEFAULT,
        nullable : row.IS_NULLABLE,
        dataType :row.DATA_TYPE,
        maxLength : row.CHARACTER_MAXIMUM_LENGTH,
        precision : row.NUMERIC_PRECISION,
        scale : row.NUMERIC_SCALE,
        columnType : row.COLUMN_TYPE,
        isKey : row.COLUMN_KEY
      }
    });
    res.json({
      tableName : rows[0].TABLE_NAME,
      columns : columns
    });
  });
}