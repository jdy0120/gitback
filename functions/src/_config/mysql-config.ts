interface Config {
  user: string;
  password: string;
  port: number;
  database: string;
  mulitpleStatements: boolean;
  host?: string;
  socketPath?: string;
}
const mysqlHost = '35.223.127.108'

const myConfig: Config = {
  user: 'root',
  password: '1111',
  port: 3306,
  database: 'gitback',
  mulitpleStatements: true,
  host: mysqlHost
}

export { myConfig };