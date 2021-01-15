import { executeQuery } from "../database/database.js";
import {
    validate,
    required,
    isNumber,
    lengthBetween,
    minNumber,
    maxNumber
  } from "../deps.js";

const validationRules = {
    name: [required, lengthBetween(3, 20)],
    amount: [required, isNumber, minNumber(1), maxNumber(100)]
};

//gets names from database in normal order
const getNames = async() => {
    const result = await executeQuery("SELECT * FROM names;");
    if (!result) {
        return [];
    }
    return result.rowsOfObjects();
}

//gets names from database in order by amount (acending)
const getNamesOrderByAmount = async() => {
    const result = await executeQuery("SELECT * FROM names ORDER BY amount DESC;");
    if (!result) {
        return [];
    }
    return result.rowsOfObjects();
}

//gets names from database in order by name (acending)
const getNamesOrderByName = async() => {
    const result = await executeQuery("SELECT * FROM names ORDER BY name ASC;");
    if (!result) {
        return [];
    }
    return result.rowsOfObjects();
}

//gets amount of names from database
const getAmountOfNames = async() => {
    const result = await executeQuery("SELECT SUM (amount) AS total FROM names;");
    if (!result) {
        return [];
    }
    return result.rowsOfObjects()[0];
}

//gets amount of given name from database
const getAmountOfName = async(name) => {
    const result = await executeQuery("SELECT * FROM names WHERE name = $1;", name);
    if (!result.lenght === 0) {
        return 0;
    }
    return result.rowsOfObjects()[0];
}

//deletes given name from database
//if there are more than one people with the same name just the amount is decreased
const removeName = async(name) => {
    const result = await getAmountOfName(name);
    if (result === undefined || result <= 0) {
        return "No names to delete"
    }
    let amount = result.amount;
    if (amount === 1) {
        await executeQuery("DELETE FROM names WHERE name = $1;", name);
    } else {
        amount--;
        await executeQuery("UPDATE names SET amount = $1 WHERE name = $2;", amount, name);
    } 
}

let data = {
    name: '',
    amount: '',
    errors: {}
};

const getData = async(request) => {
    data.errors = {};
    if (request) {
        const body = request.body();
        const params = await body.value;
        data.name = params.get('name');
        data.amount = Number(params.get('amount'));
    }
    return data;
}

//adds a new entry to database with given name and amount
//if name already exists just the amount is increased
const setName = async(request) => {
    const data = await getData(request);
    const [passes, errors] = await validate(data, validationRules);
    if (passes) {
        const name = data.name;
        let amount = Number(data.amount);
        const result = await getAmountOfName(name);
        if (result === undefined || result.amount <= 0) {
            await executeQuery("INSERT INTO names (name, amount) VALUES ($1, $2);", name, amount);
        } else {
            amount = amount + Number(result.amount);
            await executeQuery("UPDATE names SET amount = $1 WHERE name = $2;", amount, name);
        }
    } else {
        data.errors = errors;
        return data;
    }
}


export { getNames, getNamesOrderByAmount, getNamesOrderByName, getAmountOfNames, getAmountOfName, removeName, setName };