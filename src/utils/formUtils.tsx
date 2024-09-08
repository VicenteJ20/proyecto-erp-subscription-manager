'use client'

const handleExternalSubmit = (id: string) => {
  const form = document.getElementById(id) as HTMLFormElement;
  if (form) {
    form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  }
};


export { handleExternalSubmit };