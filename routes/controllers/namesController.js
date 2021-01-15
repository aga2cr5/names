import * as namesService from "../../services/namesService.js";

let data = {
  name: '',
  amount: '',
  errors: {}
};

const showNamesDefault = ({response}) => {
  response.redirect('/sorted/popularity');
}

const showNamesPopularity = async({render}) => {
  render('index.ejs', { data: data, names: await namesService.getNamesOrderByAmount(), totalAmount: await namesService.getAmountOfNames() });
}

const showNamesAlphabetical= async({render}) => {
  render('index.ejs', { data: data, names: await namesService.getNamesOrderByName(), totalAmount: await namesService.getAmountOfNames() });
}

const addName = async({response, request, render}) => {
  const result = await namesService.setName(request);
  if (result) {
    render('index.ejs', { data: result, names: await namesService.getNames(), totalAmount: await namesService.getAmountOfNames() });
  } else {
    response.status = 200;
    response.redirect('/');
  }
}

const deleteName = async({response, params}) => {
  const name = params.name;
  const result = await namesService.removeName(name);
  if (result) {
    response.body = result;
    response.status = 401;
  } else {
    response.status = 200;
    response.redirect('/');
  }
}

export { showNamesDefault, showNamesPopularity, showNamesAlphabetical, addName, deleteName };