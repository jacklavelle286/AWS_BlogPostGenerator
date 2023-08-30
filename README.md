# AWS Daily Blog Post Generator

## Description

The AWS Blog Generator is an automated solution that leverages the power of OpenAI's GPT-3 model to create insightful and relevant blog posts about AWS services and features. Designed to simplify content creation, this solution integrates AWS Lambda with OpenAI's API, allowing for on-demand generation of blog content.

Upon invocation, the Lambda function sends a predefined prompt to OpenAI's GPT-3 engine. This prompt instructs the model to craft a blog post tailored for beginners, focusing on a specific AWS service or feature. The generated content is structured with an introduction, a high-level overview, practical examples, insights, best practices, and a conclusion. The tone is set to be engaging, casual, yet instructive, ensuring readers find value in every piece.

Once the content is generated, the solution saves the blog post to an Amazon S3 bucket, providing a centralized storage solution and easy retrieval for future use.

This AWS Blog Generator is not just a testament to the capabilities of AI in content creation but also showcases the seamless integration possibilities between cloud services and AI platforms. Whether you're an AWS enthusiast, a content creator, or someone looking to automate parts of their content strategy, this solution offers a glimpse into the future of automated content generation.

I have also created a web application hosted on Amazon EC2 (within an Autoscaling group behind a load balancer) which hosts a website in which the user can click a 'generate blog post' button which triggers the lambda function.

Components Involved:

#### 1. Front-end Web Application: Hosted on a local server,Amazon S3, or on Amazon EC2.
#### 2. AWS Lambda Function: Serverless function that interacts with OpenAI's GPT-3 API.
#### 3. Function URL: The Lambda function is exposed via a function URL. 
#### 4. Amazon S3: Stores the generated blog posts.

#### Workflow:
- User Interaction: The user clicks the "Get AWS Blog Post" button on the web application.

#### Trigger Lambda via API Gateway:

- The click event triggers a JavaScript fetch function that sends an HTTP request to a Lambda function URL.
- This acts as the entry point to the to the AWS Lambda function.

#### Lambda Function & GPT-3 API:

- The Lambda function is configured to send a pre-configured prompt to OpenAI's GPT-3 API.
- GPT-3 processes the prompt and returns the generated blog post content.
- The Lambda function then saves this content to an Amazon S3 bucket and returns a pre-signed URL for that S3 object.

#### Fetching Blog Post:

- The web application receives the pre-signed URL and makes another fetch request to retrieve the blog post content from S3.

#### Display Content:

- Once the content is fetched, it is displayed in a textarea on the web application for the user to read or copy.

This architecture allows for a scalable and serverless solution that can generate blog posts on-demand using the computational power of GPT-3 and the flexibility of AWS services.

These instructions are written to use the AWS CLI exclusively, so you either need to clone this repository to your local machine, or if you want to use the exact same commands as me, use [AWS CloudShell.](https://aws.amazon.com/cloudshell/)

## Items in this repository

These items are stored within this repository, you will have to download it to your local machine and unzip them, and run this lab in the same directory (I designed this specifically to use AWS CloudShell but any CLI environment will work.)

1. OpenAi API Key saved in a text file called `open_ai_creds.txt` (you will have to retrieve your own one and store it in this file)

2. Openai layer in lambda, the ARN within a text file called `layerarn.txt` (you'll have to create and use your own Lambda Layer and store the ARN in this file, instructions on how to do this are [here](https://thedeveloperspace.com/how-to-invoke-openai-apis-from-aws-lambda-functions/))

3. The code file written in Python called `functioncode.py`

4. Lambda trust policy (trust-policy.json)

5. index.html

6. style.css

7. main.js - this is where the logic is contained which interacts with the Lambda Function 

The following architectural diagram shows how the rest of the application is constructed on AWS:


