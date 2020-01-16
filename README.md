# TaskIt: A MongoDB GraphQL Tutorial

## Description
MongoDB Stitch has introduced GraphQL, this tutorial will walk through a simple todo
application in which users can create, read, update, and delete tasks using GraphQL

## Getting Started
Before the application can be configured to run, MongoDB Atlas and Stitch will have
to be setup.

### Atlas Setup
The first thing we need to do is to create an atlas cluster, if this is your first 
time setting up atlas, please follow the instructions found in this [tutorial](https://docs.atlas.mongodb.com/getting-started/#deploy-a-free-tier-cluster)

For this tutorial an "M0", our free forever instance, will be suffient.

#### Create Collection
Next lets create our database and collection that will be used for the application, to
create the database and collection follow the instructions found [here](https://docs.atlas.mongodb.com/tutorial/insert-data-into-your-cluster/).

Create a database named `demo` and a collection named `tasks`, this will be required for
the queries found int [graphql.js](./src/stitch/graphql.js) as the schema names are hardcoded.

Once this is done lets create a Stitch App, which will provide our GraphQL endpoint and also
host our application.

### Stitch Setup
From our Atlas UI lets create a stitch app, follow the instructions found [here](https://docs.mongodb.com/stitch/procedures/create-stitch-app/)

Take note of the application id (APP ID) that is created, copy this to a temp file as we will
need this later in our application configuration.

**NOTE**: during this configuration process, we can wait till the end to review and deploy all 
changes, but I would recommend deploying as each step is done this will ensure that we don't
have to redo steps if our browser crashes or anything like that.

#### Link Cluster
While creating the application be sure to link to the cluster we created above. If we already
have a stitch application setup that we want to use, the cluster created above must be linked
to the application, to do so follow the instructions found [here](https://docs.mongodb.com/stitch/mongodb/link-a-cluster/).

#### Create User Provider
Now that our cluster is created, for our application we will require anonymous authentication,
set this provider up using the instructions found [here](https://docs.mongodb.com/stitch/authentication/anonymous/)

This will allow our application to create a user object which will contain an auth token which will
be used by graphql to create and read data. This is the minimal authentication that will be required.

#### Create Rules
Now we have to create rules on how our application users can read and write data, for this
tutorial we will create a simple template where an authenticated user can read and write their
own data only. Follow the instructions found [here](https://docs.mongodb.com/stitch/mongodb/define-roles-and-permissions/)
to setup our rules.

Select the `demo` database and the `tasks` collections, the rules will will be applied to this
collection only.

The template to use is `Users can only read and write their own data`, for
the field name to use for the user id enter `owner_id`.

#### Create Schema 
Next we will need to create a schema for our collection, this will be required to allow the 
GraphQL endpoint to generate a schema that can be used.

Since we don't have any documents in our collection we cannot use a sample to generate the schema.
The schema below will be used with the instructions found [here](https://docs.mongodb.com/stitch/mongodb/enforce-a-document-schema/)

```
{
  "properties": {
    "_id": {
      "bsonType": "objectId"
    },
    "name": {
      "bsonType": "string"
    },
    "description": {
      "bsonType": "string"
    },
    "tags": {
      "bsonType": "array",
      "uniqueItems": true,
      "items": {
        "bsonType": "string"
      }
    },
    "owner_id": {
      "bsonType": "string"
    },
    "createdAt": {
      "bsonType": "date"
    },
    "active": {
      "bsonType": "boolean"
    },
    "modifiedAt": {
      "bsonType": "date"
    },
    "archived": {
      "bsonType": "boolean"
    },
    "archivedAt": {
      "bsonType": "date"
    },
    "finished": {
      "bsonType": "boolean"
    },
    "finishedAt": {
      "bsonType": "date"
    },
    "dueBy": {
      "bsonType": "date"
    },
    "recurringTask": {
      "bsonType": "boolean"
    },
    "recurringDate": {
      "bsonType": "date"
    }
  }
}
```

**NOTE**: we are currently not using all the fields, but we will be using these fields
in future tutorials.

Once this is done, that is it our stitch application can now use GraphQL.

Please remember to review and deploy the changes to take effect.

#### GraphQL setup
From the Stitch UI, go to the `Web Access` menu (found on the left hand side).

Select the graphql option in the main window, this will bring up the GraphiQL editor
and documentation explorer, if there are any schema errors they will be shown here.

Using the documentation and the UI various queries can be executed here, because we 
are entering queries in the admin UI, the owner_id will not be needed.

The main window will also contain the GraphQL endpoint that our application will use, copy
this endpoint into a temporary file as we will need this later.

#### Setup Hosting
This is optional but if we want to host our application on the Stitch Platform, we need
to configure the application to support hosting using the instructions found [here](https://docs.mongodb.com/stitch/hosting/enable-hosting/)

This will create a secure URL that can be used to access the application.

**NOTE**: please note that because this application use anonymous authentication we strongly
recommend to not host this application for too long as anyone with the URL can access the 
application and login anonymously and create data on your system.

Now we are ready to setup the react application.

## Setup Application
It is assumed your development environment is setup to run node.

Clone this repo locally, copy the env.local file to .env.local, remove the comments found 
in the file and add your stitch app and graphql endpoint to the environment variables found 
here.

If these variables change at any point, you will need to restart the application for the changes
to take effect.

Next run `yarn install` to install the required node modules.

The application is ready to test.

### Run locally to test
Now run `yarn start` this will start the development server and start a browser tab and
open the applcation.

It is recommended to install the react development tools for the browser and open the 
development console to help troubleshoot any issues.

Any graphql issues will be logged as errors to the development console.
 
### Compile React App
Once the application has been tested and you want to create a build, run the command
`yarn build` this will create a build directory, the contents of this directory will
need to be updated to Stitch.

### Upload React Application
Follow the instruction found [here](https://docs.mongodb.com/stitch/hosting/upload-content-to-stitch/)
to updload the react application to stitch.  Once the files have been deployed we will
be able to go to the public URL that Stitch provided.

## Deployment Notes

### Authentication
As this tutorial is solely focused on GraphQL, anonymous authentication has been used to 
reduce friction.

### Hosting
Don't host for too long as anyone will be able to write data to your tasks collection

## Tasks left to do
1. Use 3rd party authentication
1. create archive and finish icons
1. create a filter to show archived and finished tasks
1. introduce a recurring task
1. create alerts for tasks that are coming due
1. create a search bar to filter tasks
1. support custom images for tasks

## Getting involved
If you have any issues with the setup or find any bugs please open an issue and we will
address it as soon as possible.

We also accept pull requests, if you feel like making changes or fixing bugs you find, 
issue a pull request and we will review it and work with you to get it merged.

## References

- [GraphQL](https://graphql.org/)
- [GraphQL Foundation](https://foundation.graphql.org/)
- [Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Stitch Documentation](https://docs.mongodb.com/stitch/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Bootstrap](https://getbootstrap.com/docs/4.0/getting-started/introduction/)