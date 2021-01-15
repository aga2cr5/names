import { Router } from "../deps.js";
import * as namesController from "./controllers/namesController.js";
//import * as namesApi from "./apis/namesApi.js";

const router = new Router();

router.get('/', namesController.showNamesDefault);
router.get('/sorted/popularity', namesController.showNamesPopularity);
router.get('/sorted/alphabetical', namesController.showNamesAlphabetical);
router.post('/', namesController.addName);
router.post('/delete/:name', namesController.deleteName);

/*
router.get('/news/:id', newsController.newsItem);

router.get('/api/news', newsApi.getNewsList);
router.post('/api/news', newsApi.addNewsItem);
router.get('/api/news/:id', newsApi.getNewsItem);
router.delete('/api/news/:id', newsApi.deleteNewsItem);
*/
export { router };