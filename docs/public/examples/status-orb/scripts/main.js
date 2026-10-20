let orb;
let state = 'idle';
let color = '#5b7cfa';
const labels = {
  idle: 'Ready', thinking: 'Thinking', executing: 'Working',
  approval: 'Waiting', completed: 'Done', error: 'Error', paused: 'Paused'
};

function render() {
  if (!orb) return;
  orb.textContent = labels[state] || 'Ready';
  orb.style.background = state === 'error' ? '#c23743' : color;
}

export default {
  mount(api) {
    orb = document.createElement('div');
    orb.style.cssText = 'width:88%;height:88%;margin:6%;border-radius:50%;display:grid;place-items:center;color:white;font:600 13px system-ui;box-shadow:inset 0 -8px 16px #0002;user-select:none;';
    api.root.append(orb);
    color = api.config?.color || color;
    render();
  },
  onEvent(type, data) {
    if (type === 'state') state = data.state;
    if (type === 'config') color = data.color || color;
    if (type === 'tap') orb?.animate(
      [{ transform: 'scale(1)' }, { transform: 'scale(.9)' }, { transform: 'scale(1)' }],
      { duration: 220 }
    );
    render();
  },
  unmount() {
    orb?.getAnimations().forEach(animation => animation.cancel());
    orb?.remove();
    orb = undefined;
    state = 'idle';
    color = '#5b7cfa';
  }
};
