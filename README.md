# Wordpress as a headless CMS with Gatsby

This is meant to be used as a simple starter project if you want to use Wordpress as a headless CMS and make the front end with Gatsby.js. It uses the new Gatsby plugin `gatsby-source-wordpress-experimental` on the Gatsby side (this is what eventually will become `gatsby-source-wordpress@v4` and the official recommended way of using Wordpress with Gatsby.). The Gatsby plugin depends on two Wordpress plugins: [WPGraphQL](https://github.com/wp-graphql/wp-graphql) and [WPGatsby](https://github.com/gatsbyjs/wp-gatsby).

The main project is in the folder `wp-gatsby-testsite`. I have also included another folder, `wp-docker`, that contains a .yml file for setting up a Docker container with Wordpress and a MySQL database. To use this, just install [Docker Desktop](https://docs.docker.com/compose/install/) and then run the following command (in the wp-docker folder): `docker-compose up -d`.

**[Demo site >>](https://wp-gatsby-starter.netlify.app/)**

## How to use wordpress-gatsby-starter

If you haven't done that already, install the Gatsby CLI on your computer:

    npm install -g gatsby-cli

Then you can either clone this Github repository the normal way, or push the "Use this template" to create a new repository with the same folders and files in your own Github account. Or just download the zip file.

When you have cloned or copied all the files to your computer, go to the `wp-gatsby-testsite` folder and type

    npm install

All the dependencies in the `package.json` file of the project should now be installed. But before you can run the Gatsby site, you have to connect it to your Wordpress site.

Open the admin page of your Wordpress instance and install the plugins that are necessary for fetching data from Wordpress through GraphQL. If you have used my Docker Compose file (.yml) mentioned above, Wordpress should be up and running on port 8080. Then you can do this to access the Wordpress admin panel:

    localhost:8080/wp-admin

Go to plugins and install [WPGraphQL](https://github.com/wp-graphql/wp-graphql) and [WPGatsby](https://github.com/gatsbyjs/wp-gatsby) (you have to download them as zip files and upload them to Wordpress, then activate them.)

Then you need to rename `.env.example` to `.env.development` or `.env.production` depending on your current environment and update the correct path in `GATSBY_GRAPHQL_URL` to the GraphQL endpoint on your Wordpress site. If you're running my local Docker instance of Wordpress on port 8080, you only need to rename the `.env` file.

Now it's time to test if everything works. When in the `wp-gatsby-testsite` folder, type:

    gatsby develop

to start a development build of the Gatsby site. The last 6 posts from Wordpress will be shown on the front page, and Gatsby will also create unique pages for each of the posts. This is set up in the `gatsby-node.js` file, using Gatsby's createPage function and the post template at `/templates/post.js`

In addition to the posts, the Wordpress pages are also retrieved and Gatsby pages are created for each of them. In this simple starter, the Wordpress pages are only used for creating the navbar at the top of the page. Each element in the navbar refers to one of the pages created in Wordpress.

## Customization / more information

I have tried to keep this starter as simple as possible, so it should be quite easy to get started experimenting with it on your local machine. For more advanced sites you should probably add functionality for navigation between posts, sorting the posts by category, etc.

You can learn more about the `gatsby-source-wordpress@v4` (experimental) here: https://github.com/gatsbyjs/gatsby-source-wordpress-experimental/#readme

Or read this [blogpost](https://www.gatsbyjs.org/blog/2020-07-07-wordpress-source-beta/) about the announcement of the new source plugin for Wordpress.
