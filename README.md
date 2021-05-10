# Address Search

The goal of this project is to create a demo environment for CRUD and "fuzzy" search on addresses with TypeORM and TSOA.

## Setup

This presumes you've already installed postgres on your local machine and have access to that environment and also have the latest versions of node and npm

1. Create a new postgres database (version 13) named `address_app`.

```
// Create the database
createdb address_search
// Connect
psql
// Create the user
CREATE role address WITH LOGIN ENCRYPTED PASSWORD 'address';
```

2. Run `npm install`
3. Run `npm run migrate` to create the database.
4. Run `npm run seed` to seed the examples into the database
5. Run `npm run build` to compile Typescript and generate the TSOA routes.
6. Run `npm start` to start the server.

## Some Notes

Given how quickly I tried to spin this up I defaulted to quick implementations like TypeORM, Factories, and TSOA. I also didn't implement anything that would be expected to be added in an existing system like Authentication or Environment Variable management. I presumed these would already exist in a theoretical API.

Some of this might look like it was taken from set-up docs related to TSOA. They are. If I were to start an express project from scratch today I'd use TSOA and TypeORM as my baseline, so I went forward with that. Given the simplicity of the set-up this will look pretty similar to the defaults

## Future Directions for Development

- Adding elastic search so search results return quicker (a bunch of ors and likes isn't great for large performance)
- Set up environment variables instead of hardcoding things around.
- Add functional tests
