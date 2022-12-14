/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { Application } from "express";
import cors from "cors";
import { sequelize } from "./db/conexion";
import "./db/models/index.models";
import "./helpers/expandir.express";
import morgan from "morgan";
import fileUpload from "express-fileupload";

import { PersonaRouter } from "./personas/persona.router";
import { MateriaRouter } from "./materias/materia.router";
import { AuthRouter } from "./auth/auth.router";

export class Server {
  private readonly app: Application;
  private readonly PORT: string;

  constructor() {
    this.app = express();
    this.PORT = process.env.PORT ?? "3000";

    this.db();
    this.middlewares();
    this.app.use("/api", this.routers());
  }

  async db() {
    try {
      await sequelize.sync({ force: false });
      console.log(`Conexión a BD exitosa!!`);
    } catch (error) {
      console.log(`No se pudo establecer la conexion - ${error}`);
    }
  }

  private middlewares(): any {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
      })
    );
  }

  routers(): Array<express.Router> {
    return [
      new AuthRouter().router,
      new PersonaRouter().router,
      new MateriaRouter().router,
    ];
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.log(
        `Server running on port ${this.PORT} - http://localhost:${this.PORT}`
      );
    });
  }
}

new Server().listen();
