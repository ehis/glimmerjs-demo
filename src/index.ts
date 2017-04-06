import App from './main';
import { ComponentManager, setPropertyDidChange } from '@glimmer/component';
import initializeCustomElements from '@glimmer/web-component';

const app: any = new App()
const containerElement = document.getElementById('app');

setPropertyDidChange(() => {
  app.scheduleRerender();
});

app.registerInitializer({
  initialize(registry) {
    registry.register(`component-manager:/${app.rootName}/component-managers/main`, ComponentManager)
  }
});

app.renderComponent('music-library', containerElement, null);

app.boot();
initializeCustomElements(app, []);
