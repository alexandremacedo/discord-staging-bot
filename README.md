<h1 align="center">
  <img alt="user-api" title="user-api" src=".github/upload-cloud.png" width="100px" />
</h1>

<h3 align="center">
  Discord staging usage bot - Bot to manage the development environment usage
</h3>

<h4 align="center">
  NodeJS + DiscordJS + Typescript
</h4>
</br>


<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/AlexandreMacedo/discord-staging-bot?color=%2304D361">

  <a href="https://github.com/alexandremacedo">
    <img alt="Made by Alexandre" src="https://img.shields.io/badge/made%20by-Alexandre-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/alexandremacedo/user/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/alexandremacedo/discord-staging-bot?style=social">
  </a>
</p>

<p align="center">
  <a href="#needed">Needed</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#how-to-use">How to use</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#commands">Commands</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#license">License</a>
</p>


# discord-staging-bot
This project was built with NodeJS, DiscordJS and Typescript to manage development environment usage status

## Needed

- Git (https://git-scm.com/)
- Yarn (https://yarnpkg.com/lang/en/)
- Node (https://nodejs.org/en/)

## How to use
To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js][nodejs] + [Yarn][yarn] installed on your computer. From your command line:

Cloning
```bash
# Clone this repository
$ git clone https://github.com/alexandremacedo/discord-staging-bot.git

# Go into the repository
$ cd discord-staging-bot
```

To run in dev mode
```bash
# Install all dependencies
$ yarn

# Start the dev server
$ yarn dev

# Bot is up
# You should create a bot in discord for developers - (https://discord.com/developers/applications)
# Put the discord bot token on ENV file.
```

## Commands
Commands start with **.staging**:

Command | Service | Description | Example
--- | --- | --- | ---
help                         | \src\useCases\Staging\Help        | Displays a list of available commands      | .staging help
status                       | \src\useCases\Staging\Status      | Displays the status of all projects        | .staging status
status {project}             | \src\useCases\Staging\Status      | Displays the status of the desired project | .staging status project
use {project}                | \src\useCases\Staging\Use         | Indicates the use of the desired project   | .staging use project
use {project1} {projectN}    | \src\useCases\Staging\Use         | Indicates the use of multiple projects     | .staging use project1 projectN
use {project}                | \src\useCases\Staging\Unuse       | Unuse the desired project                  | .staging unuse project
use {project1} {projectN}    | \src\useCases\Staging\Unuse       | Unuse multiple projects                    | .staging unuse project1 projectN

# License
The discord-staging-bot is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
