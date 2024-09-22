# answer four questions
- How much time did you spend working on the solution? <br/>
I spent around 3.5-4 hours working on the solution. I began with planning and understanding the requirements, followed by research on twilio service, then the actual implementation

- What’s the part of the solution you are most proud of? <br/>
I am most proud of the successful integration with Twilio and the implementation of the two-factor authentication (2FA) code generation algorithm.

- If you had more time, what other things you would like to do? <br />
I would provide users with the option to choose their preferred method of verification—either via SMS or email—during the registration process. I would then implement the verification flow based on their selected choice.

- Do you have any feedback regarding this coding challenge? <br />
The first line of the User Story regarding registration is somewhat unclear. It mentions registering without a password, but later specifies that changing the password requires SMS verification. Providing more detailed instructions would help improve clarity.

For reset password, I considered two senarios. one is changing password after logging in and another is changing password when user forgets the current password and unable to login.

<p align="center">
    <h1 align="center">BLING Task</h1>
</p>
<p align="center">
		<em>Built with the tools and technologies:</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
	<img src="https://img.shields.io/badge/Nodemon-76D04B.svg?style=flat&logo=Nodemon&logoColor=white" alt="Nodemon">
    <img src="https://img.shields.io/badge/Express-000000.svg?style=flat&logo=Express&logoColor=white" alt="Express">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
    <img src="https://img.shields.io/badge/Twilio-F22F46.svg?style=flat&logo=Twilio&logoColor=white" alt="Twilio">
	<br>
	<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" alt="ESLint">
	<img src="https://img.shields.io/badge/MongoDB-47A248.svg?style=flat&logo=MongoDB&logoColor=white" alt="MongoDB">
	<img src="https://img.shields.io/badge/tsnode-3178C6.svg?style=flat&logo=ts-node&logoColor=white" alt="tsnode">
</p>

<br>

#####  Table of Contents

> - [📍 Overview](#📍-overview)
> - [📂 Repository Structure](#📂-repository-structure)
> - [🚀 Getting Started](#🚀-getting-started)
>   - [🛠 Prerequisites](#🛠-prerequisites)
>   - [⚙️ Installation](#⚙️-installation)
>   - [🤖 Running ](#🤖-running)


---

## 📍 Overview
This project was created as part of the application process for Bling and will be submitted as a part of my job interview.

## 📂 Repository Structure

```sh
└── bling/
    ├── README.md
    ├── package-lock.json
    ├── package.json
    ├── src
    │   ├── controllers
    │   │      ├── authController.ts
    │   ├── middlewares
    │   │      ├── verifyUser.ts
    │   ├── models
    │   │      ├── User.ts
    │   ├── routes
    │   │      ├── authRoutes.ts
    │   ├── services
    │   │      ├── twilioService.ts
    │   └── utils
    │   │      ├── secretKey.ts
    │   │      ├── token2F.ts
    │   ├── app.ts
    │   ├── server.ts
    │   ├── swagger.ts
    └── tsconfig.json
```

---

## 🚀 Getting Started

### 🛠 Prerequisites
**node**: `version 18.17.0` <br/>
**typescript**: `version 5.6.2` <br/>
**twilio**: `version 5.3.1` <br/>
**express**: `version 4.21.0` <br/>

---

### ⚙️ Installation
Build the project from source:

1. Clone the bling repository:
```sh
❯ git clone https://github.com/ShahSau/bling
```

2. Navigate to the project directory:
```sh
❯ cd bling
```

3. Install the required dependencies:
```sh
❯ npm install
```

---

### 🤖 Running
To run the project, first create a .env file at the root of the project and set the  environment variables<br/>
`TWILIO_ACCOUNT_SID` <br/>
`TWILIO_AUTH_TOKEN` <br/>
`TWILIO_PHONE_NUMBER` <br/>
`JWT_SECRET` <br/>
`MONGO_URI` <br/>
`PORT` <br/>

To run the project, execute the following command:
```sh
❯ npm run dev
```
Swagger is implemented in this project, so you can check and test the API via `http://localhost:8080/api-docs`

To build the project, execute the following command:

```sh
❯ npm run build
```
