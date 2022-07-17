const wait = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export { wait };
