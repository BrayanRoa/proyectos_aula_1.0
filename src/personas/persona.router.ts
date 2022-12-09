import { BaseRouter } from "../shared/router/router";
import { PersonaController } from "./controllers/persona.controller";
import { Request, Response } from "express";
import { PersonaMidlleware } from "./middlewares/persona.middleware";

export class PersonaRouter extends BaseRouter<
  PersonaController,
  PersonaMidlleware
> {
  constructor() {
    super(PersonaController, PersonaMidlleware);
  }

  routes(): void {
    this.router.get("/personas", (req: Request, res: Response) =>
      this.controller.getTeachers(req, res)
    );

    this.router.get("/persona/:correo", (req, res) =>
      this.controller.getPersonById(req, res)
    );

    this.router.post(
      "/createPerson",
      (req, res, next) => [this.middleware.personValidator(req, res, next)],
      (req: Request, res: Response) => this.controller.createUser(req, res)
    );

    this.router.patch(
      "/updatePerson/:correo",
      (req, res, next) => [
        this.middleware.updatePersonaValidator(req, res, next),
      ],
      (req, res) => this.controller.updatePersona(req, res)
    );

    this.router.post(
      "/persona/:materia/:grupo",
      (req, res, next) => [this.middleware.existGroupAndCourse(req, res, next)],
      (req, res) => this.controller.registerPersonInCourse(req, res)
    );

    this.router.delete("/deletePerson/:id", (req, res) =>
      this.controller.deleteUser(req, res)
    );
  }
}