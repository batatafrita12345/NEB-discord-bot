# NEB Logging Bot

## Credits

GuriZenit -> orignal bot template
batatafrita12345

## Requirements

- nodejs `V17.6.x`
- discord.js `V14.7.1`
- dotenv `V16.0.3V`
- googleapis `V140.0.1`
- @googleapis/sheets `V9.0.0`
- @google-cloud/local-auth `V3.0.1`

## Usage

First of all let's install the dependencies, use:

```bash
npm install
```

Now you need to add your `BOT_ID` and your `GUILD_ID` on the file `src/Configs/config.js`, and for your token create a `.env` file, or change `process.env.TOKEN` by your token in `config.js`, you must get your google service account credentials, then convert the json to a base64 format, and put in the `.env` file, or change the `process.env.BASE64_CREDENTIALS`, also you must set the `SPREADSHEET_ID` in the `.env` file.

then run:

```bash
node index.js
```

## License

[MIT](https://github.com/GuriZenit/Slash/blob/main/LICENSE)
