import execute from "../2-data-access/dal";

const mysql_device =
  "CREATE TABLE IF NOT EXISTS device (id INT NOT NULL AUTO_INCREMENT,name VARCHAR(45) NULL,node_id INT NULL,minimum_value INT NULL,maximum_value INT NULL, PRIMARY KEY (id))";
const mysql_scenario =
  "CREATE TABLE IF NOT EXISTS scenario (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(250) NULL, device_type INT NULL,start_value INT NULL,end_value INT NULL,start_date VARCHAR(250) NULL,end_date VARCHAR(250) NULL,PRIMARY KEY (id))";

const mysql_auth =
  "CREATE TABLE IF NOT EXISTS users (id INT NOT NULL AUTO_INCREMENT, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL,user_name VARCHAR(50) NOT NULL, email VARCHAR(250) NOT NULL,password VARCHAR(30) NOT NULL, created VARCHAR(250) NOT NULL, PRIMARY KEY (id))";

const mySql_init = () => {
  execute(mysql_device);
  execute(mysql_scenario);
  execute(mysql_auth);
};

export default mySql_init;

// ALTER USER use_your_user IDENTIFIED WITH mysql_native_password BY 'your_password';
// flush privileges;
