const richTextFromMarkdown =
  require("@contentful/rich-text-from-markdown").richTextFromMarkdown;
const _ = require("lodash");
var TurndownService = require("turndown");

var turndownService = new TurndownService();

const contentTypeName = "rich";
const from = "text";
const to = "rich";

module.exports = function (migration) {
  migration.transformEntries({
    contentType: contentTypeName,
    from: [from],
    to: [to],
    transformEntryForLocale: async function (fromFields, currentLocale) {
      const markdown = turndownService.turndown(
        fromFields[from][currentLocale]
      );

      const document = await richTextFromMarkdown(markdown, (payload) => {
        console.log("invoking payload", { payload });
        return {
          nodeType: "embedded-asset-block",
          content: [],
          data: {
            target: {
              sys: {
                type: "Link",
                linkType: "Asset",
                id: payload.url.split("/")[4],
              },
            },
          },
        };
      });

      console.log({ markdown, document: document.content });

      return {
        [to]: document,
      };
    },
  });
};
