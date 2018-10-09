let cached = {};

export function registerModel(app, model) {
  model = model.default || model;
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
}

export function clearModel() {
  cached = {};
}

