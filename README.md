# Princeton Student Search

An NLP interface for OpenSearch to manage a database of Princeton University students and their contact information, integrating GPT-4 for query translation.

## Local Development Quickstart

### OpenSearch Docker Deployment

Required Software: Docker and Docker Compose

1. Start OpenSearch and its related services by navigating to the /backend directory and running

```bash
docker-compose up
```

This command will download the necessary Docker images (if not already downloaded), create volumes for data persistence, and start the OpenSearch containers.

2. Accessing OpenSearch

Once the containers are up and running, OpenSearch is accessible on port 9200, and OpenSearch Dashboards can be accessed on port 5601.

OpenSearch URL: http://localhost:9200
OpenSearch Dashboards URL: http://localhost:5601

3. Create a document in the OpenSearch Dashboard

Head over to the [OpenSearch Dashboard](http://localhost:5601), click on the "Interact with the OpenSearch API" card under "Manage your data", and run the following command:

```json
PUT /students
{
  "settings": {
    "index": {
      "number_of_shards": 2,
      "number_of_replicas": 1
    }
  },
  "mappings": {
    "properties": {
      "firstName": {
        "type": "text"
      },
      "lastName": {
        "type": "text"
      },
      "email": {
        "type": "keyword"
      },
      "linkedinUrl": {
        "type": "keyword"
      },
      "description": {
        "type": "text"
      }
    }
  }
}
```

4. Add indices (students) to the document

There are two main ways to go about doing this:

- Run the NextJS app with the following command and input students on the ["Add Student" page](http://localhost:3000/add-student)

```bash
cd ../frontend
npm install # (if needed)
npm run dev
```

- Send a POST request in the OpenSearch dashboard or using curl:

```json
POST /students/_doc/
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe@example.com",
  "linkedinUrl": "https://www.linkedin.com/in/johndoe",
  "description": "Computer Science major graduating in 2025"
}
```

## Production Development Guide (AWS)

For our production deployment, we opted for a publicly accessible AWS OpenSearch Service Domain with a master user for fine-grained access control, utilizing t3.small.search instance types for one data node. This approach was chosen for its cost-effectiveness and simplicity, as it eliminates the complexities associated with managing a Virtual Private Cloud (VPC). AWS Elastic Beanstalk is used for deploying the NextJS app to a containerized environment.

### OpenSearch Service Deployment on AWS

1. Navigate to the AWS Management Console and go to "Amazon OpenSearch Service".

2. Under "Domain creation method" select "Standard create".

3. Select the "Dev/test" template (for access to the t3.small.search instance type). Feel free to upgrade this to "Production" if you would like better performance.

4. Under "Deployment option(s)" select "Domain without standby" and "1-AZ" for Availability Zones.

5. Leave "Engine options" unchanged.

6. Select "General purpose" for "Instance family" and "t3.small.search" for instance type to use the most inexpensive option.

7. "Number of nodes" should be set to "1" and "EBS storage size per node" should be set to "10" GiB (leave other options untouched).

8. Under "Network" choose "Public access" and leave it on "Dual-stack mode".

9. Under "Fine-grained access control" click "Create master user" and set a strong username and password. This will be used to initialize your OpenSearch Client in the NextJS app and access the OpenSearch Dashboard.

10. Under "Access policy", select "Only use fine-grained acess control".

11. Click "Create" to create the Amazon OpenSearch Service Domain.

### NextJS App Container Deployment on AWS Elastic Beanstalk

First, we must add the proper Firebase configuration for authentication. We currently "sign up" users manually in the Firebase console with email/password and provide sign in and log out capabilities in the web app:

1. Go to your [Firebase Console](https://console.firebase.google.com)

2. Select "Create a project"

3. Enter a project name

4. Select "Authentication" and "Get started"

5. Enable the "Email/Password" sign-in method

6. Go to "Project Overview" and select the "Web" icon to add Firebase to the web app

7. Enter a nickname for the web app and select "Register app"

8. Copy the proper `firebaseConfig` variable initialization into the `frontend/src/lib/firebase/config.js` file where we set the `firebaseConfig` variable

For quick and simple container deployment, we will upload our application code by ZIP file:

1. Navigate to the AWS Management Console and go to "Elastic Beanstalk".

2. Select "Create application".

3. Write an "Application name".

4. Under "Platform" select "Docker".

5. Under "Application code", select "Upload your code" and upload a ZIP file of the frontend application code EXCLUDING /node_modules.

6. Add a service role and EC2 instance profile

7. Leave all other options unchanged and continue to step 5 to add "Environment properties" under the "Platform software" section.

8. Add your respective environment properties from the list below:

```env
PORT=3000
OPENSEARCH_ENDPOINT=YOUR_ENDPOINT (Copy this from the Amazon OpenSearch Service Domain under "Domain endpoint v2 (dual stack)")
OPENSEARCH_USERNAME=YOUR_USERNAME (Your OpenSearch Domain's master user username)
OPENSEARCH_PASSWORD=YOUR_PASSWORD (Your OpenSearch Domain's master user password)
OPENAI_API_KEY=YOUR_API_KEY (Generate this from the [OpenAI website](https://platform.openai.com/api-keys))
```

9. Submit your application

10. Test it out! It should be communicating with your OpenSearch Service Domain
