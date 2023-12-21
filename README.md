# Princeton Student Search

An NLP interface for OpenSearch to manage a database of Princeton University students and their contact information, integrating GPT-4 for query translation.

## Local Development Quickstart

### OpenSearch Docker Deployment

Software:

- Docker and Docker Compose

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

There are two ways to go about doing this:

- Run the NextJS app and input students on the ["Add Student" page](http://localhost:3000/add-student)
- Send a POST request in the OpenSearch dashboard:

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
