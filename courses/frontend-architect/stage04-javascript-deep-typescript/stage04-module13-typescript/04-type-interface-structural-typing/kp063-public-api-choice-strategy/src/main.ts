interface PluginContext {
  appName: string;
}

interface LibraryPlugin {
  name: string;
  setup(context: PluginContext): void;
}

type PluginState = 'idle' | 'ready';
type PluginFactory = (name: string) => LibraryPlugin;

const createPlugin: PluginFactory = (name) => ({
  name,
  setup(context) {
    console.log(`${name}@${context.appName}`);
  }
});

const libraryPlugin = createPlugin('analytics');
const pluginState: PluginState = 'ready';

libraryPlugin.setup({ appName: 'frontend-lab' });
console.log(pluginState);
