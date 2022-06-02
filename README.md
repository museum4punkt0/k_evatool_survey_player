# k:evatool survey player

## Project setup

Please copy the file .env_example to .env and adjust the parameters:
- VITE_API_BASE_URL: Set the base URL of the k:evatool backend (i.e. http://localhost:8085/api for local development)
- ELECTRON_FULLSCREEN: Configure if the electron build runs in fullscreen mode or as a floating window

### Important note
Please make sure that the Laravel Backend is running. Otherwise backend connection and saving answers won't be possible.

### Preparation
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

### Kiosk mode
You can run the player in kiosk mode by adding the kiosk url parameter (i.e. https://your-keva-player.com?kiosk=60). The number set the timeout in seconds 
that resets the uuid and goes back to the starting point after user inactivity.

