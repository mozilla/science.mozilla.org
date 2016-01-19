Mozilla Science
===============

Making research collaborative, accessible, and usable.

The Mozilla Science Lab, an initiative of the Mozilla Foundation, works to make research collaborative, accessible, and usable. We do this by:

* Empowering the next generation of leaders through fellowships and mentorship;
* Facilitating project-based learning around open data and open source;
* And supporting and advocating for a growing community of researchers working openly.

##Report a Problem
Find a problem with any of Mozilla Science's websites?  Open a new issue in the Issue Tracker on the right, and we'll jump on it as soon as we can!


### Getting Started

#### Project Setup

1. Clone the site and enter the directory: `git clone https://github.com/mozillascience/site && cd site`
2. Install the Mozilla Science website's Node dependencies: `npm install`
3. Copy the configuration template to its expected location: `cp env.dist .env`
4. Open .env in your favourite text editor and ensure that your PORT, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET and GITHUB_TOKEN environment variables are set to the correct values. PORT can be any available port.
4. Run `npm start`, and open up `http://localhost:5000/` in your favourite web browser!