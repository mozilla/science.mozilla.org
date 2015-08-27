Mozilla Science
===============

Helping researchers leverage the open web.

The Mozilla Science Lab, an initiative of the Mozilla Foundation, helps researchers leverage the open web. We facilitate learning around open source and data sharing, as well as offer fellowships that empower researchers to lead in their communities.

##Report a Problem
Find a problem with any of Mozilla Science's websites?  Open a new issue in the Issue Tracker on the right, and we'll jump on it as soon as we can!


### Getting Started

#### Project Setup

1. Clone the site and enter the directory: `git clone https://github.com/mozillascience/site && cd site`
2. Install the Mozilla Science website's Node dependencies: `npm install`
3. Copy the configuration template to its expected location: `cp env.dist .env`
4. Open .env in your favourite text editor and ensure that your PORT, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET and GITHUB_TOKEN environment variables are set to the correct values. PORT can be any available port.
4. Run `npm start`, and open up `http://localhost:5000/` in your favourite web browser!