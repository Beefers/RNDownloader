# RNDownloader

A download tool for Discord's React Native alpha.

## Prerequisites

* NodeJS
* Git
* `npm` or `pnpm` or `yarn` (or any other node package manager)

## Example usage

```sh
pnpm i
```

To download DiscordRN version 128.0 with the English locale, for arm64_v8a in hdpi:

```sh
node . 128200 --locales en --arches arm64_v8a --dpis hdpi
```

This should make a directory named `downloads`, your APKs will be in there.

## To-Do

* Proper 404 and other error handling - currently downloads HTML
* Comment code
* Automatic installation (?)
