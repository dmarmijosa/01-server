import { Router, Request, Response } from "express";
import Server from "../classes/server";
import { usuariosConectados } from "../sockets/socket";

const router = Router();
router.get("/mensajes", (req: Request, res: Response) => {
  res.json({
    ok: true,
    msg: "Todo esta bien",
  });
});

router.post("/mensajes", (req: Request, res: Response) => {
  const { cuerpo, de } = req.body;
  const server = Server.instance;
  server.io.emit("mensaje-nuevo", { de, cuerpo });
  res.json({
    ok: true,
    mensaje: "POST - LISTO",
    cuerpo,
    de,
  });
});

router.post("/mensajes/:id", (req: Request, res: Response) => {
  const { cuerpo, de } = req.body;
  const id = req.params.id;

  const payload = {
    de,
    cuerpo,
  };

  const server = Server.instance;
  server.io.in(id).emit("mensaje-privado", payload);
  res.json({
    ok: true,
    mensaje: "POST - LISTO",
    cuerpo,
    de,
    id,
  });
});
// Servicio para obtener todos los id de los usurios
router.get("/usuarios", (req: Request, res: Response) => {
  const server = Server.instance;
  server.io
    .fetchSockets()
    .then((socket: any[]) => {
      if (socket.length > 0) {
        let aux: string[] = [];
        socket.forEach((user: any) => {
          aux.push(user.id);
        });
        return res.json({
          ok: true,
          clientes: aux,
        });
      } else {
        return res.json({
          ok: false,
          clientes: [],
        });
      }
    })
    .catch((err) => {
      return res.json({
        ok: false,
        clientes: [],
      });
    });
});

//get nombres Usuarios
router.get("/usuarios/detalle", (req: Request, res: Response) => {
  res.json({
    ok: true,
    clientes: usuariosConectados.getLista(),
  });
});
export default router;
