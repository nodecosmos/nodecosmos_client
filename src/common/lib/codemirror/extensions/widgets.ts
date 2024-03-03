import { WidgetType } from '@uiw/react-codemirror';

export class CommentWidget extends WidgetType {
    widgetId: string;

    constructor(widgetId: string) {
        super();

        this.widgetId = widgetId;
    }

    toDOM() {
        const div = document.createElement('div');
        div.id = this.widgetId;
        div.className = 'cm-comment';

        div.addEventListener('mousedown', (e) => e.stopPropagation());

        return div;
    }

    ignoreEvent() {
        return true;
    }
}
