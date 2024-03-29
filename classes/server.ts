import express from "express";
import { SERVER_PORT } from "../global/enviroment";
import socketIO from "socket.io";
import http from "http";
import * as socket from "../sockets/socket";

export default class Server {
  public app: express.Application;
  public port: number;
  public io: socketIO.Server;
  private httpServer: http.Server;
  private static _instance: Server;

  private constructor() {
    this.app = express();
    this.port = SERVER_PORT;
    this.httpServer = new http.Server(this.app);
    this.io = new socketIO.Server(this.httpServer, {
      cors: { origin: true, credentials: true },
    });
    this.listenSockets();
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  private listenSockets() {
    console.log("Escuchando sockets");
    this.io.on("connection", (cliente) => {
      //conectar cliente
      socket.conectarCliente(cliente);

      //Configurar usuarios
      socket.configurarUsuario(cliente, this.io);
      // console.log("Cliente contado");

      // Obtener usuarios activos
      socket.obtenerUsuarios(cliente, this.io);

      //mensaje
      socket.mensaje(cliente, this.io);

      //desconectar
      socket.desconectar(cliente, this.io);
    });
  }

  start(callback: Function) {
    this.httpServer.listen(this.port, callback());
  }
}
