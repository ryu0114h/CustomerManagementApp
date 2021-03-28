type AuthType = {
  ["access-token"]: string;
  client: string;
  uid: string;
};

export const loadAuth = (): AuthType | null => {
  const auth = localStorage.getItem("auth");
  if (auth) {
    return JSON.parse(auth);
  }
  return null;
};

export const setAuth = (headers: AuthType): void => {
  if (!headers["access-token"]) {
    return;
  }

  const auth = {
    ["access-token"]: headers["access-token"],
    client: headers.client,
    uid: headers.uid,
  };

  localStorage.setItem("auth", JSON.stringify(auth));
};

export const removeAuth = (): void => {
  localStorage.removeItem("auth");
};

export const isSignedIn = (): boolean => {
  const auth = loadAuth();
  if (auth) {
    return !!(auth["access-token"] && auth.client && auth.uid);
  }

  return false;
};
