let configuration = {};

export function configure(settings) {
  configuration = settings;
}

export default function getConfig() {
  return configuration;
}


