#Names

For database user postgresql and run the following: DROP TABLE IF EXISTS names;

CREATE TABLE names (
id SERIAL PRIMARY KEY,
name TEXT NOT NULL,
amount INT NOT NULL);