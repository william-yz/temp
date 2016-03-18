var oracledb = require('oracledb');
console.log(oracledb);
oracledb.getConnection(
  {
    user          : "SHP_APPLN",
    password      : "SHP_APPLN",
    connectString : "exn1-scan/iris4s1_2_qa1.oocl"
  },
  function(err, connection)
  {
    if (err) { console.error(err.message); return; }

    connection.execute(
      "select 1 from dual",
      // [],  // bind value for :id
      function(err, result)
      {
        if (err) { console.error(err.message); return; }
        console.log(result.rows);
      });
  });
