# gRPC Basic Usage

This guide provides a step-by-step overview of setting up and using gRPC with a `Todo` service. Follow the instructions below to create your proto file, install dependencies, and define your gRPC service.

---

## 1. Creating the Proto File

Run the following command to create a new proto file:

```bash
touch proto/test.proto
```

---

## 2. Install Dependencies

Install the required `ts-proto` package:

```bash
npm install ts-proto
```

---

## 3. Proto File Example

Below is an example of a proto file for a `Todo` service:

```proto
syntax = "proto3";

package todo;

// -----------------------------
//  Todo Model
// -----------------------------
message Todo {
  string id = 1;
  string title = 2;
  string description = 3;
  string createdAt = 4;
}

// -----------------------------
//  Basic Query (Pagination + Filter + Sort)
// -----------------------------
message BasicQuery {
  string page = 1;           // default: "1"
  string limit = 2;          // default: "10"
  string searchKeyword = 3;  // default: ""
  string sortField = 4;      // default: "id"
  string sortType = 5;       // default: "desc"
  string filterModel = 6;    // default: ""
  string filterKeyword = 7;  // default: ""
}

// -----------------------------
//  Pagination
// -----------------------------
message PaginationMeta {
  int32 count = 1;      
  int32 page = 2;
  int32 pageCount = 3;
  int32 limit = 4;
}

message PaginationTodoResult {
  repeated Todo data = 1;
  PaginationMeta meta = 2;
}

// -----------------------------
//  CRUD Request/Response
// -----------------------------
message CreateTodoRequest {
  string title = 1;
  string description = 2;
}

message UpdateTodoRequest {
  string id = 1;
  string title = 2;
  string description = 3;
}

message TodoById {
  string id = 1;
}

message DeleteTodoResponse {
  bool success = 1;
  string message = 2;
}

// -----------------------------
//  Service Definition
// -----------------------------
service TodoService {
  // Create
  rpc CreateTodo(CreateTodoRequest) returns (Todo);

  // Read (single)
  rpc GetTodo(TodoById) returns (Todo);

  // Read (list with pagination)
  rpc ListTodos(BasicQuery) returns (PaginationTodoResult);

  // Update
  rpc UpdateTodo(UpdateTodoRequest) returns (Todo);

  // Delete
  rpc DeleteTodo(TodoById) returns (DeleteTodoResponse);
}
```

---

## 4.  Run the following command to generate the proto file

```bash
npx protoc --ts_proto_out=./types/ ./proto/**/*proto --ts_proto_opt=nestJs=true
```

---

## 5. Summary

- **Proto File**: Defines the `Todo` model, queries, and service methods.
- **Service**: Includes CRUD operations for managing todos.
- **Pagination**: Supports pagination, filtering, and sorting for listing todos.

This setup provides a robust foundation for building a gRPC-based `Todo` service.
