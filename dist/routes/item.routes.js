"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const item_controller_1 = require("../controllers/item.controller");
const router = (0, express_1.Router)();
const itemController = new item_controller_1.ItemController();
router.get("/", itemController.getAll);
router.get("/mans", itemController.getMenItems);
router.get("/:id", itemController.getById);
router.post("/", itemController.create);
router.put("/:id", itemController.update);
router.delete("/:id", itemController.delete);
exports.default = router;
//# sourceMappingURL=item.routes.js.map