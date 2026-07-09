let toastApi = null;

const defaultOptions = {
  position: "top-right",
  duration: 4200,
  dismissible: true,
  pauseOnHover: true,
};

const typeOptions = {
  success: {
    position: "bottom-right",
    duration: 3000,
    dismissible: true,
  },
  error: {
    position: "bottom-right",
    duration: 3000,
    dismissible: true,
  },
  warning: {
    position: "bottom-right",
    duration: 3000,
    dismissible: true,
  },
  info: {
    position: "bottom-right",
    duration: 3000,
    dismissible: true,
  },
};

export const setToastApi = (api) => {
  toastApi = api;
};

const showToast = (type, message, options = {}) => {
  if (!toastApi) {
    console.warn("Toast API not ready:", message);
    return;
  }

  toastApi[type](message, {
    ...defaultOptions,
    ...typeOptions[type],
    ...options,
  });
};

export const toast = {
  success(message, options = {}) {
    showToast("success", message, options);
  },
  error(message, options = {}) {
    showToast("error", message, options);
  },
  warning(message, options = {}) {
    showToast("warning", message, options);
  },
  info(message, options = {}) {
    showToast("info", message, options);
  },
};
