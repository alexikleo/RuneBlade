// Allow native Vite workers to close before the CLI exits on Windows.
const originalExit = process.exit.bind(process);
process.exit = (code = 0) => { setTimeout(() => originalExit(code), 500); };
