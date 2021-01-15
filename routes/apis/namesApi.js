import * as newsService from "../../services/namesService.js";

const getNewsList = async({response}) => {
    response.body = await newsService.getNewsList();
};

const getNewsItem = async({params, response}) => {
    response.body = await newsService.getNewsItem(params.id);
};

const deleteNewsItem = async({params, response}) => {
    await newsService.deleteNewsItem(params.id);
    response.status = 200;
};

const addNewsItem = async({request, response}) => {
    const body = request.body({type: 'json'});
    const document = await body.value;
    await newsService.addNewsItem(document.title, document.content);
    response.status = 200;
};

export { getNewsList, getNewsItem, deleteNewsItem, addNewsItem };