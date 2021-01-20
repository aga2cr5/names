import { executeQuery } from "../database/database.js";
import { validate, required, lengthBetween } from "../deps.js";


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

//creates data object for getData function
let data = {
    name: '',
    errors: {}
};

//gets data from the post request
const getData = async(request) => {
    if (request) {
        const body = request.body();
        const params = await body.value;
        let name = params.get('name');
        if (!(name.charAt(0) === name.charAt(0).toUpperCase())) {
            name = name.charAt(0).toUpperCase() + name.slice(1);
            data.name = name;
        } else {
            data.name = name;
        }
    }
    return data;
}

//validation rules for getAmountOfName funtion input
const validationRules = {
    name: [required, lengthBetween(3, 20)]
};
    
//gets amount of given name from database
const getAmountOfName = async(request) => {
    let data_obj = await getData(request);
    const [passes, errors] = await validate(data_obj, validationRules);
    if (!passes) {
        data_obj.errors = errors;
        return data_obj;
    }
    const result = await executeQuery("SELECT * FROM names WHERE name = $1;", data_obj.name);
    if (result.rowsOfObjects()[0] === undefined) {
        return [];
    }
    return result.rowsOfObjects()[0];
}


export { getNames, getNamesOrderByAmount, getNamesOrderByName, getAmountOfNames, getAmountOfName };