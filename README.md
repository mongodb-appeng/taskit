# TaskIt: A MongoDB GraphQL Tutorial

## Description

MongoDB Stitch now provides GraphQL APIs to access your data. This tutorial walks through a simple TODO application in which users can create, read, update, and delete tasks using GraphQL.

## The Software Stack

- Backend
  - [MongoDB Atlas](https://cloud.mongodb.com/) (Database as a Service)
  - [MongoDB Stitch](https://www.mongodb.com/cloud/stitch) (Serverless platform)
- Frontend
  - [React](https://reactjs.org/docs/getting-started.html) (JavaScript framework)

## Getting Started

Before the React application can be run, MongoDB Atlas and Stitch __must__ be configured.

### MongoDB Atlas Setup

A MongoDB Atlas cluster is needed for the application (skip this section if you already have one which can be used.). Follow this [tutorial](https://docs.atlas.mongodb.com/getting-started/#deploy-a-free-tier-cluster) to create an Atlas cluster.

For this tutorial an "M0", our free-forever instance, is suffient.

### Stitch Setup

From the Atlas UI lets create a stitch app, follow the instructions found [here](https://docs.mongodb.com/stitch/procedures/create-stitch-app/).

Take note of the application id (APP ID), this will be required later for application configuration.

**NOTE**: during this configuration process, we can wait till the end to review and deploy all  changes, but I would recommend deploying as each step is performed. Alternatively, turn off "Drafts" under the "Deploy/Configuration" Stitch tab.

#### Link Database Cluster

While creating the Stitch application be sure to link to the cluster created above. If using an existing Stitch application, the database cluster must be linked to that app, following [these instructions](https://docs.mongodb.com/stitch/mongodb/link-a-cluster/).

#### Enable Authentication

The frontend application requires anonymous authentication, set this provider up using the instructions found [here](https://docs.mongodb.com/stitch/authentication/anonymous/)

This allows our application to create a user object containing an auth token to be used by GraphQL to create, modify, and read data. This is the minimal level of authentication to work with Stitch – a production application would use a more robust method such as username/password, JSON Web Tokens, or 3rd-party authentication providers such as Google, Facebook or Apple.

#### Create Data Access Rules

For users to access data held in Atlas, a Stitch Rule must be added for the collection that will hold the data. For this tutorial, use the simple template where an authenticated user can read and write just their own data only by following [these instructions](https://docs.mongodb.com/stitch/mongodb/define-roles-and-permissions/).

Select the `demo` database and the `tasks` collections, the rule will be applied to this collection only.

The template to use is `Users can only read and write their own data`, for the "field name for the user id" section enter `owner_id`.

#### Create JSON Schema 

Next, we will need to create a schema for our collection, that is used in the GraphQL API.

Since we don't have any documents in our collection we cannot use a sample to generate the schema, or validate the existing schema against existing data.

Use [these instructions](https://docs.mongodb.com/stitch/mongodb/enforce-a-document-schema/) to define the schema:

```json
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

**NOTE**: Not all the fields are currently being used.

Please remember to review and deploy the changes to take effect.

At this point, the Stitch application is providing the GraphQL API,

#### Testing The GraphQL Interface

From the Stitch UI, go to the `GraphQL` menu (found on the left hand side), this will bring up the GraphQL editor and documentation explorer.

Using the documentation and the UI various queries can be tested here. Because we are entering queries in the Admin UI, the `owner_id` attribute is not needed.

Take a note of the GraphQL endpoint listed on that screen.

#### (Optional) Setup Hosting

This is optional but if you want to host your react application on the Stitch Platform, see [enable static hosting](https://docs.mongodb.com/stitch/hosting/enable-hosting/) for the frontend web assets.

This will create a secure URL that can be used to access the react web application.

**NOTE**: Please note that because this application uses anonymous authentication, we __strongly__ recommend to not host this application for too long as anyone with the URL can access the application and login anonymously to create data on your system.

## Setup React Application

It is assumed your development environment is setup to run [Node.js](https://nodejs.org/en/).

Clone this repo, copy the `env.local` file to `.env.local`, and add the stitch app id and GraphQL endpoint to the environment variables.

If these variables change at any point, you will need to restart the application for the changes to take effect.

Run `yarn install` to install the required node modules.

### Run locally to test

Run `yarn start`, this will start the development server and open a browser tab running the applcation.

It is recommended to install the React development tools for the browser and open the development console to help troubleshoot any issues.

Any GraphQL issues will be logged as errors to the development console.
 
### Compile React App

Once the application has been tested and you want to create a build, run  `yarn build` to create a build directory, the contents of this directory will need to be uploaded to Stitch hosting (or your choice of web host).

### (Optional) Upload React Application

Follow the instruction found [here](https://docs.mongodb.com/stitch/hosting/upload-content-to-stitch/) to updload the React application to stitch.  Once the files have been deployed, the application is available at the URL shown on the Stitch hosting page.

## Deployment Notes

### Authentication

As this tutorial is solely focused on GraphQL, anonymous authentication has been used to reduce friction.

### Hosting

Don't host for too long if your concerned about others writing tasks to your `tasks` collection.

## Optional Features to Add

1. Use 3rd party authentication
1. Add archive and finish buttons
1. Create a filter to show archived and finished tasks
1. Introduce a recurring task
1. Create alerts for tasks that are coming due
1. Create a search bar to filter tasks
1. Cupport custom images for tasks

## Getting involved

If you have any issues with the setup or find any bugs please open an issue and we will address them as soon as possible.

We also pull requests, if you feel like adding features or fixing bugs you find, issue a pull request and we will review it and work with you to get it merged.

## References

- [GraphQL](https://graphql.org/)
- [GraphQL Foundation](https://foundation.graphql.org/)
- [Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Stitch Documentation](https://docs.mongodb.com/stitch/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Bootstrap](https://getbootstrap.com/docs/4.0/getting-started/introduction/)
