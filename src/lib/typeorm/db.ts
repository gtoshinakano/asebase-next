import 'reflect-metadata';
import { getConnection, createConnection, Connection } from 'typeorm';
import { entities } from '@Entities';

const host = process.env.DB_HOST || '';
const port = Number(process.env.DB_PORT) || 3306;
const username = process.env.DB_USER || '';
const password = process.env.DB_PASS || '';
const database = process.env.DB_NAME || '';

let connectionReadyPromise: Promise<Connection> | null = null;

export const prepareConnection = (sync?: boolean) => {
  if (!connectionReadyPromise) {
    connectionReadyPromise = (async () => {
      // clean up old connection that references outdated hot-reload classes
      try {
        const staleConnection = getConnection();
        await staleConnection.close();
      } catch (error) {
        // no stale connection to clean up
      }

      // wait for new default connection
      const connection = await createConnection({
        type: 'mysql',
        host,
        port,
        username,
        password,
        database,
        entities: entities,
        synchronize: sync || false,
        logging: false, // true to see logging
      });

      return connection;
    })();
  }

  return connectionReadyPromise;
};
