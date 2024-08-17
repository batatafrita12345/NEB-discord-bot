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

Now you need to configure the enviroment, just rename the file `.env.example` to `.env` and insert the requested values.
note: in `BASE64_CREDENTIALS` you need to get all the JSON credential from the google service credential, and turn to base64

then run:

```bash
node index.js
```

## License

[MIT](https://github.com/GuriZenit/Slash/blob/main/LICENSE)
