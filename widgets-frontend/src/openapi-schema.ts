/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/api/v1/widgets": {
    get: operations["listWidgets"];
    post: operations["createWidget"];
  };
  "/api/v1/widgets/{id}": {
    put: operations["updateWidget"];
    delete: operations["destroyWidget"];
    patch: operations["partialUpdateWidget"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    Widget: {
      id?: number;
      name: string;
      manufacturer: string;
      stock: number;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type external = Record<string, never>;

export interface operations {

  listWidgets: {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["Widget"][];
        };
      };
    };
  };
  createWidget: {
    requestBody?: {
      content: {
        "application/json": components["schemas"]["Widget"];
        "application/x-www-form-urlencoded": components["schemas"]["Widget"];
        "multipart/form-data": components["schemas"]["Widget"];
      };
    };
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["Widget"];
        };
      };
    };
  };
  updateWidget: {
    parameters: {
      path: {
        /** @description A unique integer value identifying this widget. */
        id: number;
      };
    };
    requestBody?: {
      content: {
        "application/json": components["schemas"]["Widget"];
        "application/x-www-form-urlencoded": components["schemas"]["Widget"];
        "multipart/form-data": components["schemas"]["Widget"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["Widget"];
        };
      };
    };
  };
  destroyWidget: {
    parameters: {
      path: {
        /** @description A unique integer value identifying this widget. */
        id: number;
      };
    };
    responses: {
      204: never;
    };
  };
  partialUpdateWidget: {
    parameters: {
      path: {
        /** @description A unique integer value identifying this widget. */
        id: number;
      };
    };
    requestBody?: {
      content: {
        "application/json": components["schemas"]["Widget"];
        "application/x-www-form-urlencoded": components["schemas"]["Widget"];
        "multipart/form-data": components["schemas"]["Widget"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["Widget"];
        };
      };
    };
  };
}
