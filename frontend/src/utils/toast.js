let toastApi = null;

const defaultOptions = {
  position: "top-right",
  duration: 4200,
  dismissible: true,
  pauseOnHover: true,
};

const typeOptions = {
  success: {
    position: "top-right",
    duration: 3800,
    dismissible: true,
  },
  error: {
    position: "top-right",
    duration: 5000,
    dismissible: true,
  },
  warning: {
    position: "top-right",
    duration: 4600,
    dismissible: true,
  },
  info: {
    position: "top-right",
    duration: 4000,
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
