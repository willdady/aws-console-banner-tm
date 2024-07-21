// ==UserScript==
// @name         AWS Console Banner
// @namespace    https://github.com/willdady/aws-console-banner-tm
// @version      2024-07-21
// @description  Adds a styled banner to the top of the AWS Console to help identify the account you are in.
// @author       Will Dady
// @match        https://*.console.aws.amazon.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=amazon.com
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// @grant        none
// ==/UserScript==

// Add your account information here. The accountId must be a regex that matches
// the account number in the console. Note accountStage is used to determine the
// style of the banner, see the STYLE constant below.
const ACCOUNTS = [
  // {
  //     accountId: /999999999990/,
  //     accountName: "development",
  //     accountStage: "non-prod"
  // },
  // {
  //     accountId: /999999999991/,
  //     accountName: "production",
  //     accountStage: "prod"
  // },
];

const STYLE = `
<style data-tm="true">
  .tm-banner {
    padding: 0.35rem;
    text-align: center;
    font-size: 1.25rem;
    font-family: Amazon Ember, Helvetica Neue, Roboto, Arial, sans-serif;
  }
  .tm-banner--non-prod {
    background: rgb(101 163 13);
    color: white;
  }
  .tm-banner--prod {
    background: rgb(185 28 28);
    color: white;
  }
</style>
`;

const AWS_ACCOUNT_REGEX = /(\d{4}-\d{4}-\d{4})/;

(function () {
  "use strict";

  const insertBanner = (accountId) => {
    for (const obj of ACCOUNTS) {
      if (!accountId.match(obj.accountId)) continue;
      $("head").append(STYLE);
      $("#consoleNavHeader").prepend(
        `<div class="tm-banner tm-banner--${obj.accountStage}">${obj.accountName}</div>`
      );
      break;
    }
  };

  const extractAccountId = ($node) => {
    const text = $node.text();
    const match = text.match(AWS_ACCOUNT_REGEX);
    if (match) {
      return match[1].replace(/-/g, "");
    }
    return null;
  };

  const handleMutations = (records, observer) => {
    for (const record of records) {
      const $addedNodes = $(record.addedNodes);
      const $menuNode = $addedNodes.find("#menu--account");
      if (!$menuNode.length) return;
      const accountId = extractAccountId($menuNode);
      if (!accountId) return;
      insertBanner(accountId);
      observer.disconnect();
      return;
    }
  };

  const observer = new MutationObserver(handleMutations);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
})();
