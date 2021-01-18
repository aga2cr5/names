import * as namesService from "../../services/namesService.js";

//creates data object
let data = {
  name: '',
  errors: {}
};

//show the index page with names in default order
const showNamesDefault = async({render}) => {
  render('index.ejs', { data: data, names: await namesService.getNames(), totalAmount: await namesService.getAmountOfNames() });
}

//shows the index page with names in popularity order
const showNamesPopularity = async({render}) => {
  render('index.ejs', { data: data, names: await namesService.getNamesOrderByAmount(), totalAmount: await namesService.getAmountOfNames() });
}

//shows the index oage with names in alphabetical order
const showNamesAlphabetical= async({render}) => {
  render('index.ejs', { data: data, names: await namesService.getNamesOrderByName(), totalAmount: await namesService.getAmountOfNames() });
}

//show the amount of given person in a different page
const showAmountOfName = async({render, request}) => {
  const result = await namesService.getAmountOfName(request);
  if (result.length === 0) {
    const message = "No such person";
    return render('person.ejs', { info: message });
  }
  if (result.errors) {
    data = result;
    render('index.ejs', { data: data, names: await namesService.getNames(), totalAmount: await namesService.getAmountOfNames() });
  } else {
    render('person.ejs', { info: result.amount });
  }
}


export { showNamesDefault, showNamesPopularity, showNamesAlphabetical, showAmountOfName };