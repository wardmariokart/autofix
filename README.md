# Aikido autofix exercise

## Quick start
```bash
npm run intall
npm run build
npm start
```

```bash
# some prepared examples
$ npm start -- -s resources/bad.php
$ npm start -- -s invalid
$ npm start -- -s resources/empty.php
$ npm start -- -s resources/utf9.bin
$ npm start -- -s resources/novuln.php
```

## configuration
### Claude api key
Provide the claude api key through one of these methods:
1. CLI `--api-key`. Example: `npm start -- -s path/to/file.php --api-key {key here}`
2. Set `CLAUDE_API_KEY` environment variable in `.env`.

### Claude model
Set `CLAUDE_MODEL` environment variable in `.env`. See https://docs.anthropic.com/en/docs/about-claude/models/all-models#model-names for options. 
- `claude-3-opus-latest`
- `claude-3-7-sonnet-latest`
- `claude-3-5-haiku-latest`


## Payload
payload: `ns_dig=;echo hello world;,`
```
$ php -S localhost:8000
$ curl "http://localhost:8000/resources/bad.php?ns_dig=;echo%20hello%20world;,"
```