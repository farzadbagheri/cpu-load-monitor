export const fetchCPULoad = async () => {
  let response = await fetch('/cpu_load', {
    credentials: 'include',
    method: 'GET',
  });

  if (response.status >= 400) {
    throw new Error(response.status);
  }
  try {
    const data = await response.json();
    return data;
  } catch (e) {
    throw new Error(response.status);
  }
}