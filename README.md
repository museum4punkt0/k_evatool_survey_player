# k:evatool survey player

The survey player is part of the k:evatool and holds the user frontend needed to display a survey or single question. The player connects to the k:evatool backend through the RESTful API using a maximum of three endpoints to get the survey and post the result data and if applicable the audio file data of a voice recording.

### Funding
This project is part of the project museum4punkt0 - Digital Strategies for the Museum of the Future, sub-project k:eva. Further information: https://www.museum4punkt0.de.

The project museum4punkt0 is funded by the Federal Government Commissioner for Culture and the Media in accordance with a resolution issued by the German Bundestag (Parliament of the Federal Republic of Germany).

![BKM-Logo](https://github.com/museum4punkt0/Object-by-Object/blob/77bba25aa5a7f9948d4fd6f0b59f5bfb56ae89e2/04%20Logos/BKM_Fz_2017_Web_de.gif)
![NeustartKultur](https://github.com/museum4punkt0/Object-by-Object/blob/22f4e86d4d213c87afdba45454bf62f4253cada1/04%20Logos/BKM_Neustart_Kultur_Wortmarke_pos_RGB_RZ_web.jpg)

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

### License
GNU GENERAL PUBLIC LICENSE <br>
Copyright © 2022, 2av GmbH <br>
Please also see the LICENSE file provided within this repository

