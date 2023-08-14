import { render } from '@testing-library/vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { NButton, NMessageProvider } from 'naive-ui';
import Home from '../views/home/Index.vue';

// Create a Pinia instance
const pinia = createPinia();

describe('Home Component', () => {
  it('renders the component with header', async () => {
    const app = createApp(Home);
    app.component('NButton', NButton);
    app.use(pinia);

    const { getByText } = render(Home, {
      global: {
        plugins: [app],
      },
    });

    const header = getByText("Today's Event");
    expect(header).toBeTruthy();
  });

  it('displays "No Schedules added for Today." when there are no schedules', async () => {
    const todaySchedule = [];
    const app = createApp(Home);
    app.component('NButton', NButton);
    app.use(pinia);

    const { findByText } = render(Home, {
      global: {
        plugins: [app],
      },
      props: { todaySchedule },
    });

    const noScheduleText = await findByText('No Schedules added for Today.');
    expect(noScheduleText).toBeTruthy();
  });
});
