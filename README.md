# AWS Console Banner

A simple [Tampermonkey][tm] script which adds a banner to the AWS console to help identify the current account you are signed in to.
This is useful when switching between multiple accounts as it helps avoid making changes to the wrong account.

![non-prod banner](images/non-prod.png)

![prod banner](images/prod.png)

## Installation

1. Install the [Tampermonkey][tm] extension in your browser.
2. Create a new script and copy-paste the contents of [aws-console-banner.user.js](./aws-console-banner.user.js) into it.
3. Edit the script with your AWS accounts (see below).
4. Save the script.

### Configuration

You must edit the `ACCOUNTS` constant to contain a list of your AWS accounts.

Each object MUST contain `accountId`, `accountName` and `accountStage`. 
Note, `accountId` is a regular expression *not* a string.
`accountStage` maps to a CSS class defined in the `STYLE` constant.

```javascript
  const ACCOUNTS = [
    {
      accountId: /999999999991/,
      accountName: "Acme Inc - Development",
      accountStage: "non-prod"
    },
    {
      accountId: /999999999992/,
      accountName: "Acme Inc - Staging",
      accountStage: "non-prod"
    },
    {
      accountId: /999999999993/,
      accountName: "Acme Inc - Production",
      accountStage: "prod"
    },
  ];
```

[tm]: https://www.tampermonkey.net/