const LOCAL_ACCESS_NAME = "TOKEN";

function setToken(value: string): void {
  localStorage.setItem(LOCAL_ACCESS_NAME, value);
}

function cleanTokensData(): void {
  localStorage.removeItem(LOCAL_ACCESS_NAME);
}

function getAccessToken(): string | null {
  return localStorage.getItem(LOCAL_ACCESS_NAME);
}

export { setToken, cleanTokensData, getAccessToken };
