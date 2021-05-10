# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

## Setup

This presumes you've already installed postgres on your local machine and have access to that environment. If you have not, feel free to find instructions here:

- [Windows]
- [Mac]
- [Linux]

First create the database

```
createdb lob
```

then connect to the database

```
psql
```

then create the associated user that should allow you to connect:

```
CREATE role lob_app WITH LOGIN ENCRYPTED PASSWORD 'lob';
```

then create a user with the associated

1. Create a new postgres database (version 13) named lob.
2. Run `npm install`
3. Run `npm run migrate` to create the database.
4. Run `npm run seed` to seed the examples into the database
5. Run `npm start` to start the server.

## LOB

## Some Notes

Given the constraints of the challenge (doing this quickly for an interview) I decided to default to quick implementations like TypeORM, Factories, and TSOA to quickly spin up the associated environment. I also didn't implement anything that would be expected to be added in an existing system like Authentication or Environment Variable management. I presumed these would already exist in the API where I was making the changes or would have been an explicit part of the requirements otherwise.

Some of this might look like it was taken from set-up docs related to TSOA. They are. If I were to start an express project from scratch today I'd use TSOA and TypeORM as my baseline, so I went forward with that. Given the simplicity of the set-up this will look pretty similar to the defaults

## Future Directions for Development

Given the constraints of the time I decided not to focus much on things like performance, but other directions to grow include:

- Adding elastic search so search results return quicker
- Set up environment variables instead of hardcoding things around.
