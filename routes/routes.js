import { Router } from "../deps.js";
import * as namesController from "./controllers/namesController.js";

const router = new Router();

router.get('/', namesController.showNamesDefault);
router.get('/sorted/popularity', namesController.showNamesPopularity);
router.get('/sorted/alphabetical', namesController.showNamesAlphabetical);
router.post('/', namesController.showAmountOfName); 

export { router };