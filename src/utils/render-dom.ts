import Block from './block';

export default function renderDom(rootSelector: string, component: Block) {
  const root = document.querySelector(rootSelector);

  if (!root) {
    throw new Error('Элемент root не найден');
  } 

  root.innerHTML = '';
  root.append(component.getContent() as HTMLElement);
}
