export interface GameServer {
  server_name: string;
  population: string;
  status: 'ONLINE' | 'LOCKED' | 'OFFLINE';
}
