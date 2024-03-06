You have to configure the `contentful space` with the cli api key and the space id.

You have to configure:

- contentTypeName: the name of the content type
- from: the name of the field that you want to take the html content from
- to: the new name of the field to place the rich text

Then you can run the following command `contentful space migration -e master post.js` where master is the environment of the space and post.js is the migration file.
