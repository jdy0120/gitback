import * as mysql from 'mysql2/promise';
import { myConfig } from './mysql-config';

export const myPool = mysql.createPool(myConfig);