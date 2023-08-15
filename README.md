#  Task Scheduling App

This is a simple Vue.js application that allows you to manage tasks using a task scheduling system. The app is integrated with FullCalendar, allowing you to easily add, update, and delete tasks, as well as drag and drop them onto the calendar. This version of the app is designed to be serverless and deployable to AWS S3 using the Serverless Framework.

## Features

- Add, update, and delete tasks through the task scheduling system.
- Drag and drop tasks onto the FullCalendar to schedule them easily.

## Getting Started

Follow these instructions to get the project up and running on your local machine and deploy it to AWS S3 using the Serverless Framework.


### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/neupanemadan/task-schedular-dashboard.git

2. Navigate to the project directory:

   ```bash
   cd task-schedular-dashboard

3. Install the project dependencies:

   ```bash
   yarn install

4. Once the dependencies are installed, you can start the development server:

   ```bash
   yarn run dev

Open your web browser and navigate to http://localhost:5173 to access the app.

## Deployment to AWS S3
1. Configure AWS CLI with your credentials:

   ```bash
   aws configure

2. Install Serverless Framework

   ```bash
   npm install -g serverless

3. Deploy the app to AWS S3 using Serverless:

   ```bash
   make deploy-app

This command will package and deploy app to an S3 bucket.
Once deployment is complete, you'll receive a URL where your app is hosted.