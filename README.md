# Theme Generator Application Using OpenAI

[Live Site](https://theme-generator.fly.dev/)

## Contact Info:

* [Github](https://github.com/foleyb25) 
* [Linkedin](https://www.linkedin.com/in/brian-foley-456624196/)

### Note

If you see any discrepencies in this document please reach out to me. discrepencies include inaccurate information, bad formatting, etc. Also Grammar Nazis are welcome, just don't go full Kanye. 

## Overview

Welcome to the Theme Generator application. This application is built to show a use case for the npm package, theme-builder. Please reference the [theme-builder documentation]() for more info.

This project includes a VueJs frontend project and a node/express backend. The output build directory for the frontend is set inside the backend directory "/backend/dist". These build files are served once a user visits the home "/" route. Additional API endpoints are configured on the express server including retrieving the current them as well as generating a new one. 

## Getting Started

1. Install [Nodejs](https://nodejs.org/en/download/)

2. clone this repository

```git clone git@github.com:foleyb25/theme-generator.git```

3. cd into the directory 

```cd theme-generator```

and install the dependencies

frontend:
```cd frontend ```
```npm install ```

backend:
```cd backend (or if you are in the frontend directory run cd ../backend)```
```npm install```

4. go to the [OpenAI developer site](https://beta.openai.com/overview) and create an account. Once your account is made, click on on your account profile in the top right and select "View API Keys".

5. Create a new API KEY by selecting "Create New Secret Key". You will need this value for your .env file

6. Open up theme-generator in your favorite IDE

7. Inside the backend directory, Create a .env file and put in the following values


```OPENAI_API_KEY=<YOUR_API_KEY_HERE>```
```PORT=<PORT_OF_YOUR_CHOOSING>```

I like to set my port to 8080 since this is the default when a fly.io's fly.toml gets generated. But this can be easily configured.

8. Check your proxy port inside of vite.config.js. Make sure the target reads "http://localhost:<PORT_OF_YOUR_CHOOSING>" or the API calls won't work in development. This is not an issue in production since the Vuejs build is served from the backend host. For development, you'll need to specify this proxy.

9. Open up two terminals and start the frontend and backend servers

in the backend directory:
```npm run start:dev```

The backend should be running on the server port of your choosing.

in the front end directory:
```npm run start:dev```

The frontend should be running on the default port of 5173.

10. Visit your vueJS application in your browser by typing in the url, "localhost:5173" or what ever port your frontend is running on.

## State Management

I'm using Pinia state manager to store the data pertaining to the theme. This data is obtained in an axios call upon initial navigation to the site. The vue router is equipped with middleware to check to see if the theme state is present. If it is there, the user proceeds to the next route. If it is not there, an Axios call is made. This check improves application perfomance since it deosn't need to reach out to the server on every route change.

## Future Implementations

### Cron Job 

Instead of selecting a button to generate themes and using up tokens, I would like to just implement a Cron job that does this weekly.

## Limitations

### Slow Photo Rendering

Images generated are around 3.1 MB and they are pulled from an OpenAI server or a 3rd party server that OpenAI utiizes. Either way, image rendering can be very slow.

To fix this, the image could be downloaded and saved in a file server (preffered), or in your backend directory (just make sure to remove the old image or your project directory will get hefty). Once downloaded run the image through [image compression library](https://www.npmjs.com/package/imagemin) and save it.

Please reach out to me for more info on this if you are curious. My email can be found on my [Github](https://github.com/foleyb25) or you can find me on [Linkedin](https://www.linkedin.com/in/brian-foley-456624196/)

### Authorization error trying to load images after some time

It looks as though openAI either puts a time limit on how long you can pull an image from the server, or the server only accepts originating hosts (The host that requested for the image to be created.)

Either way, the local file store will solve this issue.

### Issues applying styles to tailwind

Trying to add theme color in the "hover:theme-color" directive doesn't work. Binding the class attribute and appending the string may work but this increases code complexity and readabiliity becomes difficult.

As a rule of thumb - use Tailwind for the layout and use custom css classes for the theme data. You can define these in app.vue and omit the style "scope" specifier if present.

## Additional Resources

* [openAI Github](https://github.com/openai/openai-node)

## Q & A

### Q: Can I use the theme-generator package in my VueJS project and not have to implement a backend service?

No, or at least not that I'm aware of. The openAI npm package uses CommonJS. Additionally, lll (Javascript) code examples on openAI specify NodeJS.

## Closing Remarks

Again, if you see any discrepencies reach out!
