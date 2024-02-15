"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/mensajes", (req, res) => {
    res.json({
        ok: true,
        msg: "Todo esta bien",
    });
});
router.post("/mensajes", (req, res) => {
    const { cuerpo, de } = req.body;
    res.json({
        ok: true,
        mensaje: "POST - LISTO",
        cuerpo,
        de,
    });
});
router.post("/mensajes/:id", (req, res) => {
    const { cuerpo, de } = req.body;
    const id = req.params.id;
    res.json({
        ok: true,
        mensaje: "POST - LISTO",
        cuerpo,
        de,
        id
    });
});
exports.default = router;
