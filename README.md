# k:evatool survey player

## Project setup

Please copy the file .env_example to .env and adjust the parameters:
- VITE_API_BASE_URL: Set the base URL of the k:evatool backend
- ELECTRON_FULLSCREEN: Configure if the electron build runs in fullscreen mode or as a floating window

The following needs to be run for production and development prior to building and running the dev environment
```
yarn
```

### Compiles and hot-reloads for development
```
yarn dev
```

### Compiles and serves statically
Like on a webserver. Ideal for testing builds locally.
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint (--fix)
```

### Electron build for windows or mac
Builds a standalone installable app for either windows or mac
```
yarn electron:win
yarn electron:mac
```

