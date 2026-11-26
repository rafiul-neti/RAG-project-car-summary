import { Router } from "express";
import { getAllCarsController } from "../controller";

const router = Router();

router.get("/", getAllCarsController);

export const carsRoutes = router;
